import { User, Users, Briefcase, Building2 } from "lucide-react";

interface Step2Props {
    value: number | null;
    onChange: (value: number) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step2Visa({ value, onChange, onNext, onBack }: Step2Props) {
    const options = [
        { count: 0, label: "0 Visas", icon: User, desc: "License only" },
        { count: 1, label: "1 Visa", icon: Briefcase, desc: "For investor/partner" },
        { count: 2, label: "2 Visas", icon: Users, desc: "Investor + Employee" },
        { count: 3, label: "3+ Visas", icon: Building2, desc: "Growing team" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-navy">How many visas do you need?</h2>
                <p className="text-gray-500">Select the number of residency visas required for your company</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {options.map((option) => (
                    <button
                        key={option.count}
                        onClick={() => {
                            onChange(option.count);
                            // Auto-advance for better UX on card selection
                            setTimeout(onNext, 300);
                        }}
                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl text-left flex flex-col gap-4 ${value === option.count
                                ? "border-royal-blue bg-blue-50/50 shadow-lg scale-105 ring-2 ring-royal-blue/20"
                                : "border-gray-100 bg-white hover:border-royal-blue/50"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${value === option.count
                                ? "bg-royal-blue text-white"
                                : "bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-royal-blue"
                            }`}>
                            <option.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg mb-1 ${value === option.count ? "text-royal-blue" : "text-navy"
                                }`}>
                                {option.label}
                            </h3>
                            <p className="text-sm text-gray-500">{option.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="pt-8 flex justify-center gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-gray-500 hover:text-navy font-medium transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
