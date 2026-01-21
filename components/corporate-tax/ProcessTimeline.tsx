"use client";

const steps = [
    {
        number: "01",
        title: "Registration & TRN",
        description: "We assess your eligibility and register your business with the FTA to obtain your Tax Registration Number."
    },
    {
        number: "02",
        title: "Financial Review",
        description: "Review of financial statements to identify taxable income, exempt income, and deductible expenses."
    },
    {
        number: "03",
        title: "Tax Computation",
        description: "Calculation of final tax liability, applying any available reliefs (like Small Business Relief) or 0% Free Zone benefits."
    },
    {
        number: "04",
        title: "Filing & Payment",
        description: "Submission of the final return to the FTA portal and guidance on tax payment to avoid penalties."
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
