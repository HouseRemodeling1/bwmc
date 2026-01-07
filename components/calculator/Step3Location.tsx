import { Building, Globe, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Step3Props {
    value: "mainland" | "freezone" | null;
    onChange: (value: "mainland" | "freezone") => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step3Location({ value, onChange, onNext, onBack }: Step3Props) {
    const [showOfficeModal, setShowOfficeModal] = useState(false);
    const [showSavingsToast, setShowSavingsToast] = useState(false);

    const handleSelection = (type: "mainland" | "freezone") => {
        onChange(type);
        if (type === "mainland") {
            setShowOfficeModal(true);
        } else {
            // Freezone -> Next directly
            setTimeout(onNext, 500);
        }
    };

    const handleOfficeResponse = (needsOffice: boolean) => {
        setShowOfficeModal(false);
        if (!needsOffice) {
            setShowSavingsToast(true);
            // Delay next step to let them see the toast
            setTimeout(onNext, 2500);
        } else {
            onNext();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 relative">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-navy">Choose your Jurisdiction</h2>
                <p className="text-gray-500">Where do you want to establish your company?</p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mainland Option */}
                <button
                    onClick={() => handleSelection("mainland")}
                    className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl text-center space-y-4 ${value === "mainland"
                            ? "border-royal-blue bg-blue-50/50 shadow-lg scale-105"
                            : "border-gray-100 bg-white hover:border-royal-blue/30"
                        }`}
                >
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${value === "mainland" ? "bg-royal-blue text-white" : "bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-royal-blue"
                        }`}>
                        <Building className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-navy mb-2">Mainland</h3>
                        <p className="text-sm text-gray-500">Trade directly within UAE and internationally. No restrictions.</p>
                    </div>
                </button>

                {/* Freezone Option */}
                <button
                    onClick={() => handleSelection("freezone")}
                    className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl text-center space-y-4 ${value === "freezone"
                            ? "border-royal-blue bg-blue-50/50 shadow-lg scale-105"
                            : "border-gray-100 bg-white hover:border-royal-blue/30"
                        }`}
                >
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${value === "freezone" ? "bg-royal-blue text-white" : "bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-royal-blue"
                        }`}>
                        <Globe className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-navy mb-2">Free Zone</h3>
                        <p className="text-sm text-gray-500">100% ownership, tax benefits, and cost-effective setup.</p>
                    </div>
                </button>
            </div>

            <div className="pt-8 flex justify-center">
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-gray-500 hover:text-navy font-medium transition-colors"
                >
                    Back
                </button>
            </div>

            {/* Office Question Modal */}
            <AnimatePresence>
                {showOfficeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full text-center"
                        >
                            <h3 className="text-xl font-bold text-navy mb-4">Do you need a physical office?</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleOfficeResponse(true)}
                                    className="w-full py-3 bg-white border border-gray-200 text-navy font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Yes, I need an office
                                </button>
                                <button
                                    onClick={() => handleOfficeResponse(false)}
                                    className="w-full py-3 bg-royal-blue text-white font-semibold rounded-lg hover:bg-sky-blue transition-colors shadow-lg"
                                >
                                    No, I don't need one
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Savings Toast */}
            <AnimatePresence>
                {showSavingsToast && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="fixed bottom-10 right-10 z-[100] max-w-sm bg-green-600 text-white p-6 rounded-xl shadow-2xl flex items-start gap-4"
                    >
                        <div className="bg-white/20 p-2 rounded-full">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Great News!</h4>
                            <p className="text-white/90 text-sm">You qualify for the <span className="font-bold text-yellow-300">Virtual/Instant License</span>, saving you up to <span className="font-bold text-yellow-300">15,000 AED</span> on rent!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
