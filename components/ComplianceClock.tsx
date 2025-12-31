"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ComplianceClock() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const deadlines = [
        {
            title: "Corporate Tax Filing Q1",
            date: "March 31, 2025",
            daysLeft: mounted ? Math.ceil((new Date("2025-03-31").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
            icon: Calendar,
        },
        {
            title: "VAT Return Q4 2024",
            date: "January 28, 2025",
            daysLeft: mounted ? Math.ceil((new Date("2025-01-28").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
            icon: Clock,
        },
        {
            title: "Annual Audit Deadline",
            date: "June 30, 2025",
            daysLeft: mounted ? Math.ceil((new Date("2025-06-30").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
            icon: AlertCircle,
        },
    ];

    return (
        <section className="bg-neutral py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                        The Compliance Clock
                    </h2>
                    <p className="text-lg text-navy/70">
                        Stay ahead of UAE regulatory deadlines
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {deadlines.map((deadline, index) => {
                        const Icon = deadline.icon;
                        const isUrgent = deadline.daysLeft < 30 && deadline.daysLeft > 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`bg-white rounded-[4px] p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${isUrgent ? "border-red-500" : "border-sky-blue"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-[4px] ${isUrgent ? "bg-red-100" : "bg-sky-blue/10"}`}>
                                        <Icon className={`w-6 h-6 ${isUrgent ? "text-red-500" : "text-sky-blue"}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-navy mb-2">{deadline.title}</h3>
                                        <p className="text-sm text-navy/60 mb-3">{deadline.date}</p>
                                        <div className={`text-2xl font-bold ${isUrgent ? "text-red-500" : "text-royal-blue"}`}>
                                            {deadline.daysLeft > 0 ? `${deadline.daysLeft} days` : "Overdue"}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
