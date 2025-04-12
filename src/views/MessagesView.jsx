// src/components/Views/MessagesView.js
import React from 'react';
import styled from 'styled-components';
import { ConversationList } from 'liamc9npm';

const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 40;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  color: #333333;
  margin: 0;
  font-weight: bold;
`;

const BodyContainer = styled.div`
  position: relative;
  justify-content: center;
  width: 100%;
  margin: 0 auto; /* Center content */
`;

const ConversationsContainer = styled.div``;

const NoConversationsContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #777;
`;

const NoText = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

export default function MessagesView({
  currentUser,
  conversations,
  participantsData,
  loading,
  error,
}) {
  return (
    <div>
      <FixedHeader>
        <HeaderTitle>My Messages</HeaderTitle>
      </FixedHeader>
      <BodyContainer>
        {loading ? (
          <p>Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <NoConversationsContainer>
            <NoText>No Messages Found</NoText>
          </NoConversationsContainer>
        ) : (
          <ConversationsContainer>
            <ConversationList
              conversations={conversations}
              currentUser={currentUser}
              participantsData={participantsData}  
            />
          </ConversationsContainer>
        )}
      </BodyContainer>
    </div>
  );
}
