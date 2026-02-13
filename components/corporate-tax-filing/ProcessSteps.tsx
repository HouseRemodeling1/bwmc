"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Initial Assessment",
        description: "We analyze your financial records to determine your corporate tax obligations and identify any eligible exemptions."
    },
    {
        number: "02",
        title: "Registration",
        description: "If not already registered, we handle the complete Corporate Tax registration process with the FTA on your behalf."
    },
    {
        number: "03",
        title: "Tax Calculation",
        description: "Our experts compute your taxable income, applying all relevant deductions and reliefs to minimize liability."
    },
    {
        number: "04",
        title: "Return Filing",
        description: "We prepare and file your Corporate Tax Return accurately and on time, ensuring full compliance with FTA regulations."
    },
    {
        number: "05",
        title: "Ongoing Compliance",
        description: "We provide year-round support, keeping your records audit-ready and advising on future tax planning."
    }
];

export default function ProcessSteps() {
    return (
        <section className="py-24 bg-navy text-white relative overflow-hidden">
            {/* Background noise/texture overlay if needed */}
            <div className="absolute inset-0 bg-royal-blue/5"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-4">
                        Your Corporate Tax Filing Roadmap
                    </h2>
                    <p className="text-gray-300 text-lg">
                        A clear, structured process to ensure you meet all deadlines without stress.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/10"></div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative group"
                            >
                                {/* Step Number Node */}
                                <div className="w-24 h-24 mx-auto bg-navy border-4 border-royal-blue rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-gold transition-colors">
                                    <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-3 text-gold">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
