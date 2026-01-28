'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Building2, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import SocialGate from './SocialGate';
import ThankYou from './ThankYou';

type QuestionOption = {
    label: string;
    value: string;
};

type Question = {
    id: string;
    question: string;
    type: 'radio' | 'text' | 'contact' | 'checkbox';
    options?: QuestionOption[];
    multiSelect?: boolean;
};

const questions: Question[] = [
    {
        id: 'plan',
        question: 'Are you planning to set up a company in the UAE?',
        type: 'radio',
        options: [
            { label: 'Immediately', value: 'immediately' },
            { label: 'Within 6 months', value: 'within_6_months' },
            { label: 'Exploring options', value: 'exploring' },
            { label: 'Already have a company', value: 'existing_company' },
        ],
    },
    {
        id: 'business_type',
        question: 'What type of business are you planning?',
        type: 'radio',
        options: [
            { label: 'Trading', value: 'trading' },
            { label: 'Consultancy / Services', value: 'consultancy' },
            { label: 'E-commerce', value: 'ecommerce' },
            { label: 'Holding / Investment', value: 'holding' },
            { label: 'Not decided', value: 'not_decided' },
        ],
    },
    {
        id: 'structure',
        question: 'Preferred structure (if known)?',
        type: 'radio',
        options: [
            { label: 'Mainland', value: 'mainland' },
            { label: 'Free Zone', value: 'free_zone' },
            { label: 'Offshore / Holding', value: 'offshore' },
            { label: 'Need advice', value: 'advice' },
        ],
    },
    {
        id: 'concern',
        question: 'Your main concern right now (choose up to 2):',
        type: 'radio', // Technically multi-select logic, but handled as custom
        multiSelect: true,
        options: [
            { label: 'Setup cost', value: 'cost' },
            { label: 'Bank account opening', value: 'banking' },
            { label: 'Visas', value: 'visas' },
            { label: 'Taxes / Corporate Tax', value: 'tax' },
            { label: 'Ongoing compliance', value: 'compliance' },
        ],
    },
    {
        id: 'timeline',
        question: 'When would you like to start?',
        type: 'radio',
        options: [
            { label: 'Immediately', value: 'immediately' },
            { label: '1–3 months', value: '1_3_months' },
            { label: '3–6 months', value: '3_6_months' },
            { label: 'Just researching', value: 'researching' },
        ],
    },
    {
        id: 'contact',
        question: 'Contact Details',
        type: 'contact', // Custom type for the multi-field step
    },
];

export default function LeadCaptureWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isCompleted, setIsCompleted] = useState(false);
    const [direction, setDirection] = useState(0);

    const totalSteps = questions.length + 1; // +1 for Social Gate

    const handleNext = () => {
        if (!canProceed()) return;

        // Trigger silent submission if completing the contact step
        const currentQ = questions[currentStep];
        if (currentQ?.type === 'contact') {
            performSubmission();
        }

        setDirection(1);
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        setCurrentStep((prev) => Math.max(0, prev - 1));
    };

    const handleSelect = (key: string, value: string, multi: boolean = false) => {
        if (multi) {
            const current = (formData[key] as string[]) || [];
            const exists = current.includes(value);
            if (exists) {
                setFormData({ ...formData, [key]: current.filter((v) => v !== value) });
            } else {
                if (current.length < 2) {
                    setFormData({ ...formData, [key]: [...current, value] });
                }
            }
        } else {
            setFormData({ ...formData, [key]: value });
            // Auto advance for radio buttons after short delay for better UX
            setTimeout(() => {
                setDirection(1);
                setCurrentStep((prev) => prev + 1);
            }, 300);
        }
    };

    const handleContactChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                [field]: value,
            },
        });
    };

    const canProceed = () => {
        const q = questions[currentStep];
        if (!q) return false; // Should not happen

        if (q.type === 'contact') {
            const c = formData.contact || {};
            return c.name && c.phone && c.email && c.consent;
        }

        if (q.multiSelect) {
            return formData[q.id] && formData[q.id].length > 0;
        }

        return !!formData[q.id];
    };

    const performSubmission = async () => {
        // If already succeeded, don't submit again
        if (submissionStatus === 'success') return true;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Submission failed:', response.status, errorText);
                setSubmissionStatus('error');
                return false;
            }

            console.log('Submission successful');
            setSubmissionStatus('success');
            return true;
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        const success = await performSubmission();
        if (success) {
            setIsCompleted(true);
        }
    };

    if (isCompleted) {
        return <ThankYou />;
    }

    const progress = ((currentStep + 1) / totalSteps) * 100;
    const currentQuestion = questions[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2">
                <div
                    className="bg-royal-blue h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="p-6 md:p-10 flex-1 flex flex-col">
                {currentStep < questions.length ? (
                    <>
                        <div className="mb-8">
                            <span className="text-sm font-semibold text-royal-blue uppercase tracking-wider">
                                Step {currentStep + 1} of {totalSteps}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-navy mt-2">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentStep}
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1"
                            >
                                {currentQuestion.type === 'contact' ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all text-black"
                                                placeholder="John Doe"
                                                value={formData.contact?.name || ''}
                                                onChange={(e) => handleContactChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (WhatsApp preferred)</label>
                                            <input
                                                type="tel"
                                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all text-black"
                                                placeholder="+971 50 123 4567"
                                                value={formData.contact?.phone || ''}
                                                onChange={(e) => handleContactChange('phone', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all text-black"
                                                placeholder="john@example.com"
                                                value={formData.contact?.email || ''}
                                                onChange={(e) => handleContactChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-start gap-3 mt-4">
                                            <input
                                                type="checkbox"
                                                id="consent"
                                                className="mt-1 w-5 h-5 text-royal-blue rounded border-gray-300 focus:ring-royal-blue"
                                                checked={formData.contact?.consent || false}
                                                onChange={(e) => handleContactChange('consent', e.target.checked ? 'yes' : '')}
                                            />
                                            <label htmlFor="consent" className="text-sm text-gray-600">
                                                I agree to be contacted regarding UAE company setup services.
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3">
                                        {currentQuestion.options?.map((option) => {
                                            const isSelected = currentQuestion.multiSelect
                                                ? (formData[currentQuestion.id] as string[])?.includes(option.value)
                                                : formData[currentQuestion.id] === option.value;

                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleSelect(currentQuestion.id, option.value, currentQuestion.multiSelect)}
                                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${isSelected
                                                        ? 'border-royal-blue bg-blue-50 text-royal-blue shadow-md'
                                                        : 'border-gray-200 hover:border-royal-blue hover:bg-gray-50 text-black'
                                                        }`}
                                                >
                                                    <span className="font-semibold text-lg">{option.label}</span>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-royal-blue bg-royal-blue' : 'border-gray-300 group-hover:border-royal-blue'
                                                        }`}>
                                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-navy hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>

                            {/* Show Next button mainly for Multi-select or Contact step where auto-advance isn't used */}
                            {(currentQuestion.multiSelect || currentQuestion.type === 'contact') && (
                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all shadow-lg ${canProceed()
                                        ? 'bg-[#D4AF37] hover:bg-[#b5952f] transform active:scale-95'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    Next step
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <SocialGate onUnlock={handleSubmit} isSubmitting={isSubmitting} />
                )}
            </div>
        </div>
    );
}
