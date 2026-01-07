import { Search, Building2 } from "lucide-react";

interface Step1Props {
    activity: string;
    setActivity: (value: string) => void;
    businessName: string;
    setBusinessName: (value: string) => void;
    onNext: () => void;
}

export default function Step1Activity({ activity, setActivity, businessName, setBusinessName, onNext }: Step1Props) {
    const popularActivities = [
        "E-commerce",
        "Marketing & Advertising",
        "IT Consultancy",
        "General Trading",
        "Project Management",
        "Real Estate"
    ];

    const isNextEnabled = activity.trim().length > 0 && businessName.trim().length > 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-navy">Let's start with your business details</h2>
                <p className="text-gray-500">Tell us about your activity and preferred name</p>
            </div>

            <div className="max-w-xl mx-auto space-y-6">

                {/* Activity Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-navy ml-1">Business Activity</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            placeholder="e.g. Digital Marketing, Trading..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all text-lg shadow-sm"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Popular Chips */}
                <div className="space-y-3">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Popular Activities</p>
                    <div className="flex flex-wrap gap-2">
                        {popularActivities.map((act) => (
                            <button
                                key={act}
                                onClick={() => setActivity(act)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activity === act
                                        ? "bg-royal-blue text-white shadow-md transform scale-105"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-royal-blue hover:text-royal-blue"
                                    }`}
                            >
                                {act}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Business Name Input */}
                <div className="space-y-2 pt-2">
                    <label className="text-sm font-bold text-navy ml-1">Preferred Business Name</label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g. Future Tech LLC"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all text-lg shadow-sm"
                        />
                    </div>
                    <p className="text-xs text-gray-400 ml-1">Don't worry, you can verify availability later.</p>
                </div>

                <div className="pt-6 flex justify-center">
                    <button
                        onClick={onNext}
                        disabled={!isNextEnabled}
                        className="w-full md:w-auto px-12 py-4 bg-navy text-white rounded-xl font-bold hover:bg-royal-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
