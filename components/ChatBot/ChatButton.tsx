"use client";

import { useState } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const ChatButton = ({ isOpen, onClick, unreadCount = 0 }: ChatButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      className="fixed bottom-32 right-10 z-50 cursor-grab active:cursor-grabbing"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
          >
            Chat with Villa Shaa
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        className={`
          relative w-16 h-16 rounded-full shadow-lg transition-all duration-300
          ${isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
          }
          flex items-center justify-center text-white
        `}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={40} />
              <Bot size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread Count Badge */}
        {unreadCount > 0 && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-30"
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default ChatButton;
