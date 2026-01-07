import { CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";

interface Step4Props {
    jurisdiction: "mainland" | "freezone" | null;
}

export default function Step4Results({ jurisdiction }: Step4Props) {
    if (jurisdiction === "freezone") {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-navy mb-2">Your Estimated Cost</h2>
                    <p className="text-gray-500">Based on your requirements</p>
                </div>

                <div className="max-w-md mx-auto relative group">
                    {/* Glowing effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-royal-blue to-sky-blue rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                    <div className="relative bg-white rounded-xl p-8 shadow-xl border border-gray-100">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-navy font-bold text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl">
                            BEST VALUE
                        </div>

                        <h3 className="text-navy font-bold text-xl mb-4">Starter Package</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-lg text-gray-500 font-medium">AED</span>
                            <span className="text-5xl font-extrabold text-royal-blue tracking-tight">4,888</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {[
                                "100% Ownership",
                                "Zero Personal Income Tax",
                                "Virtual Office Included",
                                "Up to 3 Activities",
                                "Fast & Digital Setup"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span className="text-gray-600 text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="https://calendly.com/bwmc-consulting" // Replace with actual calendar link
                            target="_blank"
                            className="w-full bg-navy text-white py-4 rounded-lg font-bold hover:bg-royal-blue transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Free Appointment
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Mainland Result
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-navy mb-2">Your Mainland Estimate</h2>
                <p className="text-gray-500">Trade freely across UAE and International Markets</p>
            </div>

            <div className="max-w-md mx-auto relative">
                <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 text-center">

                    <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
                        INSTANT LICENSE ELIGIBILITY
                    </div>

                    <h3 className="text-gray-500 font-medium mb-2">Estimated Range</h3>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="text-3xl font-bold text-navy">AED 12,000</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-3xl font-bold text-navy">15,000</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
                        <h4 className="font-bold text-navy mb-2 text-sm uppercase tracking-wider">Why Mainland?</h4>
                        <ul className="space-y-2">
                            {[
                                "No currency restrictions",
                                "Government contracts eligibility",
                                "Unlimited visa quota options",
                                "Open office anywhere in Dubai"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                                    <span className="text-gray-600 text-xs font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link
                        href="https://calendly.com/bwmc-consulting"
                        target="_blank"
                        className="w-full bg-navy text-white py-4 rounded-lg font-bold hover:bg-royal-blue transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Calendar className="w-5 h-5" />
                        Book Free Appointment
                    </Link>
                </div>
            </div>
        </div>
    );
}
