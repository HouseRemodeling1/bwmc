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
            // Calculate the actual price for the sales team (hidden from user)
            let calculatedPrice = null;
            if (requirementsData.jurisdiction === "freezone") {
                const { getPrice } = await import("@/lib/calculatorPricing");
                calculatedPrice = getPrice(
                    freeZoneData.freezone,
                    freeZoneData.officeType,
                    "Standard License",
                    freeZoneData.visaCount,
                    freeZoneData.contractYears
                );
            }

            const payload = {
                ...leadData,
                ...requirementsData,
                ...(requirementsData.jurisdiction === "freezone"
                    ? { freezone: { ...freeZoneData, calculatedPrice } }
                    : { mainland: mainlandData }
                ),
            };

            const response = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                alert("✅ Thank you! Your detailed quote request has been submitted successfully.\n\nOur team will contact you within 1 hour via WhatsApp or email with your personalized quote.");
                // Reset form
                setCurrentStep(1);
                setLeadData({ businessName: "", contactName: "", mobile: "", email: "" });
                setRequirementsData({ businessActivity: "", jurisdiction: "" });
                setFreeZoneData({ freezone: "SHAMS", officeType: "Virtual Office", visaCount: 1, contractYears: 1 });
                setMainlandData({ officeType: "" });
            } else {
                console.error("API Error:", data);
                alert(`⚠️ We're experiencing technical difficulties.\n\nPlease contact us directly:\n📧 Email: sales@bwmc.ae\n📱 WhatsApp: +971 50 XXX XXXX\n\nWe apologize for the inconvenience.`);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert(`⚠️ Unable to submit your request at this time.\n\nPlease contact us directly:\n📧 Email: sales@bwmc.ae\n📱 WhatsApp: +971 50 XXX XXXX\n\nError: ${error instanceof Error ? error.message : 'Network error'}`);
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
