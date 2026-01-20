"use client";

const steps = [
    {
        number: "01",
        title: "Discovery & Data Collection",
        description: "Initial consultation to understand your business and secure document upload via our portal."
    },
    {
        number: "02",
        title: "Analysis & Preparation",
        description: "Comprehensive review by senior tax professionals wih multi-point quality control checks."
    },
    {
        number: "03",
        title: "Review & Approval",
        description: "Line-by-line review with you to explain tax positions and answer all questions."
    },
    {
        number: "04",
        title: "Filing & Follow-Up",
        description: "Electronic filing with confirmation, tracking, and archiving for future reference."
    }
];

export default function ProcessTimeline() {
    return (
        <section className="py-24 bg-[#1a4d6f] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">4 Simple Steps to Stress-Free Tax Filing</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Our streamlined process ensures accuracy and efficiency from start to finish.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/20"></div>

                    <div className="grid lg:grid-cols-4 gap-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative z-10">
                                <div className="w-24 h-24 rounded-full bg-[#2d6a8f] border-4 border-[#f4a460] flex items-center justify-center text-3xl font-bold mb-6 mx-auto lg:mx-0 shadow-lg">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-center lg:text-left">{step.title}</h3>
                                <p className="text-blue-100 text-sm leading-relaxed text-center lg:text-left">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
