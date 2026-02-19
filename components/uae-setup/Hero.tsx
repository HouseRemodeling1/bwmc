"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, CheckCircle2, Calculator, Loader2, Send, Check, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    const [showContactOptions, setShowContactOptions] = useState(false);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-gray-50 pt-28 pb-20 lg:pt-36">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 text-royal-blue mb-6">
                            <span className="text-sm font-bold tracking-wide uppercase">Trusted by 100+ Businesses Across the UAE</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy leading-tight mb-6">
                            Set Up Your UAE Business <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-600">
                                the Right Way — Fast & Compliant
                            </span>
                        </h1>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>Licenses Starting From AED 3,999</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>Setup in as little as 48 hours</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>FTA Registered | Ministry of Economy Approved</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>12 Years in the UAE Market</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#uae-setup-form"
                                className="px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Get a Free Cost Estimate
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <div className="relative">
                                <button
                                    onClick={() => setShowContactOptions(!showContactOptions)}
                                    className="px-8 py-4 bg-white border border-gray-200 hover:border-gold/50 text-navy font-bold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto"
                                >
                                    Connect with an Expert
                                    <ArrowRight className={`w-5 h-5 transition-transform ${showContactOptions ? "rotate-90" : ""}`} />
                                </button>

                                {showContactOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                                    >
                                        <div className="p-2 space-y-1">
                                            <a
                                                href="tel:+97145488184"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-navy font-medium transition-colors"
                                            >
                                                <div className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Phone className="w-5 h-5 text-royal-blue" />
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-bold">Call Now</span>
                                                    <span className="text-xs text-gray-500">+971 4 548 8184</span>
                                                </div>
                                            </a>
                                            <a
                                                href="https://wa.me/971543097850"
                                                target="_blank"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-navy font-medium transition-colors"
                                            >
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <MessageCircle className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-bold">WhatsApp</span>
                                                    <span className="text-xs text-gray-500">Chat with us</span>
                                                </div>
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Lead Capture Form (Only Heading/Image or simplified form? - Global uses form, prompt says "CTA scrolls to bottom". But wait, the hero design in global setup has a form on the right. 
                    The Prompt says "CTA Buttons: Primary... scrolls to bottom form". 
                    However, maintaining "exact same structure" suggests the layout should be the same. 
                    If keeping exact structure, the right side should be the form? OR maybe the image?
                    Global page has a form on the right. 
                    If the prompt explicitly says "Primary: Get a Free Cost Estimate (scrolls to bottom form)", it implies there is NO form in the hero, or the button directs elsewhere.
                    BUT "Keep the exact same structure". This is conflicting.
                    If I remove the form from Hero, I change the structure.
                    If I keep the form, the button scrolling to bottom is redundant if the form is right there.
                    Hypothesis: The user might want the Visual structure (Left text, Right Form) OR the user might want text on left and image on right?
                    Let's look at the Global Page again. `Hero.tsx` has `Lead Capture Form` on the right.
                    If I want to "Keep the exact same structure", I should keep the form on the right. 
                    However, the prompt says "CTA Buttons... (scrolls to bottom form)".
                    Maybe the user wants the form at the bottom ONLY?
                    "Form headline: 'Get Your Free Cost Estimate' ... (scrolls to bottom form)"
                    And "FINAL CTA / CONTACT FORM SECTION" is also described.
                    I will follow the content instructions. If the user says "scrolls to bottom form", I should probably NOT have the form in the Hero, OR just make the button scroll to the bottom form even if there is one in the hero (which would be weird).
                    Alternative: The Global Hero might have a form, but for this page, maybe I should replace the form with an Image?
                    "do not redesign anything — this is a content and copy swap".
                    If I replace Form with Image, that is a design change.
                    If I keep the Form, I should probably update the form in the hero to match the bottom form (Emirate dropdown).
                    BUT the prompt for Hero doesn't mention the form on the right. It just lists headlines and buttons.
                    Usually, if a user specifies buttons, they are for the left side.
                    If the user wants me to keep the structure, I will keep the form on the right, but maybe the button scrolls to the bottom one? Or I can just make the button scroll to the hero form?
                    Actually, let's look at the "CTA Buttons" instruction: "Primary: Get a Free Cost Estimate (scrolls to bottom form)".
                    And the "Form field ... REPLACE the 'Country' field". This refers to the "FINAL CTA / CONTACT FORM SECTION".
                    It seems the user envisions a form at the bottom.
                    If I keep the form in the Hero, I should update it too.
                    However, if I look at "SECTION 7 — FOUNDER SECTION ... SECTION 8, 9 ... FINAL CTA / CONTACT FORM SECTION", it implies a linear flow.
                    I will replace the Hero Form with an Image to match the "text + image" expectation of a standard hero if the user implies no form there, BUT "Keep the exact same structure" is strong.
                    Wait, if the Global Page has a form in the Hero, and I'm supposed to keep the structure, I should arguably keep the form. But the specific content instructions for Hero don't mention a form.
                    I will compromise: I'll keep the Form in the Hero (creating `HeroForm` or reusing `UAESetupForm` inside Hero), but I will make the main CTA button scroll to the *bottom* form as requested, OR I'll make it scroll to the Hero form if it's visible? 
                    Actually, if there is a form in the Hero, the "Get a Free Cost Estimate" button would usually be *below* the form or the form is the way to get it.
                    The Global Hero has a form.
                    If I mistakenly remove the form, I break the "exact same structure" rule.
                    I will keep the form in the Hero. I will update it to be the `UAESetupForm` (or similar fields).
                    The prompt's instruction "scrolls to bottom form" might just be because they envision a long page. I will link the button to `#uae-setup-form` which I will put on the bottom form.
                    And I will perhaps leave the right side as `UAESetupForm` as well?
                    Let's check the global hero code again.
                    It has `handleSubmit` and render form directly.
                    I will replace the form in the Hero with an Image if the user didn't ask for a form there?
                    Actually, the user gave specific copy for "HERO SECTION". It includes Headlines, Subheadlines, Badges, CTAs. It does NOT describe a form.
                    If I keep the form, I venture into unrequested content.
                    If I remove the form, I venture into design change.
                    However, an Image is a safer placeholder than a Form if the copy doesn't support it.
                    BUT, `Hero.tsx` in global-setup uses a grid with 2 cols. Left is text, Right is Form.
                    If I change Right to Image, I am changing the content type but keeping the layout (2 cols).
                    The user says "SECTION 4 — PROCESS (same step style as global page)".
                    I will strictly follow "Keep the exact same structure". Structure = Layout.
                    Layout = 2 Columns.
                    Content = Text | Form.
                    I'll keep the form in the hero. It's high converting. I'll make it the same as the bottom form.
                    And I'll make the "Get a Free Cost Estimate" button scroll to the bottom form (as requested).
                    Actually, if there is a form right next to the button, filtering to the bottom is weird.
                    Maybe I should link it to the hero form? No, I'll follow the instruction "scrolls to bottom form".
                    And I will REUSE the new `UAESetupForm` in the Hero if possible, or copy the code.
                    The Global Hero has the form hardcoded.
                    I will paste the `Hero` code and modify the Right Side to be the `UAESetupForm` logic (with Emirate dropdown).

                    Actually, looking at `Hero.tsx` in global setup:
                    It has a form with `Country` field.
                    I should replace `Country` with `Emirate`.
                    I will duplicate `Hero.tsx` to `components/uae-setup/Hero.tsx` and apply the changes:
                    1. Text changes (Headline, Subhead, Badges, Buttons).
                    2. Right side form changes (Country -> Emirate dropdown).
                    3. Button href -> `#uae-setup-form` (The bottom form).
                    
                    Wait, if I have a form in the hero, why scroll to bottom?
                    Maybe I should make the "Get a Free Cost Estimate" button scroll to the *Hero* form (mobile) or focus it?
                    The user specifically said "scrolls to bottom form".
                    I will obey that specific instruction.
                    And I will keep the form on the right side of the hero because of "Keep exact same structure".
                    
                    Let's refine the Hero Form:
                    "Form fields (same style as global page but with one change): ... Emirate ... REPLACE the 'Country' field".
                    This instruction is under "FINAL CTA / CONTACT FORM SECTION".
                    But since I am keeping the structure, I will apply this to the Hero form too.
                */}
                    {/* Right: Lead Capture Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* I will inline the form logic here like the original Hero component, but updated */}
                        <HeroForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function HeroForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        emirate: "Dubai",
        email: "",
        phone: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const payload = {
                businessName: formData.company,
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                mobile: formData.phone,
                businessActivity: "Business Setup (Hero Form)",
                jurisdiction: "UAE Setup",
                country: formData.emirate, // Using Emirate as country/location
                message: "Interested in UAE Setup"
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", emirate: "Dubai" });
                // Trigger Google Ads Conversion
                if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
                    (window as any).gtag_report_conversion();
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-navy mb-2">Get Your Free Cost Estimate</h3>
                <p className="text-gray-500 text-sm">Fill out the form below and our experts will contact you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {status === "success" ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-2">Request Sent!</h4>
                        <p className="text-gray-600 mb-6">
                            We've received your inquiry. Check your email for a confirmation.
                        </p>
                        <button onClick={() => setStatus("idle")} className="text-royal-blue font-bold hover:underline">
                            Submit another request
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Company</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                    placeholder="Business Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Emirate</label>
                                <select
                                    value={formData.emirate}
                                    onChange={e => setFormData({ ...formData, emirate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                >
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="RAK">RAK</option>
                                    <option value="Fujairah">Fujairah</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                placeholder="john@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                placeholder="+971 50 123 4567"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-gold hover:bg-yellow-600 text-navy font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "submitting" ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Get My Free Consultation
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-xs text-center text-gray-400 mt-4">
                            By submitting this form, you agree to our privacy policy. Your information is secure.
                        </p>
                    </>
                )}
            </form>
        </div>
    );
}
