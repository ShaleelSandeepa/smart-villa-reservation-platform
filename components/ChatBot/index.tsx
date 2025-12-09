"use client";

import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

interface ChatBotProps {
  agentId?: string;
}

const ChatBot = ({ agentId = "e4de6340-6a4f-40d8-a3d1-15c55770b416" }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset unread count when opening chat
      setUnreadCount(0);
    }
  };

  return (
    <>
      <ChatButton 
        isOpen={isOpen}
        onClick={handleToggleChat}
        unreadCount={unreadCount}
      />
      
      <ChatWindow 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        agentId={agentId}
      />
    </>
  );
};

export default ChatBot;