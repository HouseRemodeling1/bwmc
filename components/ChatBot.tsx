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
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hey, this is Zoe from BWMC! 👋 Let me know if you need any help or if you'd like me to take you to a specific page.",
            sender: 'bot',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-open after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpened) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [hasOpened]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Process response after a small delay
        setTimeout(() => {
            const lowerInput = userMessage.text.toLowerCase();
            let botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: '',
                sender: 'bot',
            };

            if (
                lowerInput.includes('price') ||
                lowerInput.includes('cost') ||
                lowerInput.includes('how much') ||
                lowerInput.includes('quote') ||
                lowerInput.includes('fee') ||
                lowerInput.includes('charges')
            ) {
                botResponse.text = "For accurate pricing and tailored quotes specifically for your business needs, please contact our senior team directly. We can provide a detailed breakdown after understanding your requirements.";
                botResponse.isSystem = true; // Use system flag to render special buttons
            } else if (
                lowerInput.includes('audit') ||
                lowerInput.includes('tax') ||
                lowerInput.includes('accounting') ||
                lowerInput.includes('bookkeeping')
            ) {
                botResponse.text = "We specialize in Audit, Tax, and Accounting services. I can guide you to our services page for more details, or connect you with an expert.";
                botResponse.isSystem = true; // Could trigger specific service links
            } else if (
                lowerInput.includes('contact') ||
                lowerInput.includes('whatsapp') ||
                lowerInput.includes('phone')
            ) {
                botResponse.text = "You can reach us directly via WhatsApp or our contact page.";
                botResponse.isSystem = true;
            } else {
                botResponse.text = "I'm here to help! Feel free to ask about our services, or let me know if you'd like to speak with a senior consultant.";
            }

            setMessages((prev) => [...prev, botResponse]);
        }, 600);
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
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
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
                                            {msg.text}

                                            {msg.isSystem && (
                                                <div className="mt-3 flex flex-col gap-2">
                                                    {msg.text.includes("pricing") || msg.text.includes("contact") ? (
                                                        <>
                                                            <Link
                                                                href="/contact"
                                                                className="flex items-center justify-center gap-2 text-xs bg-emerald-50 text-emerald-700 py-2 px-3 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                                            >
                                                                <MessageCircle size={14} /> Contact Page
                                                            </Link>
                                                            <a
                                                                href="https://wa.me/971501234567" /* Replace with actual number */
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center gap-2 text-xs bg-green-50 text-green-700 py-2 px-3 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                                            >
                                                                <Phone size={14} /> WhatsApp Senior Team
                                                            </a>
                                                        </>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-800 placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md active:scale-95 transform duration-100 flex items-center justify-center"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <p className="text-[10px] text-gray-400">Powered by BWMC</p>
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsOpen(true);
                            setHasOpened(true);
                        }}
                        className="w-14 h-14 bg-emerald-600 rounded-full text-white shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center transition-all group relative"
                    >
                        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />

                        {/* Notification Badge */}
                        {!hasOpened && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
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
