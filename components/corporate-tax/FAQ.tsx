"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What is the Corporate Tax rate in the UAE?",
        answer: "The standard Corporate Tax rate is 9% on taxable profits exceeding AED 375,000. Profits up to AED 375,000 are taxed at 0% to support small businesses and startups."
    },
    {
        question: "Do Free Zone companies need to register?",
        answer: "Yes, all Free Zone companies are considered 'Taxable Persons' and must register for Corporate Tax. However, 'Qualifying Free Zone Persons' may benefit from a 0% rate on 'Qualifying Income'."
    },
    {
        question: "What is the deadline for Corporate Tax registration?",
        answer: "Deadlines vary based on the date of your Trade License issuance. The FTA has specific timelines for different license dates. Contact us to check your specific deadline and avoid penalties."
    },
    {
        question: "Is there any relief for small businesses?",
        answer: "Yes, the 'Small Business Relief' allows resident taxable persons with revenue below AED 3 Million in a tax period to be treated as having no taxable income for that period, effectively paying 0% tax."
    },
    {
        question: "When do I need to file my Tax Return?",
        answer: "Tax returns must be filed within 9 months from the end of your relevant Tax Period. For example, if your financial year ends on 31st December, your return is due by 30th September of the following year."
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
