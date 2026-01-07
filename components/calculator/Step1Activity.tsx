import { Search } from "lucide-react";

interface Step1Props {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
}

export default function Step1Activity({ value, onChange, onNext }: Step1Props) {
    const popularActivities = [
        "E-commerce",
        "Marketing & Advertising",
        "IT Consultancy",
        "General Trading",
        "Project Management",
        "Real Estate"
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-navy">What is your business activity?</h2>
                <p className="text-gray-500">Search for your primary business activity</p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="e.g. Digital Marketing, Trading, Consultancy..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all text-lg shadow-sm"
                        autoFocus
                    />
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-gray-400 text-center uppercase tracking-wider font-medium">Popular Activities</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {popularActivities.map((activity) => (
                            <button
                                key={activity}
                                onClick={() => {
                                    onChange(activity);
                                    // Optional: Auto-advance on selection? User might want to type specific.
                                    // Let's just set value.
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${value === activity
                                        ? "bg-royal-blue text-white shadow-md transform scale-105"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-royal-blue hover:text-royal-blue"
                                    }`}
                            >
                                {activity}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-center">
                    <button
                        onClick={onNext}
                        disabled={!value.trim()}
                        className="px-8 py-3 bg-navy text-white rounded-lg font-bold hover:bg-royal-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
