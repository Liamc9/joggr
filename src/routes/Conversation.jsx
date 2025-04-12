// src/components/Conversation.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import ConversationView from '../views/ConversationView';

const Conversation = () => {
  const { conversationId } = useParams();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  const [conversationData, setConversationData] = useState(null);
  const [participantsData, setParticipantsData] = useState({});
  const [newMessage, setNewMessage] = useState('');

  // Listen to the conversation document.
  const [conversationSnapshot, loading, error] = useDocument(
    conversationId ? doc(db, 'conversations', conversationId) : null
  );

  // Get conversation document data.
  useEffect(() => {
    if (conversationSnapshot) {
      const data = conversationSnapshot.data();
      setConversationData({ id: conversationSnapshot.id, ...data });
    }
  }, [conversationSnapshot]);

  // Fetch participant data from the users collection when conversationData updates.
  useEffect(() => {
    const fetchParticipantsData = async () => {
      // We're now using "participantUIDs" instead of "participants".
      if (conversationData && conversationData.participantUIDs?.length) {
        try {
          // participantUIDs is expected to be a simple array of strings.
          const participantIds = conversationData.participantUIDs;
          
          const q = query(
            collection(db, 'users'),
            where('__name__', 'in', participantIds)
          );
          const querySnapshot = await getDocs(q);
          const usersData = {};
          querySnapshot.forEach((doc) => {
            usersData[doc.id] = doc.data();
          });
          setParticipantsData(usersData);
        } catch (err) {
          console.error('Error fetching participants data:', err);
        }
      }
    };

    fetchParticipantsData();
  }, [conversationData]);

  // Callback that sends a new message to Firestore.
  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !currentUser) return;

    // Create the message object.
    const message = {
      localTimestamp: Date.now().toString(),
      sender: currentUser.uid,
      text: trimmedMessage,
    };

    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        messages: arrayUnion(message),
        lastUpdated: Date.now().toString(),
        lastMessage: message,
      });
      setNewMessage('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, [newMessage, conversationId, currentUser]);

  if (loading) return <p>Loading conversation...</p>;
  if (error) return <p>Error loading conversation: {error.message}</p>;

  return (
    <ConversationView
      initialConversation={conversationData}
      currentUser={currentUser}
      participantsData={participantsData} 
      onSendMessage={handleSendMessage}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      messagesEndRef={messagesEndRef}
      sentBubbleColor="var(--color-primary)"
    />
  );
};

export default Conversation;





/*// Example of the conversation data structure in Firestore:
{
  "participants": ["user1", "user2"],
  "messages": [
    {
      "sender": "user1",
      "text": "Hello, how are you?",
      "localTimestamp": "1634567890123"
    },
    {
      "sender": "user2",
      "text": "I'm good! How about you?",
      "localTimestamp": "1634567923456"
    }
  ],
  "lastUpdated": "1634567923456",
  // Optionally, a summary for quick display:
  "lastMessage": {
    "sender": "user2",
    "text": "I'm good! How about you?",
    "localTimestamp": "1634567923456"
  }
}

// Example of the user data structure in Firestore:
{
  "displayName": "Alice Johnson",
  "photoURL": "https://example.com/path/to/profile.jpg",
  "email": "alice@example.com"
}
*/

