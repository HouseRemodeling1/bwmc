"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/971543097850"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-[#25D366]/40 hover:bg-[#20bd5a] transition-all"
        >
            <MessageCircle className="w-8 h-8 text-white" />
            <span className="sr-only">Chat on WhatsApp</span>
        </motion.a>
    );
}
