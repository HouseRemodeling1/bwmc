"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { businessActivities, groupedActivities } from "@/lib/businessActivities";
import { useState } from "react";

interface Step2Props {
    formData: {
        businessActivity: string;
        jurisdiction: "mainland" | "freezone" | "";
    };
    onUpdate: (data: Partial<Step2Props["formData"]>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step2Requirements({ formData, onUpdate, onNext, onBack }: Step2Props) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredActivities = businessActivities.filter(activity =>
        activity.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    const isValid = formData.businessActivity && formData.jurisdiction;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-navy mb-3">
                        Tell Us About Your Business
                    </h2>
                    <p className="text-gray-600">
                        This helps us provide the most accurate setup estimate
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Business Activity Selection */}
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-4">
                            <Briefcase className="w-5 h-5 text-royal-blue" />
                            What is your primary business activity?
                        </label>

                        {/* Search Input */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                                placeholder="Search for your business activity..."
                            />
                        </div>

                        {/* Activity Dropdown */}
                        <div className="relative">
                            <select
                                required
                                value={formData.businessActivity}
                                onChange={(e) => onUpdate({ businessActivity: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select your business activity</option>
                                {Object.entries(groupedActivities).map(([category, activities]) => (
                                    <optgroup key={category} label={category}>
                                        {activities
                                            .filter(activity => !searchTerm || activity.label.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((activity) => (
                                                <option key={activity.value} value={activity.value}>
                                                    {activity.label}
                                                </option>
                                            ))}
                                    </optgroup>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Jurisdiction Selection */}
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-4">
                            <MapPin className="w-5 h-5 text-royal-blue" />
                            Where do you prefer to operate?
                        </label>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Mainland Option */}
                            <button
                                type="button"
                                onClick={() => onUpdate({ jurisdiction: "mainland" })}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${formData.jurisdiction === "mainland"
                                        ? "border-royal-blue bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-lg text-navy">Mainland (Dubai DED)</h3>
                                    {formData.jurisdiction === "mainland" && (
                                        <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Trade directly in the UAE local market with no restrictions
                                </p>
                                <ul className="space-y-1 text-xs text-gray-500">
                                    <li>✓ Full market access</li>
                                    <li>✓ 100% foreign ownership</li>
                                    <li>✓ Unlimited business scope</li>
                                </ul>
                            </button>

                            {/* Free Zone Option */}
                            <button
                                type="button"
                                onClick={() => onUpdate({ jurisdiction: "freezone" })}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${formData.jurisdiction === "freezone"
                                        ? "border-royal-blue bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-lg text-navy">Free Zone</h3>
                                    {formData.jurisdiction === "freezone" && (
                                        <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Cost-effective setup with 0% corporate tax benefits
                                </p>
                                <ul className="space-y-1 text-xs text-gray-500">
                                    <li>✓ 0% corporate tax</li>
                                    <li>✓ 100% profit repatriation</li>
                                    <li>✓ Fast setup (7-10 days)</li>
                                </ul>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy font-semibold py-4 rounded-md transition-all"
                        >
                            ← Back
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="flex-1 bg-royal-blue hover:bg-navy text-white font-bold py-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            Continue to Estimate →
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
