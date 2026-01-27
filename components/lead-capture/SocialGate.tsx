'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, CheckCircle } from 'lucide-react';

interface SocialGateProps {
    onUnlock: () => void;
    isSubmitting: boolean;
}

export default function SocialGate({ onUnlock, isSubmitting }: SocialGateProps) {
    const [linkedinClicked, setLinkedinClicked] = useState(false);
    const [instagramClicked, setInstagramClicked] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (linkedinClicked && instagramClicked) {
            setCanSubmit(true);
        }
    }, [linkedinClicked, instagramClicked]);

    const handleLinkedinClick = () => {
        setLinkedinClicked(true);
        window.open('https://www.linkedin.com/company/bwmc-uue', '_blank');
    };

    const handleInstagramClick = () => {
        setInstagramClicked(true);
        window.open('https://www.instagram.com/bwmc_uae', '_blank');
    };

    return (
        <div className="space-y-8 text-center">
            <div className="space-y-2">
                <h3 className="text-2xl font-bold text-navy">Get UAE Business Setup Updates</h3>
                <p className="text-gray-600">
                    We share real updates on business setup costs, banking changes, and tax rules.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-md mx-auto">
                <button
                    type="button"
                    onClick={handleLinkedinClick}
                    className={`relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${linkedinClicked
                            ? 'bg-blue-50 border-blue-600 text-blue-800'
                            : 'bg-white border-gray-200 hover:border-blue-600 text-gray-700'
                        }`}
                >
                    <Linkedin className={`w-6 h-6 ${linkedinClicked ? 'text-blue-600' : '#0077b5'}`} />
                    <span className="font-semibold">Follow on LinkedIn</span>
                    {linkedinClicked && (
                        <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleInstagramClick}
                    className={`relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${instagramClicked
                            ? 'bg-purple-50 border-purple-600 text-purple-800'
                            : 'bg-white border-gray-200 hover:border-purple-600 text-gray-700'
                        }`}
                >
                    <Instagram className={`w-6 h-6 ${instagramClicked ? 'text-purple-600' : '#E1306C'}`} />
                    <span className="font-semibold">Follow on Instagram</span>
                    {instagramClicked && (
                        <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                    )}
                </button>
            </div>

            {canSubmit && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                >
                    <button
                        onClick={onUnlock}
                        disabled={isSubmitting}
                        className="w-full max-w-md mx-auto bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit & Get Setup Checklist'}
                    </button>
                </motion.div>
            )}
        </div>
    );
}
