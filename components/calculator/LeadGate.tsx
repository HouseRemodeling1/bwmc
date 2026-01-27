import { useState, useEffect } from "react";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface LeadGateProps {
    onComplete: (data: { name: string; whatsapp: string }) => void;
}

export default function LeadGate({ onComplete }: LeadGateProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    // Simulate calculation loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ name, whatsapp });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <Loader2 className="w-16 h-16 text-royal-blue" />
                </motion.div>
                <h2 className="text-2xl font-bold text-navy mb-2">Generating Your Quote...</h2>
                <p className="text-gray-500">Analyzing license options and costs</p>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 max-w-md mx-auto animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-navy p-6 text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-blue">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Quote Ready!</h2>
                    <p className="text-white/80 text-sm">We have calculated 3 options for you.</p>
                </div>

                <div className="p-8">
                    <p className="text-gray-600 text-center mb-6 text-sm">
                        Enter your details below to unlock your personalized price estimate.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all text-black"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                            <input
                                type="tel"
                                required
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all text-black"
                                placeholder="+971 50 123 4567"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-royal-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-sky-blue transition-all flex items-center justify-center gap-2 shadow-lg mt-4 group"
                        >
                            Unlock Prices
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Your information is secure. We hate spam too.
                    </p>
                </div>
            </div>
        </div>
    );
}
