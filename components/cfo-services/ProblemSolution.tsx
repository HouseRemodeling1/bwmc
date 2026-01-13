"use client";

import { motion } from "framer-motion";
import { TrendingDown, Compass, ShieldCheck, Search } from "lucide-react";

export default function ProblemSolution() {
    const items = [
        {
            icon: TrendingDown,
            title: "The High Cost of Full-Time CFOs",
            problem: "Hiring a full-time CFO means significant salary, benefits, and long-term commitment, often out of reach for growing SMEs.",
            solution: "BWMC provides access to top-tier financial leadership on a flexible, fractional basis, delivering expert guidance precisely when you need it, without the prohibitive overhead."
        },
        {
            icon: Compass,
            title: "Lack of Strategic Direction",
            problem: "Are you making critical business decisions without robust financial planning, forecasting, or clear budgetary controls?",
            solution: "Our fractional CFOs implement proactive financial planning, precise budgeting, and accurate forecasting, transforming your financial data into actionable strategies for growth."
        },
        {
            icon: ShieldCheck,
            title: "Navigating Complex Regulations",
            problem: "Struggling to keep pace with evolving UAE Corporate Tax, VAT, and ESR regulations, risking penalties and compliance issues?",
            solution: "BWMC's experts ensure seamless navigation of the UAE's regulatory landscape, providing meticulous compliance, minimizing risk, and securing your financial standing."
        },
        {
            icon: Search,
            title: "Limited Financial Visibility",
            problem: "Do you lack real-time financial insights, making it difficult to understand your true profitability and make informed decisions?",
            solution: "We provide clear, concise financial reporting, develop key performance indicators (KPIs), and offer data-driven analysis to empower you with complete financial visibility."
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                        Is Your Business Ready for <br />
                        <span className="text-royal-blue">C-Suite Financial Insight?</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Identify the gaps in your financial strategy and discover how fractional leadership acts as the bridge to sustainable success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-navy/5 rounded-lg text-royal-blue shrink-0">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>

                                    <div className="mb-4 pb-4 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-red-500 mb-1 uppercase tracking-wide">Problem</p>
                                        <p className="text-gray-600 italic">"{item.problem}"</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-green-600 mb-1 uppercase tracking-wide">BWMC Solution</p>
                                        <p className="text-gray-700 font-medium">{item.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
