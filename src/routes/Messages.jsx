// src/pages/Messages.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import MessagesView from '../views/MessagesView';
import { useNotifications } from '../context/NotificationContext';

export default function Messages() {
  const { currentUser, loading: authLoading } = useAuth();
  const { notifications, addNotification, clearNotification } = useNotifications();
  const [error, setError] = useState(null);
  const [participantsData, setParticipantsData] = useState({}); // Map of user profiles keyed by UID

  // ------------------- READ FUNCTIONS --------------------
  // Build a Firestore query to fetch conversations in which the current user is a participant.
  const conversationsQuery = useMemo(() => {
    if (!currentUser) return null;
    return query(
      collection(db, 'conversations'),
      where('participantUIDs', 'array-contains', currentUser.uid)
    );
  }, [currentUser]);

  // Listen for conversation documents using the built query.
  const [snapshot, loading, firestoreError] = useCollection(conversationsQuery);

  // Parse raw conversation data from the snapshot.
  const conversations = useMemo(() => {
    if (!snapshot || !currentUser) return [];
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() || {};
      // Convert Firestore timestamps to JavaScript Date objects if present.
      const lastRead = data.lastRead?.[currentUser.uid]?.toDate?.() || null;
      const lastMessageTimestamp = data.lastMessage?.timestamp?.toDate?.() || null;
      const hasNewMessage = lastRead ? lastMessageTimestamp > lastRead : true;
      return { id: docSnap.id, ...data, hasNewMessage };
    });
  }, [snapshot, currentUser]);

  // Single batch query to fetch profiles for all conversation participants.
  useEffect(() => {
    if (!snapshot) {
      setParticipantsData({});
      return;
    }
    const allParticipantUIDs = new Set();
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data() || {};
      (data.participantUIDs || []).forEach((uid) => {
        allParticipantUIDs.add(uid);
      });
    });

    if (!allParticipantUIDs.size) {
      setParticipantsData({});
      return;
    }

    const fetchProfiles = async () => {
      try {
        const userDocs = await getDocs(
          query(collection(db, 'users'), where('__name__', 'in', [...allParticipantUIDs]))
        );
        const result = {};
        userDocs.forEach((userDoc) => {
          result[userDoc.id] = userDoc.data();
        });
        setParticipantsData(result);
      } catch (err) {
        console.error('Error fetching participant data:', err);
      }
    };

    fetchProfiles();
  }, [snapshot]);

  // ------------------- WRITE FUNCTIONS --------------------
  // Update notifications based on whether any conversation has a new (unread) message.
  useEffect(() => {
    if (!currentUser) return;
    const hasUnread = conversations.some((convo) => convo.hasNewMessage);

    // Only add or clear the 'messages' notification if state is changing.
    if (hasUnread && !notifications.messages) {
      addNotification('messages');
    } else if (!hasUnread && notifications.messages) {
      clearNotification('messages');
    }
  }, [conversations, currentUser, notifications.messages, addNotification, clearNotification]);

  // ------------------- DELETE FUNCTIONS --------------------
  // No delete functions in this component.

  // ------------------- OTHER FUNCTIONS --------------------
  // Handle Firestore errors by setting a user-facing error message.
  useEffect(() => {
    if (firestoreError) {
      console.error(firestoreError);
      setError('Failed to load conversations.');
    }
  }, [firestoreError]);

  // Render loading state or the main MessagesView.
  if (authLoading || loading) return <div>Loading messages...</div>;

  return (
    <MessagesView
      currentUser={currentUser}
      conversations={conversations}
      participantsData={participantsData} // Pass participants data to the view.
      loading={loading}
      error={error}
    />
  );
}
