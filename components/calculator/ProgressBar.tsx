"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-navy">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-xs text-gray-500">
                    {currentStep === 1 && "Tailoring your estimate"}
                    {currentStep === 2 && "Understanding your needs"}
                    {currentStep === 3 && "Calculating your investment"}
                </span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-royal-blue to-sky-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}
