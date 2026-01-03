'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, AlertCircle, Phone } from 'lucide-react';
import Link from 'next/link';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    isSystem?: boolean;
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [userDismissed, setUserDismissed] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hey, this is Zoe from BWMC! 👋 Let me know if you need any help or if you'd like me to take you to a specific page.",
            sender: 'bot',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Check localStorage on mount to see if user previously dismissed
    useEffect(() => {
        const dismissed = localStorage.getItem('chatbot-dismissed');
        if (dismissed === 'true') {
            setUserDismissed(true);
        }
    }, []);

    // Auto-open after 10 seconds (only if user hasn't dismissed it)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpened && !userDismissed) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [hasOpened, userDismissed]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue;
        setInputValue('');

        const userMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Prepare messages format for API: { role: 'user' | 'assistant', content: string }
            // Filter out the initial bot greeting (id: '1') to ensure first message is from user
            const apiMessages = messages
                .concat(userMessage)
                .filter(msg => msg.id !== '1') // Remove initial greeting
                .map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: 'bot',
                isSystem: false // AI responses are generic text usually, but we can parse for specific structure if needed later
            };

            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having a little trouble connecting to my brain right now. 🧠💥 Please try again or check your internet!",
                sender: 'bot',
                isSystem: true
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 overflow-visible">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-2xl w-[350px] max-h-[500px] flex flex-col border border-gray-100 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Bot size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Zoe</h3>
                                        <p className="text-xs text-emerald-100 flex items-center gap-1">
                                            <span className={`w-2 h-2 bg-green-400 rounded-full ${isLoading ? 'animate-ping' : 'animate-pulse'}`}></span>
                                            {isLoading ? 'Typing...' : 'Online'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setUserDismissed(true);
                                        localStorage.setItem('chatbot-dismissed', 'true');
                                    }}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[300px] max-h-[350px]">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                                }`}
                                        >
                                            <div className="whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-gray-400 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-xs flex gap-1">
                                            <span className="animate-bounce">●</span>
                                            <span className="animate-bounce delay-100">●</span>
                                            <span className="animate-bounce delay-200">●</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-gray-100">
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Type a message..."
                                        disabled={isLoading}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md active:scale-95 transform duration-100 flex items-center justify-center"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <p className="text-[10px] text-gray-400">Powered by BWMC AI</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Toggle Button */}
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsOpen(true);
                            setHasOpened(true);
                        }}
                        className="relative w-16 h-16 rounded-full shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center transition-all group overflow-visible"
                    >
                        {/* Character Avatar */}
                        <div className="relative w-full h-full rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/chatbot-avatar.png"
                                alt="Chat with Zoe"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Notification Badge */}
                        {!hasOpened && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                            </span>
                        )}
                    </motion.button>
                )}
            </div>
        </>
    );
}
