"use client";

import { motion } from "framer-motion";
import { Target, Compass, Award } from "lucide-react";
import { useState } from "react";

const tabs = [
    {
        id: "vision",
        label: "Vision",
        icon: Target,
        title: "Our Vision",
        content: "Our vision at BWMC is to be the leading catalyst for global financial success. We empower businesses and individuals to achieve their goals through innovative financial management services, specializing in accounting, auditing, and financial consulting. With a client-centric approach, we provide tailored solutions to foster long-term growth and make us the go-to consultancy for startups, SMEs, and consumer brands."
    },
    {
        id: "mission",
        label: "Mission",
        icon: Compass,
        title: "Our Mission",
        content: "At Bridge Water Management Consultancies (BWMC), we drive global financial success by providing expert financial management services. We specialize in accounting, auditing, and financial consulting, delivering tailored financial solutions to businesses and individuals. With our deep industry expertise, we help startups, SMEs, consumer brands, and professional service providers make informed financial decisions and achieve sustainable growth."
    },
    {
        id: "expertise",
        label: "Expertise",
        icon: Award,
        title: "Our Expertise",
        content: "At Bridge Water Management Consultancies (BWMC), our expertise lies in offering comprehensive financial management services across accounting, auditing, and financial consulting. With decades of experience, we provide tailored solutions for startups, SMEs, consumer brands, and professional service providers. Our technology-driven and client-centric approach ensures financial accuracy, compliance, and long-term growth."
    }
];

export default function VisionMission() {
    const [activeTab, setActiveTab] = useState("mission");

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Col - Tabs */}
                    <div className="space-y-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <div
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`cursor-pointer p-6 rounded-[4px] border transition-all duration-300 flex items-center gap-4 ${isActive
                                            ? "bg-navy border-navy text-white shadow-lg scale-105"
                                            : "bg-neutral border-transparent text-navy/60 hover:bg-neutral/80"
                                        }`}
                                >
                                    <div className={`p-3 rounded-full ${isActive ? "bg-white/10" : "bg-white"}`}>
                                        <Icon className={`w-6 h-6 ${isActive ? "text-sky-blue" : "text-navy"}`} />
                                    </div>
                                    <span className="text-xl font-bold">{tab.label}</span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Col - Content */}
                    <div className="bg-zinc-50 p-8 rounded-[4px] border border-gray-100 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                        {/* Decorative background logo or shape */}
                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-royal-blue/5 rounded-full blur-3xl" />

                        {tabs.map((tab) => (
                            activeTab === tab.id && (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10"
                                >
                                    <h3 className="text-3xl font-bold text-navy mb-6">{tab.title}</h3>
                                    <p className="text-lg text-navy/70 leading-relaxed">
                                        {tab.content}
                                    </p>
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
