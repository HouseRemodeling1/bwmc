"use client";

import React, { useState, useEffect } from "react";
import { Lock, Calculator, Copy, Printer, CheckCircle, Smartphone, Building2, User, Users, Briefcase, MapPin, Layers } from "lucide-react";

// --- Configuration ---
const PASSWORD = process.env.NEXT_PUBLIC_STAFF_PASSWORD || "BWMC2026";

const JURSIDICTIONS = [
    { id: "dubai-mainland", name: "Dubai Mainland (6-Stage)", type: "mainland" },
    { id: "freezone", name: "Freezone", type: "freezone" },
    // Keeping others hidden for now to focus on the requested 6-stage model
];

const ADDONS = [
    { id: "medical", name: "VIP Medical & Emirates ID", price: 2500, cost: 800 },
    { id: "tax", name: "Corporate Tax Registration", price: 1500, cost: 0 },
    { id: "bank", name: "Bank Account Opening Assistance", price: 3000, cost: 0 },
];

export default function StaffPortal() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");

    // --- Form State ---
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [jurisdiction, setJurisdiction] = useState(JURSIDICTIONS[0].id);
    const [visaCount, setVisaCount] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [discount, setDiscount] = useState(0);

    // --- Dubai 6-Stage Form ---
    const [dubaiForm, setDubaiForm] = useState({
        activityType: "Standard", // Standard | Tourism | Transport | Regulated
        tradeName: "Local", // Local | Foreign
        rentAmount: 30000,
        profFee: 0, // Custom Agency Fee (starts at 0)
    });

    // --- Calculations ---
    const [totals, setTotals] = useState({
        stage1: 0, // Pre-Licensing
        stage2: 0, // Activity
        stage3: 0, // Legal
        stage4: 0, // Finalization
        stage5: 0, // Post-License
        stage6: 0, // Service
        govtTotal: 0,
        grandTotal: 0,
        breakdown: {} as any
    });

    useEffect(() => {
        const session = sessionStorage.getItem("bwmc_staff_auth");
        if (session === "true") setIsAuthenticated(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("bwmc_staff_auth", "true");
            setError("");
        } else {
            setError("Incorrect Access Code");
        }
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const updateDubai = (field: string, value: any) => {
        setDubaiForm(prev => ({ ...prev, [field]: value }));
    };

    // --- The Brain (6-Stage Logic) ---
    useEffect(() => {
        if (jurisdiction === "dubai-mainland") {
            // --- STAGE 1: Pre-Licensing (Fixed) ---
            const initAppSys = 117;
            const initAppIss = 120;
            const nameApp = 117;
            const nameApprov = 620;
            const foreignSurcharge = dubaiForm.tradeName === "Foreign" ? 2000 : 0;

            const s1_total = initAppSys + initAppIss + nameApp + nameApprov + foreignSurcharge;

            // --- STAGE 2: Activity Clearance ---
            let s2_total = 0;
            let activityFee = 0;
            if (dubaiForm.activityType === "Tourism") {
                activityFee = 8620; // DCAA
            } else if (dubaiForm.activityType === "Transport") {
                activityFee = 3000; // RTA (Default)
            }
            s2_total = activityFee;

            // --- STAGE 3: Legal & Infra ---
            const moa = 500; // Base
            const insurance = dubaiForm.activityType === "Tourism" ? 3000 : 0;
            const marketFee = (Number(dubaiForm.rentAmount) || 0) * 0.05;

            const s3_total = moa + insurance + marketFee;

            // --- STAGE 4: License Finalization ---
            const issuance = 10000; // Default Base
            const innovation = 40;
            const chamber = 1200;

            const s4_total = issuance + innovation + chamber;

            // --- STAGE 5: Post-License (Visas) ---
            const estCard = 750;
            const visaUnitCost = 5000; // Entry, Status, Med, ID
            const visaTotal = visaCount * visaUnitCost;

            const s5_total = estCard + visaTotal;

            // --- STAGE 6: Service Fee ---
            const s6_total = Number(dubaiForm.profFee) || 0;

            // --- TALLY ---
            const govtTotal = s1_total + s2_total + s3_total + s4_total + s5_total;

            // Addons (Optional - let's keep separate from the 6 stages or merge into Service?)
            // User prompt didn't specify Addons in the 6 stages, so let's add them to Grand Total distinct
            // OR assummed part of the "Grand Total". Let's stick to the prompt's structure first.

            let addonTotal = 0;
            selectedAddons.forEach((addonId) => {
                const addon = ADDONS.find((a) => a.id === addonId);
                if (addon) addonTotal += addon.price;
            });

            const grandTotal = govtTotal + s6_total + addonTotal - discount;

            setTotals({
                stage1: s1_total,
                stage2: s2_total,
                stage3: s3_total,
                stage4: s4_total,
                stage5: s5_total,
                stage6: s6_total,
                govtTotal,
                grandTotal,
                breakdown: { marketFee }
            });

        } else {
            // Fallback Freezone (Simplified for now)
            setTotals({
                stage1: 4888, stage2: 0, stage3: 0, stage4: 0, stage5: visaCount * 3500, stage6: 5000,
                govtTotal: 4888 + (visaCount * 3500),
                grandTotal: 4888 + (visaCount * 3500) + 5000,
                breakdown: {}
            });
        }

    }, [jurisdiction, visaCount, selectedAddons, discount, dubaiForm]);

    // --- Output Generators ---
    const generateWhatsApp = () => {
        const text = `Hi ${clientName || "there"}, great speaking with you.\n\n` +
            `Here is the 6-Stage Breakdown for *${businessName || "Your Business"}* (Dubai Mainland):\n\n` +
            `1️⃣ Pre-Licensing: AED ${totals.stage1.toLocaleString()}\n` +
            `2️⃣ Approvals: AED ${totals.stage2.toLocaleString()}\n` +
            `3️⃣ Legal/Infra: AED ${totals.stage3.toLocaleString()}\n` +
            `4️⃣ Finalization: AED ${totals.stage4.toLocaleString()}\n` +
            `5️⃣ Post-License (${visaCount} Visas): AED ${totals.stage5.toLocaleString()}\n` +
            `6️⃣ Professional Fee: AED ${totals.stage6.toLocaleString()}\n` +
            `\n` +
            `💰 *Grand Total:* AED ${totals.grandTotal.toLocaleString()}\n` +
            `\n` +
            `Note: Market/Activity fees subject to final IID invoice.\n` +
            `– BWMC Team`;

        navigator.clipboard.writeText(text);
        alert("WhatsApp message copied to clipboard!");
    };

    const handlePrint = () => {
        window.print();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-100 p-3 rounded-full">
                            <Lock className="w-8 h-8 text-emerald-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Staff Access Only</h2>
                    <p className="text-center text-neutral-500 mb-8">Please enter your staff code to access the calculator.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter Code"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Unlock Terminal
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 print:bg-white text-neutral-900">

            {/* --- Navbar (Screen Only) --- */}
            <nav className="bg-neutral-900 text-white p-4 print:hidden sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-emerald-400" />
                        <span className="font-bold text-lg tracking-tight">BWMC <span className="font-light text-neutral-400">Internal</span></span>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setJurisdiction("dubai-mainland")} className={`text-sm ${jurisdiction === "dubai-mainland" ? "text-emerald-400" : "text-neutral-400"}`}>Dubai 6-Stage</button>
                        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-neutral-400 hover:text-white transition-colors">Logout</button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- LEFT COLUMN: Input (Screen Only) --- */}
                    <div className="lg:col-span-4 space-y-6 print:hidden">

                        {/* 1. Client Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <User className="w-5 h-5 text-emerald-600" /> Client Details
                            </h3>
                            <div className="space-y-3">
                                <input type="text" placeholder="Client Name" className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={clientName} onChange={e => setClientName(e.target.value)} />
                                <input type="text" placeholder="Mobile / WhatsApp" className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                                <input type="text" placeholder="Proposed Business Name" className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={businessName} onChange={e => setBusinessName(e.target.value)} />
                            </div>
                        </div>

                        {/* 2. Dubai 6-Stage Input Variables */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <Layers className="w-5 h-5 text-emerald-600" /> Input Variables
                            </h3>
                            {jurisdiction === "dubai-mainland" ? (
                                <div className="space-y-4 animate-in fade-in">
                                    <div>
                                        <label className="text-xs text-neutral-500 block mb-1">Activity Type</label>
                                        <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={dubaiForm.activityType} onChange={e => updateDubai("activityType", e.target.value)}>
                                            <option value="Standard">Standard</option>
                                            <option value="Regulated">Regulated (General)</option>
                                            <option value="Tourism">Tourism (DCAA)</option>
                                            <option value="Transport">Transport (RTA)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs text-neutral-500 block mb-1">Trade Name Type</label>
                                        <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={dubaiForm.tradeName} onChange={e => updateDubai("tradeName", e.target.value)}>
                                            <option value="Local">Arabic-Only / Local</option>
                                            <option value="Foreign">Foreign / Non-Arabic (+2k)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="flex justify-between text-xs text-neutral-500 mb-1">
                                            <span>Office Annual Rent (AED)</span>
                                            <span>{Number(dubaiForm.rentAmount).toLocaleString()}</span>
                                        </label>
                                        <input type="range" min="10000" max="200000" step="5000" className="w-full accent-emerald-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer" value={dubaiForm.rentAmount} onChange={e => updateDubai("rentAmount", e.target.value)} />
                                        <p className="text-[10px] text-neutral-400 mt-1">Updates Market Fee (5%)</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-500 mb-1 flex justify-between">
                                            <span>Visa Count (x5,000)</span>
                                            <span className="text-emerald-600 font-bold">{visaCount}</span>
                                        </label>
                                        <input type="range" min="0" max="20" className="w-full accent-emerald-600" value={visaCount} onChange={e => setVisaCount(Number(e.target.value))} />
                                    </div>

                                    <div className="pt-2 border-t border-neutral-100">
                                        <label className="text-xs text-emerald-600 font-bold block mb-1">Professional Fee (Agency)</label>
                                        <input type="number" className="w-full p-2 text-sm border border-emerald-200 bg-emerald-50 rounded font-bold text-emerald-700" value={dubaiForm.profFee} onChange={e => updateDubai("profFee", e.target.value)} />
                                    </div>

                                </div>
                            ) : (
                                <div className="text-sm text-neutral-400 italic">Select Dubai Mainland above to activate variables.</div>
                            )}
                        </div>

                        {/* Addons */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <CheckCircle className="w-5 h-5 text-emerald-600" /> Extras
                            </h3>
                            <div className="space-y-3">
                                {ADDONS.map(addon => (
                                    <label key={addon.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors">
                                        <input type="checkbox" className="mt-1 accent-emerald-600 w-4 h-4" checked={selectedAddons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-neutral-800">{addon.name}</div>
                                            <div className="text-xs text-neutral-500">AED {addon.price.toLocaleString()}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN: Output --- */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Quote Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">

                            {/* Header */}
                            <div className="bg-[#111] text-white p-8 print:p-0 print:text-black print:bg-white print:border-b-2 print:border-black print:mb-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2 print:text-5xl">Official Quote</h1>
                                        <p className="text-neutral-400 print:text-neutral-600">Generated for <span className="text-white print:text-black font-semibold">{businessName || "Valued Client"}</span></p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-emerald-400 print:text-emerald-600 font-bold text-lg">BWMC</div>
                                        <div className="text-sm text-neutral-500">Dubai, UAE</div>
                                        <div className="text-sm text-neutral-500">{new Date().toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8 print:p-0">
                                <div className="space-y-2">

                                    {/* Summary */}
                                    <div className="mb-6 print:mb-4">
                                        <div className="font-semibold text-lg">Dubai Mainland Setup (6-Stage Model)</div>
                                        <div className="text-sm text-neutral-500">Configuration: {dubaiForm.activityType} Activity • {dubaiForm.tradeName} Name • {visaCount} Visas</div>
                                    </div>

                                    {/* 6 STAGES */}
                                    <div className="space-y-4">

                                        {/* Stage 1 */}
                                        <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                            <div>
                                                <div className="font-bold text-neutral-800">Stage 1: Pre-Licensing (Approvals)</div>
                                                <div className="text-xs text-neutral-500">Initial Approval, Name Reservation, Security Checks</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.stage1.toLocaleString()}</div>
                                        </div>

                                        {/* Stage 2 */}
                                        {totals.stage2 > 0 && (
                                            <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                                <div>
                                                    <div className="font-bold text-neutral-800">Stage 2: Activity Clearance</div>
                                                    <div className="text-xs text-neutral-500">External Approvals ({dubaiForm.activityType === "Tourism" ? "DCAA" : "RTA"})</div>
                                                </div>
                                                <div className="font-mono font-medium">{totals.stage2.toLocaleString()}</div>
                                            </div>
                                        )}

                                        {/* Stage 3 */}
                                        <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                            <div>
                                                <div className="font-bold text-neutral-800">Stage 3: Legal & Infrastructure</div>
                                                <div className="text-xs text-neutral-500">MOA, Market Fees (5% of Rent), Insurance</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.stage3.toLocaleString()}</div>
                                        </div>

                                        {/* Stage 4 */}
                                        <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                            <div>
                                                <div className="font-bold text-neutral-800">Stage 4: License Finalization</div>
                                                <div className="text-xs text-neutral-500">Issuance, Innovation Fees, Chamber of Commerce</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.stage4.toLocaleString()}</div>
                                        </div>

                                        {/* Stage 5 */}
                                        <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                            <div>
                                                <div className="font-bold text-neutral-800">Stage 5: Post-License Processing</div>
                                                <div className="text-xs text-neutral-500">Establishment Card + {visaCount} Visas (Full Pkg)</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.stage5.toLocaleString()}</div>
                                        </div>

                                        {/* Stage 6 */}
                                        <div className="bg-emerald-50 p-4 rounded-lg flex justify-between items-center border border-emerald-100 print:bg-white print:border-none print:py-2">
                                            <div>
                                                <div className="font-bold text-emerald-800">Stage 6: Professional Services</div>
                                                <div className="text-xs text-emerald-600">Agency Fees, Consultation, Typing &PRO</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.stage6.toLocaleString()}</div>
                                        </div>

                                        {/* Addons */}
                                        {selectedAddons.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-dashed border-neutral-200">
                                                {selectedAddons.map(id => {
                                                    const item = ADDONS.find(a => a.id === id);
                                                    if (!item) return null;
                                                    return (
                                                        <div key={id} className="flex justify-between text-sm py-1">
                                                            <span className="text-neutral-600">+ {item.name}</span>
                                                            <span>{item.price.toLocaleString()}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                    </div>

                                    <div className="mt-8 pt-8 border-t-2 border-neutral-900 flex justify-between items-end">
                                        <div className="text-sm text-neutral-500 max-w-xs">
                                            *Note: Market fees and Activity fees are subject to the specific invoice generated by Invest in Dubai (IID).
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-neutral-500 uppercase tracking-wider mb-1">Grand Total</div>
                                            <div className="text-4xl font-bold text-neutral-900">AED {totals.grandTotal.toLocaleString()}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
                            <button onClick={generateWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fae52] text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-green-100 transform active:scale-95">
                                <Smartphone className="w-5 h-5" /> Copy WhatsApp Message
                            </button>
                            <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white p-4 rounded-xl font-bold transition-all shadow-lg transform active:scale-95">
                                <Printer className="w-5 h-5" /> Generate Official PDF
                            </button>
                        </div>

                        {/* STAFF INTELLIGENCE */}
                        <div className="bg-neutral-800 rounded-xl p-6 text-neutral-300 print:hidden border border-neutral-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Lock className="w-32 h-32" />
                            </div>
                            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                Internal Profitability Dashboard
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Govt Stack (1-5)</div>
                                    <div className="text-2xl font-mono text-red-400">{totals.govtTotal.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Agency Fee (6)</div>
                                    <div className="text-2xl font-mono text-emerald-400">{totals.stage6.toLocaleString()}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-xs text-neutral-500 mb-1">Total Quote</div>
                                    <div className="text-2xl font-mono text-white">AED {totals.grandTotal.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
