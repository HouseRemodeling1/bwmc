"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Step1Activity from "./calculator/Step1Activity";
import Step2Visa from "./calculator/Step2Visa";
import Step3Location from "./calculator/Step3Location";
import LeadGate from "./calculator/LeadGate";
import Step4Results from "./calculator/Step4Results";

export default function BusinessCalculator() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showGate, setShowGate] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        activity: "",
        businessName: "",
        visaCount: null as number | null,
        jurisdiction: null as "mainland" | "freezone" | null,
        lead: {
            name: "",
            whatsapp: ""
        }
    });

    // Handlers
    const handleStep1Next = () => setCurrentStep(2);

    const handleStep2Next = () => setCurrentStep(3);
    const handleStep2Back = () => setCurrentStep(1);

    const handleStep3Back = () => setCurrentStep(2);

    // Triggered when Step 3 is done (Mainland popup handled internally in Step 3)
    const handleStep3Next = () => {
        setShowGate(true);
    };

    const handleGateComplete = async (leadData: { name: string; whatsapp: string }) => {
        setFormData(prev => ({ ...prev, lead: leadData }));

        // Submit to API
        try {
            await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    lead: leadData,
                    type: "calculator_lead"
                }),
            });
        } catch (error) {
            console.error("Failed to save lead", error);
        }

        setShowGate(false);
        setCurrentStep(4);
    };

    return (
        <div className="min-h-[600px] w-full max-w-5xl mx-auto">
            {/* Progress Bar (Visible only for steps 1-3) */}
            {currentStep < 4 && !showGate && (
                <div className="mb-12 max-w-xl mx-auto">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-royal-blue transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span className={currentStep >= 1 ? "text-royal-blue" : ""}>Activity</span>
                        <span className={currentStep >= 2 ? "text-royal-blue" : ""}>Visas</span>
                        <span className={currentStep >= 3 ? "text-royal-blue" : ""}>Location</span>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-sm border border-gray-100 min-h-[500px] relative">
                <AnimatePresence mode="wait">
                    {/* Step 1: Activity & Name */}
                    {currentStep === 1 && (
                        <Step1Activity
                            key="step1"
                            activity={formData.activity}
                            setActivity={(val) => setFormData(prev => ({ ...prev, activity: val }))}
                            businessName={formData.businessName}
                            setBusinessName={(val) => setFormData(prev => ({ ...prev, businessName: val }))}
                            onNext={handleStep1Next}
                        />
                    )}

                    {/* Step 2: Visa */}
                    {currentStep === 2 && (
                        <Step2Visa
                            key="step2"
                            value={formData.visaCount}
                            onChange={(val) => setFormData(prev => ({ ...prev, visaCount: val }))}
                            onNext={handleStep2Next}
                            onBack={handleStep2Back}
                        />
                    )}

                    {/* Step 3: Location */}
                    {currentStep === 3 && !showGate && (
                        <Step3Location
                            key="step3"
                            value={formData.jurisdiction}
                            onChange={(val) => setFormData(prev => ({ ...prev, jurisdiction: val }))}
                            onNext={handleStep3Next}
                            onBack={handleStep3Back}
                        />
                    )}

                    {/* Lead Gate */}
                    {showGate && (
                        <LeadGate
                            key="gate"
                            onComplete={handleGateComplete}
                        />
                    )}

                    {/* Step 4: Results */}
                    {currentStep === 4 && (
                        <Step4Results
                            key="step4"
                            jurisdiction={formData.jurisdiction}
                            visaCount={formData.visaCount}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
