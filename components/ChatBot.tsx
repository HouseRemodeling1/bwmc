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

            // 1. Greetings
            const greetings = ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'ssup', 'yo'];
            const isGreeting = greetings.some(greeting => lowerInput.includes(greeting));

            if (isGreeting && lowerInput.length < 20) {
                botResponse.text = "Hello! 👋 I'm Zoe. I'm here to assist you with anything related to BWMC—whether it's business setup, financial services, or just a general question. How can I help?";
            }
            // 2. Pricing Guardrails (Strict)
            else if (
                lowerInput.includes('price') ||
                lowerInput.includes('cost') ||
                lowerInput.includes('much') ||
                lowerInput.includes('quote') ||
                lowerInput.includes('fee') ||
                lowerInput.includes('charges') ||
                lowerInput.includes('pricing') ||
                lowerInput.includes('rates')
            ) {
                botResponse.text = "I'd love to give you a quick number, but pricing depends heavily on your specific business activity, visa requirements, and license type. \n\nFor an accurate quote, please chat with our senior consultants on WhatsApp or leave a message. We'll give you a detailed breakdown!";
                botResponse.isSystem = true;
            }
            // 3. Business Setup & Licenses
            else if (
                lowerInput.includes('setup') ||
                lowerInput.includes('start') ||
                lowerInput.includes('license') ||
                lowerInput.includes('company') ||
                lowerInput.includes('business') ||
                lowerInput.includes('freezone') ||
                lowerInput.includes('mainland') ||
                lowerInput.includes('offshore') ||
                lowerInput.includes('dubai') ||
                lowerInput.includes('uae')
            ) {
                botResponse.text = "Great! Starting a business in the UAE is a fantastic move. 🇦🇪 \n\nWe specialize in Mainland, Freezone, and Offshore setups. I can interpret the regulations for you. \n\nCould you tell me a bit more about your planned business activity? Or feel free to connect with an expert directly.";
                botResponse.isSystem = true;
            }
            // 4. Financial Services (Audit, Tax, Accounts)
            else if (
                lowerInput.includes('audit') ||
                lowerInput.includes('tax') ||
                lowerInput.includes('vat') ||
                lowerInput.includes('accounting') ||
                lowerInput.includes('bookkeeping') ||
                lowerInput.includes('compliance') ||
                lowerInput.includes('finance')
            ) {
                botResponse.text = "We have a dedicated team for Audit, Tax, and Accounting compliance. \n\nWe handle everything from VAT filing to statutory audits. Would you like to speak to a finance expert?";
                botResponse.isSystem = true;
            }
            // 5. Contact / Location / Hours
            else if (
                lowerInput.includes('contact') ||
                lowerInput.includes('whatsapp') ||
                lowerInput.includes('phone') ||
                lowerInput.includes('call') ||
                lowerInput.includes('number') ||
                lowerInput.includes('email') ||
                lowerInput.includes('reach')
            ) {
                botResponse.text = "You can reach our team instantly via WhatsApp below. We are very responsive! 👇";
                botResponse.isSystem = true;
            }
            else if (
                lowerInput.includes('location') ||
                lowerInput.includes('address') ||
                lowerInput.includes('office') ||
                lowerInput.includes('where')
            ) {
                botResponse.text = "We are located in Dubai, UAE. You can find our full address and location map on our Contact page.";
                botResponse.isSystem = true;
            }
            // 6. About / General / Team
            else if (
                lowerInput.includes('who are you') ||
                lowerInput.includes('what is bwmc') ||
                lowerInput.includes('about') ||
                lowerInput.includes('team') ||
                lowerInput.includes('ceo')
            ) {
                botResponse.text = "BWMC (Bridge Water Management Consultancies) is a premier corporate service provider in the UAE. We help businesses start, grow, and stay compliant. Our team consists of seasoned experts in law, finance, and business strategy.";
            }
            // 7. General Helper / Catch-all
            else {
                botResponse.text = "That's a good question! While I handle the basics, our senior consultants are best equipped to give you a specific answer for that. \n\nWould you like to chat with them on WhatsApp directly?";
                botResponse.isSystem = true;
            }

            setMessages((prev) => [...prev, botResponse]);
        }, 800); // Slightly longer delay for natural feel
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
