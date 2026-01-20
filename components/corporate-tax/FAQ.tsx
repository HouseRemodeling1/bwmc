"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "When is the corporate tax filing deadline?",
        answer: "Generally, for calendar year corporations, the deadline is April 15th (moved to the next business day if on a weekend). Fiscal year corporations must file by the 15th day of the 4th month following the close of their tax year."
    },
    {
        question: "What documents do I need to provide?",
        answer: "Key documents include your P&L statement, balance sheet, prior year tax returns, payroll records, and details of any asset acquisitions or disposals."
    },
    {
        question: "How much do your services cost?",
        answer: "Our fees are tailored to the complexity of your business. We offer transparent, flat-fee pricing after a quick initial assessment of your needs."
    },
    {
        question: "Can you handle multi-state filings?",
        answer: "Yes, we specialize in multi-state nexus analysis and compliance to ensure you are meeting obligations in every jurisdiction where you operate."
    },
    {
        question: "What if we're audited?",
        answer: "We provide comprehensive audit protection. If you receive a notice, we will represent you before the IRS or state authorities and handle all correspondence."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-[#f8f9fa]">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1a4d6f] mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Answers to common corporate tax questions.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-[#1a4d6f]">{faq.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="w-5 h-5 text-[#f4a460]" />
                                ) : (
                                    <Plus className="w-5 h-5 text-[#f4a460]" />
                                )}
                            </button>
                            {openIndex === idx && (
                                <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
