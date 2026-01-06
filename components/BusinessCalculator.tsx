"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "./calculator/ProgressBar";
import Step1LeadCapture from "./calculator/Step1LeadCapture";
import Step2Requirements from "./calculator/Step2Requirements";
import Step3FreeZone from "./calculator/Step3FreeZone";
import Step3Mainland from "./calculator/Step3Mainland";

export default function BusinessCalculator() {
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1: Lead Capture
    const [leadData, setLeadData] = useState({
        businessName: "",
        contactName: "",
        mobile: "",
        email: "",
    });

    // Step 2: Requirements
    const [requirementsData, setRequirementsData] = useState({
        businessActivity: "",
        jurisdiction: "" as "mainland" | "freezone" | "",
    });

    // Step 3a: Free Zone Data
    const [freeZoneData, setFreeZoneData] = useState({
        freezone: "SHAMS",
        officeType: "Virtual Office",
        visaCount: 1,
        contractYears: 1,
    });

    // Step 3b: Mainland Data
    const [mainlandData, setMainlandData] = useState({
        officeType: "" as "physical" | "virtual" | "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStep1Next = () => {
        setCurrentStep(2);
    };

    const handleStep2Next = () => {
        setCurrentStep(3);
    };

    const handleStep2Back = () => {
        setCurrentStep(1);
    };

    const handleStep3Back = () => {
        setCurrentStep(2);
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);

        try {
            const payload = {
                ...leadData,
                ...requirementsData,
                ...(requirementsData.jurisdiction === "freezone"
                    ? { freezone: freeZoneData }
                    : { mainland: mainlandData }
                ),
            };

            const response = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Show success message or redirect
                alert("Thank you! Your quote request has been submitted. We'll contact you shortly.");
                // Reset form
                setCurrentStep(1);
                setLeadData({ businessName: "", contactName: "", mobile: "", email: "" });
                setRequirementsData({ businessActivity: "", jurisdiction: "" });
                setFreeZoneData({ freezone: "SHAMS", officeType: "Virtual Office", visaCount: 1, contractYears: 1 });
                setMainlandData({ officeType: "" });
            } else {
                alert("Something went wrong. Please try again or contact us directly.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[600px]">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} totalSteps={3} />

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <Step1LeadCapture
                        key="step1"
                        formData={leadData}
                        onUpdate={(data) => setLeadData({ ...leadData, ...data })}
                        onNext={handleStep1Next}
                    />
                )}

                {currentStep === 2 && (
                    <Step2Requirements
                        key="step2"
                        formData={requirementsData}
                        onUpdate={(data) => setRequirementsData({ ...requirementsData, ...data })}
                        onNext={handleStep2Next}
                        onBack={handleStep2Back}
                    />
                )}

                {currentStep === 3 && requirementsData.jurisdiction === "freezone" && (
                    <Step3FreeZone
                        key="step3-freezone"
                        formData={freeZoneData}
                        onUpdate={(data) => setFreeZoneData({ ...freeZoneData, ...data })}
                        onBack={handleStep3Back}
                        onSubmit={handleFinalSubmit}
                    />
                )}

                {currentStep === 3 && requirementsData.jurisdiction === "mainland" && (
                    <Step3Mainland
                        key="step3-mainland"
                        formData={mainlandData}
                        onUpdate={(data) => setMainlandData({ ...mainlandData, ...data })}
                        onBack={handleStep3Back}
                        onSubmit={handleFinalSubmit}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
