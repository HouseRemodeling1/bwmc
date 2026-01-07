"use client";

import React, { useState, useEffect } from "react";
import { Lock, Calculator, Copy, Printer, CheckCircle, Smartphone, Building2, User, Users, Briefcase, MapPin } from "lucide-react";

// --- Configuration ---
const PASSWORD = process.env.NEXT_PUBLIC_STAFF_PASSWORD || "BWMC2026";

const EMIRATES = [
    { id: "dubai", name: "Dubai (DED)" },
    { id: "abudhabi", name: "Abu Dhabi (TAMM)" },
    { id: "sharjah", name: "Sharjah (SEDD)" },
    { id: "ajman", name: "Ajman (DED)" },
    { id: "rak", name: "Ras Al Khaimah (DED)" },
    { id: "freezone", name: "Freezone (General)" },
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
    const [jurisdiction, setJurisdiction] = useState(EMIRATES[0].id); // Defaults to Dubai
    const [visaCount, setVisaCount] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [discount, setDiscount] = useState(0);

    // --- Mainland Specific State ---
    const [mainlandForm, setMainlandForm] = useState({
        legalType: "LLC", // LLC | Sole | Civil
        tradeName: "Foreign", // Foreign | Local
        premise: "Instant", // Instant | Physical | Tajer
        rentAmount: 60000, // For Market Fee
        activityGroup: "Standard", // Standard | Regulated | General
        externalApproval: 0, // Manual fee input
        bwmcServiceFee: 8000, // Our Markup
    });

    // --- Calculations ---
    const [totals, setTotals] = useState({
        basePrice: 0,
        visaPrice: 0,
        addonPrice: 0,
        subtotal: 0,
        total: 0,
        cost: 0,
        profit: 0,
        margin: 0,
        breakdown: {} as any // Detailed breakdown for mainland
    });

    useEffect(() => {
        // Check local storage for session
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

    const updateMainland = (field: string, value: any) => {
        setMainlandForm(prev => ({ ...prev, [field]: value }));
    };

    // --- The Brain (Multi-Emirate Logic Tree) ---
    useEffect(() => {
        let licenseCost = 0; // Pure Govt License Fees
        let federalCost = 0; // MoE + MOHRE Setup
        let marketFees = 0;
        let visaSale = 0;
        let visaCost = 0;
        let breakdown = {};

        const isMainland = jurisdiction !== "freezone";

        if (isMainland) {
            // 1. Emirate Specific Base Logic
            if (jurisdiction === "dubai") {
                // --- DUBAI Logic ---
                const actFee = 1500 + Number(mainlandForm.externalApproval);
                const trdName = mainlandForm.tradeName === "Foreign" ? 2000 : 620;
                const notary = mainlandForm.legalType === "LLC" ? 1200 : 500;
                const surcharges = 70; // Innovation etc
                const chamber = mainlandForm.activityGroup === "General" ? 3000 : 1200;

                // Market Fee
                if (mainlandForm.premise === "Instant") {
                    marketFees = 3000;
                } else {
                    marketFees = (Number(mainlandForm.rentAmount) || 0) * 0.05;
                }

                licenseCost = actFee + trdName + notary + surcharges + chamber;
                breakdown = { ...breakdown, Act: actFee, Nam: trdName, Mkt: marketFees };
            }
            else if (jurisdiction === "abudhabi") {
                // --- ABU DHABI Logic (Low Cost Leader) ---
                // Tajer Abu Dhabi / Virtual
                const base = mainlandForm.premise === "Instant" ? 790 : 1000;
                const chamber = 50;
                const trdName = mainlandForm.tradeName === "Foreign" ? 2000 : 0; // Often free in Tajer unless Foreign name

                marketFees = 0; // Exempt for new Tajer licenses usually
                licenseCost = base + chamber + trdName + Number(mainlandForm.externalApproval);
                breakdown = { ...breakdown, Base: base, Chm: chamber };
            }
            else if (jurisdiction === "sharjah") {
                // --- SHARJAH Logic ---
                const base = 5000; // Approx base for license + chamber
                const trdName = 1000; // Reservation

                // Market Fee (Lease Tax)
                // 10% for Foreign, 6% Local/GCC
                const rate = mainlandForm.tradeName === "Foreign" ? 0.10 : 0.06;
                marketFees = (Number(mainlandForm.rentAmount) || 0) * rate;
                if (marketFees < 2000) marketFees = 2000; // Min threshold often applies

                licenseCost = base + trdName + Number(mainlandForm.externalApproval);
                breakdown = { ...breakdown, Base: base, Mkt: marketFees };
            }
            else if (jurisdiction === "ajman") {
                // --- AJMAN Logic ---
                const issuance = 600;
                const csr = 1500;
                const chamber = 500;
                licenseCost = issuance + csr + chamber + Number(mainlandForm.externalApproval);
                marketFees = 0; // Often included or varied
                breakdown = { ...breakdown, Iss: issuance, CSR: csr };
            }
            else if (jurisdiction === "rak") {
                // --- RAK Logic ---
                const reg = 2100;
                const licFee = 2000; // varied
                const chamber = 1000;
                licenseCost = reg + licFee + chamber + Number(mainlandForm.externalApproval);
                breakdown = { ...breakdown, Reg: reg, Lic: licFee };
            }

            // 2. Federal Stack (MoE) - Applies to ALL Mainland LLCs
            if (mainlandForm.legalType === "LLC") {
                federalCost += 3000; // MoE Registration
            }

            // 3. Establishment Card Setup (MOHRE + Immigration)
            if (visaCount > 0) {
                federalCost += 2000; // Est Card
                federalCost += 2200; // ICP E-Channel (One time)
            }

        } else {
            // Freezone Logic (Simple)
            licenseCost = 4888; // Base
            marketFees = 0;
            federalCost = 0; // Freezones distinct
        }

        // --- VISAS ---
        if (isMainland) {
            // Detailed Mainland Visa Stack
            // Entry(1000) + Status(650) + Med(320) + ID(370) + Ins(600) = ~2940
            const costPerVisa = 2940;
            const salePerVisa = 5000; // Standard markup

            visaCost = visaCount * costPerVisa;
            visaSale = visaCount * salePerVisa;
        } else {
            // Freezone
            visaCost = visaCount * 2200;
            visaSale = visaCount * 3500;
        }

        // --- Price Assembly ---
        const totalLocalGovt = licenseCost + marketFees; // The DED/Economic part
        const totalFederal = federalCost; // The MoE/MOHRE part

        const totalGovtStack = totalLocalGovt + totalFederal;

        // BWMC Service Fee (Profit)
        const serviceFee = Number(mainlandForm.bwmcServiceFee) || 0;

        // Total Sale Price
        const baseSalePrice = totalGovtStack + serviceFee;

        // --- Addons ---
        let addonPriceTotal = 0;
        let addonCostTotal = 0;
        selectedAddons.forEach((addonId) => {
            const addon = ADDONS.find((a) => a.id === addonId);
            if (addon) {
                addonPriceTotal += addon.price;
                addonCostTotal += addon.cost;
            }
        });

        // --- Final Math ---
        const subtotal = baseSalePrice + visaSale + addonPriceTotal;
        const finalTotal = subtotal - Number(discount);

        const totalCost = totalGovtStack + visaCost + addonCostTotal;
        const profit = finalTotal - totalCost;
        const margin = finalTotal > 0 ? (profit / finalTotal) * 100 : 0;

        setTotals({
            basePrice: baseSalePrice,
            visaPrice: visaSale,
            addonPrice: addonPriceTotal,
            subtotal,
            total: finalTotal,
            cost: totalCost,
            profit,
            margin,
            breakdown: { ...breakdown, Fed: totalFederal, Mkt: marketFees, Lic: licenseCost }
        });
    }, [jurisdiction, visaCount, selectedAddons, discount, mainlandForm]);

    // --- Helpers ---
    const generateWhatsApp = () => {
        const jurisName = EMIRATES.find(j => j.id === jurisdiction)?.name;
        const addonsList = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).join(", ");

        const text = `Hi ${clientName || "there"}, great speaking with you.\n\n` +
            `Here is the breakdown for *${businessName || "Your Business"}*:\n\n` +
            `🏢 *Jurisdiction:* ${jurisName}\n` +
            `📜 *License Type:* ${mainlandForm.legalType}\n` +
            `🛂 *Visas Included:* ${visaCount}\n` +
            (selectedAddons.length > 0 ? `✨ *Extras:* ${addonsList}\n` : "") +
            `\n` +
            `💰 *Total Investment:* AED ${totals.total.toLocaleString()}\n` +
            `\n` +
            `This quote is valid for 7 days. I've attached the full breakdown. Shall we proceed with the initial approval?\n\n` +
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
                                value={passwordInput} // BWMC2026
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
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm text-neutral-400 hover:text-white transition-colors">
                        Logout
                    </button>
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

                        {/* 2. Strategy & Emirate */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <MapPin className="w-5 h-5 text-emerald-600" /> Jurisdiction & Scope
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-500 mb-1">Target Emirate / Zone</label>
                                    <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none font-medium" value={jurisdiction} onChange={e => setJurisdiction(e.target.value)}>
                                        {EMIRATES.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                    </select>
                                </div>

                                {jurisdiction !== "freezone" && (
                                    <div className="space-y-4 animate-in fade-in pt-2 border-t border-dashed border-neutral-200">
                                        <div>
                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                <div>
                                                    <label className="text-xs text-neutral-500 block mb-1">Premise Type</label>
                                                    <select className="w-full p-2 bg-neutral-50 text-sm border border-neutral-200 rounded" value={mainlandForm.premise} onChange={e => updateMainland("premise", e.target.value)}>
                                                        <option value="Instant">Instant / Tajer</option>
                                                        <option value="Physical">Physical Office</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-neutral-500 block mb-1">Trade Name</label>
                                                    <select className="w-full p-2 bg-neutral-50 text-sm border border-neutral-200 rounded" value={mainlandForm.tradeName} onChange={e => updateMainland("tradeName", e.target.value)}>
                                                        <option value="Foreign">Foreign (Surcharge)</option>
                                                        <option value="Local">Local / Arabic</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                <div>
                                                    <label className="text-xs text-neutral-500 block mb-1">Legal Form</label>
                                                    <select className="w-full p-2 bg-neutral-50 text-sm border border-neutral-200 rounded" value={mainlandForm.legalType} onChange={e => updateMainland("legalType", e.target.value)}>
                                                        <option value="LLC">LLC</option>
                                                        <option value="Sole">Sole Est.</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-neutral-500 block mb-1">Activity Tier</label>
                                                    <select className="w-full p-2 bg-neutral-50 text-sm border border-neutral-200 rounded" value={mainlandForm.activityGroup} onChange={e => updateMainland("activityGroup", e.target.value)}>
                                                        <option value="Standard">Standard</option>
                                                        <option value="General">General Trade</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {mainlandForm.premise === "Physical" && (
                                                <div className="bg-neutral-50 p-2 rounded border border-neutral-200">
                                                    <label className="flex justify-between text-xs text-neutral-500 mb-1">
                                                        <span>Annual Rent (Market Fee Calc)</span>
                                                        <span>{Number(mainlandForm.rentAmount).toLocaleString()}</span>
                                                    </label>
                                                    <input type="range" min="10000" max="500000" step="5000" className="w-full accent-emerald-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer" value={mainlandForm.rentAmount} onChange={e => updateMainland("rentAmount", e.target.value)} />
                                                </div>
                                            )}

                                            <div className="pt-2 flex gap-2">
                                                <div className="flex-1">
                                                    <label className="text-xs text-neutral-500 block mb-1">Ext. Approval (AED)</label>
                                                    <input type="number" className="w-full p-2 text-sm border border-neutral-200 rounded" placeholder="0" value={mainlandForm.externalApproval} onChange={e => updateMainland("externalApproval", e.target.value)} />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-emerald-600 font-bold block mb-1">BWMC Service Fee</label>
                                                    <input type="number" className="w-full p-2 text-sm border border-emerald-200 bg-emerald-50 rounded font-bold text-emerald-700" value={mainlandForm.bwmcServiceFee} onChange={e => updateMainland("bwmcServiceFee", e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Visas */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <Users className="w-5 h-5 text-emerald-600" /> Visa Allocation
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-neutral-500 mb-1 flex justify-between">
                                    <span>Number of Visas</span>
                                    <span className="text-emerald-600 font-bold">{visaCount}</span>
                                </label>
                                <input type="range" min="0" max="20" className="w-full accent-emerald-600" value={visaCount} onChange={e => setVisaCount(Number(e.target.value))} />
                                <p className="text-[10px] text-neutral-400 mt-2">*Includes Entry, Status Change, Medical, ID, Insurance</p>
                            </div>
                        </div>

                        {/* 4. Addons */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <CheckCircle className="w-5 h-5 text-emerald-600" /> Services & Add-ons
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

                        {/* 5. Discount */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <Calculator className="w-5 h-5 text-emerald-600" /> Adjustments
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-neutral-500 mb-1">Manager Discount (AED)</label>
                                <input type="number" className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
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
                                <div className="space-y-6">

                                    {/* Summary */}
                                    <div className="grid grid-cols-2 gap-4 mb-8 print:mb-4">
                                        <div className="p-4 bg-neutral-50 rounded-lg print:border print:bg-white">
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Jurisdiction</div>
                                            <div className="font-semibold text-lg">{EMIRATES.find(j => j.id === jurisdiction)?.name}</div>
                                        </div>
                                        <div className="p-4 bg-neutral-50 rounded-lg print:border print:bg-white">
                                            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Configuration</div>
                                            <div className="font-semibold text-lg">{mainlandForm.legalType} <span className="text-neutral-400 font-normal">({visaCount} Visas)</span></div>
                                        </div>
                                    </div>

                                    {/* Line Items */}
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-neutral-200">
                                                <th className="py-3 font-medium text-neutral-500 text-sm">Description</th>
                                                <th className="py-3 font-medium text-neutral-500 text-sm text-right">Amount (AED)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            <tr>
                                                <td className="py-4 font-medium text-neutral-800">
                                                    Primary License Setup & DED/Economic Fees
                                                    <div className="text-xs text-neutral-400 font-normal mt-0.5">Includes setup, approvals, trade name, and initial year registration</div>
                                                </td>
                                                <td className="py-4 text-right font-medium">{totals.basePrice.toLocaleString()}</td>
                                            </tr>
                                            {visaCount > 0 && (
                                                <tr>
                                                    <td className="py-4 font-medium text-neutral-800">
                                                        Visa Alignment & Processing ({visaCount}x)
                                                        <div className="text-xs text-neutral-400 font-normal mt-0.5">Includes Establishment Card and ICP Setup</div>
                                                    </td>
                                                    <td className="py-4 text-right font-medium">{totals.visaPrice.toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {selectedAddons.map(id => {
                                                const item = ADDONS.find(a => a.id === id);
                                                if (!item) return null;
                                                return (
                                                    <tr key={id}>
                                                        <td className="py-4 font-medium text-neutral-800">{item.name}</td>
                                                        <td className="py-4 text-right font-medium">{item.price.toLocaleString()}</td>
                                                    </tr>
                                                )
                                            })}
                                            {discount > 0 && (
                                                <tr className="text-emerald-600">
                                                    <td className="py-4 font-medium">Strategic Partnership Discount</td>
                                                    <td className="py-4 text-right font-medium">-{discount.toLocaleString()}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="border-t-2 border-neutral-900">
                                            <tr>
                                                <td className="py-6 text-xl font-bold">Total Investment</td>
                                                <td className="py-6 text-right text-3xl font-bold text-emerald-600">AED {totals.total.toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div className="mt-8 pt-8 border-t border-neutral-100 text-neutral-500 text-sm leading-relaxed print:mt-4">
                                        <p><strong>Terms:</strong> This quotation is valid for 7 days. Prices are subject to final government invoices. Third-party fees (Medical/ID) are estimates.</p>
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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Total Revenue</div>
                                    <div className="text-2xl font-mono text-white">{totals.total.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Total Gov. Cost</div>
                                    <div className="text-2xl font-mono text-red-400">{totals.cost.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Net Profit</div>
                                    <div className={`text-2xl font-mono font-bold ${totals.profit > 0 ? "text-emerald-400" : "text-red-500"}`}>
                                        {totals.profit.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Margin</div>
                                    <div className={`text-2xl font-mono ${totals.margin > 20 ? "text-emerald-400" : "text-yellow-500"}`}>
                                        {totals.margin.toFixed(1)}%
                                    </div>
                                </div>
                            </div>

                            {jurisdiction !== "freezone" && (
                                <div className="grid grid-cols-4 gap-2 text-[10px] text-neutral-500 opacity-60 font-mono border-t border-neutral-700 pt-3">
                                    <div>Lic(DED): {totals.breakdown.Lic}</div>
                                    <div>MrktFee: {totals.breakdown.Mkt}</div>
                                    <div>Fed(MoE): {totals.breakdown.Fed}</div>
                                    <div className="text-emerald-500">Service: {mainlandForm.bwmcServiceFee}</div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
