// src/views/ConversationView.jsx
import React from 'react';
import {Chat} from 'liamc9npm';

const ConversationView = ({
  initialConversation,
  currentUser,
  onSendMessage,
  participantsData,   // Detailed mapping of user IDs to profiles
  newMessage,
  setNewMessage,
  messagesEndRef,
  sentBubbleColor     // New prop to control the color of sent bubbles
}) => {
  console.log(participantsData, 'participantsData');

  return (
    <div style={{ height: '100vh' }}>
      <Chat
        initialConversation={initialConversation}
        currentUser={currentUser}
        participantsData={participantsData}
        onSendMessage={onSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        messagesEndRef={messagesEndRef}
        sentBubbleColor={sentBubbleColor}  // Pass along the new prop.
      />
    </div>
  );
};

export default ConversationView;
