"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "How long does it take to get the license?",
        answer: "The process is incredibly fast. Once we have your documents and payment, the license is typically issued within 24 hours."
    },
    {
        question: "Can I own 100% of my business?",
        answer: "Yes! With recent regulations, most e-commerce activities allow for 100% foreign ownership without the need for a local sponsor."
    },
    {
        question: "Do I need a local sponsor?",
        answer: "No, a local sponsor is not required for a standard e-commerce license in standard jurisdictions."
    },
    {
        question: "Can I open a UAE bank account?",
        answer: "Absolutely. We assist you with the entire bank account opening process, introducing you to our partner banks for a smoother experience."
    },
    {
        question: "Is corporate tax applicable?",
        answer: "UAE Corporate Tax (9%) applies to profits exceeding AED 375,000. Small businesses below this threshold are generally exempt, but registration is mandatory. We handle this for you."
    },
    {
        question: "Can I sell internationally?",
        answer: "Yes, an e-commerce license allows you to sell goods and services both within the UAE and internationally."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Got questions? We have answers.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                            >
                                <span className="font-bold text-navy text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 bg-white border-t border-gray-100">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
