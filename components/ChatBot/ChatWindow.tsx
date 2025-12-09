"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateButtonValue, type Message } from '@/lib/chatHandlers';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agentId?: string;
}

const ChatWindow = ({ isOpen, onClose, agentId = "e4de6340-6a4f-40d8-a3d1-15c55770b416" }: ChatWindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Villa Shaa! 🏖️ I\'m your virtual assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef(`session-${Date.now()}`);
  const isSettingCheckInDateRef = useRef(false);
  const isSettingCheckOutDateRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call our Dialogflow API endpoint
      const response = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: sessionIdRef.current,
          isSettingCheckInDate: isSettingCheckInDateRef.current,
          isSettingCheckOutDate: isSettingCheckOutDateRef.current
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        const botText = data.fulfillmentText || 'Sorry, I didn\'t understand that.';
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botText,
          isBot: true,
          timestamp: new Date(),
          buttons: data.buttons || undefined
        };
        console.log("Bot Message with buttons:", botMessage);
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response from Dialogflow');
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'm sorry, I'm experiencing technical difficulties. Please contact Villa Shaa directly at ${process.env.VILLA_PHONE} or email ${process.env.VILLA_EMAIL}.`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Refocus input after sending message
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    'Check availability',
    'Room amenities',
    'Nearby attractions',
    'Contact information',
    'Booking process'
  ];

  const handleQuickReply = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current,
          isSettingCheckInDate: isSettingCheckInDateRef.current,
          isSettingCheckOutDate: isSettingCheckOutDateRef.current
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botText = data.fulfillmentText || 'Sorry, I didn\'t understand that.';
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botText,
          isBot: true,
          timestamp: new Date(),
          buttons: data.buttons || undefined
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Quick reply error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = async (buttonValue: string, buttonText: string) => {
    // Remove buttons from all previous messages (disable them after click)
    setMessages(prev => prev.map(msg => ({
      ...msg,
      buttons: undefined
    })));

    const userMessage: Message = {
      id: Date.now().toString(),
      text: buttonText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Check if this is a special button that should be handled locally
    const shouldCallAPI = validateButtonValue(buttonValue, setMessages, isSettingCheckInDateRef, isSettingCheckOutDateRef);
    
    if (!shouldCallAPI) {
      // Button was handled locally (Yes/No buttons)
      // validateButtonValue already added the bot response
      return;
    }
    
    // For all other buttons, call the API
    setIsLoading(true);
    try {
      const response = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: buttonValue,
          sessionId: sessionIdRef.current,
          isSettingCheckInDate: isSettingCheckInDateRef.current,
          isSettingCheckOutDate: isSettingCheckOutDateRef.current
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botText = data.fulfillmentText || 'Sorry, I didn\'t understand that.';
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botText,
          isBot: true,
          timestamp: new Date(),
          buttons: data.buttons || undefined
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Button click error:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        width: isMaximized ? '800px' : '384px',
        height: isMaximized ? '600px' : '500px'
      }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed bottom-24 right-6 z-50 ${isMaximized ? 'max-w-[calc(100vw-3rem)]' : 'max-w-[calc(100vw-3rem)]'} bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Shaaya</h3>
            <p className="text-xs text-blue-100">Online now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {message.isBot ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.isBot
                          ? 'bg-white text-gray-800 border border-gray-200'
                          : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isBot ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {/* Render buttons if present */}
                      {message.buttons && message.buttons.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {message.buttons.map((button, index) => (
                            <Button
                              key={index}
                              onClick={() => handleButtonClick(button.value, button.text)}
                              variant="outline"
                              size="sm"
                              className="bg-white hover:bg-gray-100 text-blue-600 border-blue-300 hover:border-blue-400"
                            >
                              {button.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-200 bg-white">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 border-gray-300 focus:border-blue-500"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-3"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Villa Shaa AI Assistant
              </p>
            </div>
          </div>
    </motion.div>
  );
};

export default ChatWindow;
