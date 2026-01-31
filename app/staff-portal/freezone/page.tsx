"use client";

import React, { useState, useEffect } from "react";
import { Lock, Calculator, Copy, Printer, CheckCircle, Smartphone, Building2, User, Users, Briefcase, MapPin, Layers, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { getPrice, FREEZONES, OFFICE_TYPES, LICENSE_TYPES, FREEZONE_LICENSE_MAP } from "@/lib/calculatorPricing";
import Link from "next/link";

// --- Configuration ---
const PASSWORD = process.env.NEXT_PUBLIC_STAFF_PASSWORD || "BWMC2026";

const ADDONS = [
    { id: "medical", name: "VIP Medical & Emirates ID", price: 2500, cost: 800 },
    { id: "tax", name: "Corporate Tax Registration", price: 1500, cost: 0 },
    { id: "bank", name: "Bank Account Opening Assistance", price: 3000, cost: 0 },
];

export default function FreezonePortal() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");

    // --- Form State ---
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [visaCount, setVisaCount] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [discount, setDiscount] = useState(0);

    // --- Freezone Form ---
    const [freezoneForm, setFreezoneForm] = useState({
        zone: FREEZONES.SHAMS,
        officeType: "Virtual Office",
        licenseType: "Standard License",
        contractYears: 1,
        profFee: 0,
    });

    // --- Calculations ---
    const [totals, setTotals] = useState({
        govtTotal: 0,
        stage6: 0, // Professional Fee
        grandTotal: 0,
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

    const updateFreezone = (field: string, value: any) => {
        setFreezoneForm(prev => {
            const newState = { ...prev, [field]: value };

            // Logic: If Zone changes, reset License Type to first valid option
            if (field === "zone") {
                const validLicenses = FREEZONE_LICENSE_MAP[value] || [LICENSE_TYPES.STANDARD];
                newState.licenseType = validLicenses[0];
            }
            return newState;
        });
    };

    // --- Logic ---
    useEffect(() => {
        // Freezone Calculation
        const price = getPrice(
            freezoneForm.zone,
            freezoneForm.officeType,
            freezoneForm.licenseType,
            visaCount,
            freezoneForm.contractYears
        );

        const zonePrice = price || 0;
        const profFee = Number(freezoneForm.profFee) || 0;

        let addonTotal = 0;
        selectedAddons.forEach((addonId) => {
            const addon = ADDONS.find((a) => a.id === addonId);
            if (addon) addonTotal += addon.price;
        });

        const grandTotal = zonePrice + profFee + addonTotal - discount;

        setTotals({
            govtTotal: zonePrice,
            stage6: profFee,
            grandTotal,
        });

    }, [visaCount, selectedAddons, discount, freezoneForm]);

    // --- Output Generators ---
    const generateWhatsApp = () => {
        let text = `Hi ${clientName || "there"}, great speaking with you.\n\n`;

        text += `Here is the Freezone Breakdown for *${businessName || "Your Business"}* (${freezoneForm.zone}):\n\n` +
            `🏢 Authority Package: AED ${totals.govtTotal.toLocaleString()}\n` +
            `   • ${freezoneForm.officeType}\n` +
            `   • ${freezoneForm.licenseType}\n` +
            `   • ${freezoneForm.contractYears} Year(s)\n` +
            `   • ${visaCount} Visa Allocation\n` +
            `\n` +
            `💼 Professional Fee: AED ${totals.stage6.toLocaleString()}\n`;

        text += `\n💰 *Grand Total:* AED ${totals.grandTotal.toLocaleString()}\n` +
            `\n` +
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
                    <div className="flex gap-4 items-center">
                        <Link href="/staff-portal" className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Mainland
                        </Link>
                        <div className="h-4 w-px bg-neutral-700 mx-2"></div>
                        <span className="text-sm text-emerald-400 font-bold">Freezone Calculator</span>
                        <div className="h-4 w-px bg-neutral-700 mx-2"></div>
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

                        {/* 2. Freezone Input Variables */}
                        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                            <h3 className="flex items-center gap-2 font-semibold text-neutral-700 mb-4">
                                <Globe className="w-5 h-5 text-emerald-600" /> Configuration
                            </h3>

                            <div className="space-y-4 animate-in fade-in">
                                {/* FREEZONE INPUTS */}
                                <div>
                                    <label className="text-xs text-neutral-500 block mb-1">Feezone Authority</label>
                                    <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={freezoneForm.zone} onChange={e => updateFreezone("zone", e.target.value)}>
                                        {Object.values(FREEZONES).map(z => (
                                            <option key={z} value={z}>{z}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-neutral-500 block mb-1">Office Type</label>
                                    <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={freezoneForm.officeType} onChange={e => updateFreezone("officeType", e.target.value)}>
                                        {Object.values(OFFICE_TYPES).map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-neutral-500 block mb-1">License Type</label>
                                    <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={freezoneForm.licenseType} onChange={e => updateFreezone("licenseType", e.target.value)}>
                                        {(FREEZONE_LICENSE_MAP[freezoneForm.zone] || [LICENSE_TYPES.STANDARD]).map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-neutral-500 block mb-1">Contract Duration (Years)</label>
                                    <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none" value={freezoneForm.contractYears} onChange={e => updateFreezone("contractYears", Number(e.target.value))}>
                                        {[1, 2, 3, 5, 10].map(y => (
                                            <option key={y} value={y}>{y} Year{y > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-500 mb-1 flex justify-between">
                                        <span>Visa Allocation</span>
                                        <span className="text-emerald-600 font-bold">{visaCount}</span>
                                    </label>
                                    <input type="range" min="0" max="10" className="w-full accent-emerald-600" value={visaCount} onChange={e => setVisaCount(Number(e.target.value))} />
                                </div>

                                <div className="pt-2 border-t border-neutral-100">
                                    <label className="text-xs text-emerald-600 font-bold block mb-1">Professional Fee</label>
                                    <input type="number" className="w-full p-2 text-sm border border-emerald-200 bg-emerald-50 rounded font-bold text-emerald-700" value={freezoneForm.profFee} onChange={e => updateFreezone("profFee", e.target.value)} />
                                </div>
                            </div>
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
                                        <div className="font-semibold text-lg">{freezoneForm.zone} Freezone Setup</div>
                                        <div className="text-sm text-neutral-500">{freezoneForm.officeType} • {freezoneForm.licenseType} • {visaCount} Visas</div>
                                    </div>

                                    {/* DYNAMIC STAGES */}
                                    <div className="space-y-4">

                                        {/* FREEZONE VIEW */}
                                        <div className="bg-neutral-50 p-4 rounded-lg flex justify-between items-center print:bg-white print:border print:border-neutral-100 print:py-2">
                                            <div>
                                                <div className="font-bold text-neutral-800">Authority Package</div>
                                                <div className="text-xs text-neutral-500">License, Lease, Establishment Card & Visa Allocations</div>
                                            </div>
                                            <div className="font-mono font-medium">{totals.govtTotal.toLocaleString()}</div>
                                        </div>

                                        {/* Stage 6 / Prof Fee (Common) */}
                                        <div className="bg-emerald-50 p-4 rounded-lg flex justify-between items-center border border-emerald-100 print:bg-white print:border-none print:py-2">
                                            <div>
                                                <div className="font-bold text-emerald-800">Professional Services</div>
                                                <div className="text-xs text-emerald-600">Agency Fees, Consultation, Typing & PRO</div>
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
                                            *Note: Freezone prices are estimated based on authority packages and may vary.
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
                                    <div className="text-xs text-neutral-500 mb-1">Govt Stack</div>
                                    <div className="text-2xl font-mono text-red-400">{totals.govtTotal.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500 mb-1">Agency Fee</div>
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
