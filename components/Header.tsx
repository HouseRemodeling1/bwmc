"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Calculator, Menu, X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { menuItems, mainNav } from "@/lib/menuData";

export default function Header() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isTransparentPage = pathname === "/" || pathname.startsWith("/services/") || pathname === "/vat-guide";
    const isAdminPage = pathname?.startsWith("/admin");
    const isGlobalSetup = pathname === "/global-setup" || pathname === "/uae-setup" || pathname === "/ecommerce-license";
    const isDarkHeader = scrolled || !isTransparentPage || isGlobalSetup;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileExpandedItem(null);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const toggleMobileExpanded = (name: string) => {
        setMobileExpandedItem(mobileExpandedItem === name ? null : name);
    };

    if (isAdminPage) return null;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${isDarkHeader ? "bg-[#1A2B4C]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
                <div className={`mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between ${isGlobalSetup ? "max-w-7xl" : "max-w-[1440px]"}`}>

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="relative w-[160px] sm:w-[200px] h-[52px] sm:h-[60px] bg-white rounded-lg shadow-sm px-2 py-1 flex items-center justify-center">
                                <Image src="/images/bwmc-logo-new.png" alt="BWMC Logo" fill className="object-contain" priority />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {!isGlobalSetup && (
                        <nav className="hidden lg:flex items-center gap-8 whitespace-nowrap flex-1 justify-center">
                            {mainNav.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {item.hasDropdown ? (
                                        <div className={`flex items-center gap-1 text-base font-medium cursor-pointer py-2 transition-colors ${isDarkHeader ? "text-white hover:text-yellow-400" : "text-white/90 hover:text-white"}`}>
                                            <span>{item.name}</span>
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </div>
                                    ) : (
                                        <Link href={item.href} className={`text-base font-medium transition-all ${isDarkHeader ? "text-white hover:text-yellow-400" : "text-white/90 hover:text-white"}`}>
                                            {item.name}
                                        </Link>
                                    )}

                                    <AnimatePresence>
                                        {item.hasDropdown && hoveredItem === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full -left-4 w-64 bg-white rounded-lg shadow-xl border border-slate-100 p-2 z-50"
                                            >
                                                <ul className="space-y-0.5">
                                                    {menuItems.find(m => m.title === item.name)?.items.map((subItem) => (
                                                        <li key={subItem.slug}>
                                                            <Link href={subItem.slug.startsWith('/') ? subItem.slug : `/services/${subItem.slug}`} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1" />
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    )}

                    {/* Desktop CTA */}
                    <div className={`hidden lg:flex items-center gap-4`}>
                        {isGlobalSetup ? (
                            <>
                                <a href="https://wa.me/971543097850" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-[#25D366] text-white hover:bg-[#128C7E] transition-all">
                                    <MessageCircle className="w-4 h-4" /><span>WhatsApp</span>
                                </a>
                                <a href="tel:+971543097850" className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-white text-[#1A2B4C] hover:bg-slate-100 transition-all">
                                    <Phone className="w-4 h-4" /><span>Call Us</span>
                                </a>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/calculator" className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold bg-white text-[#1A2B4C] hover:bg-yellow-400 transition-all">
                                    <Calculator className="w-4 h-4" /><span>Cost Calculator</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all z-[300] ${
                            mobileMenuOpen
                                ? "bg-white/10 text-white"
                                : isDarkHeader
                                ? "bg-white/10 text-white hover:bg-white/20"
                                : "bg-black/20 text-white hover:bg-black/30"
                        }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileMenuOpen ? (
                                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <X className="w-6 h-6" />
                                </motion.span>
                            ) : (
                                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Menu className="w-6 h-6" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </header>

            {/* Mobile Menu — rendered outside header to avoid z-index stacking issues */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            key="panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-[#0D1B35] z-[260] lg:hidden flex flex-col overflow-y-auto shadow-2xl"
                        >
                            {/* Menu Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="relative w-[130px] h-[44px] bg-white rounded-md px-2 py-1 flex items-center justify-center">
                                        <Image src="/images/bwmc-logo-new.png" alt="BWMC" fill className="object-contain" />
                                    </div>
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 px-4 py-6 space-y-1">
                                {mainNav.map((item, idx) => {
                                    const isExpanded = mobileExpandedItem === item.name;
                                    const dropdownData = item.hasDropdown ? menuItems.find(m => m.title === item.name) : null;

                                    return (
                                        <div key={item.name}>
                                            {item.hasDropdown ? (
                                                <button
                                                    onClick={() => toggleMobileExpanded(item.name)}
                                                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left group hover:bg-white/5 transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {dropdownData?.icon && (
                                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                                <dropdownData.icon className="w-4 h-4 text-blue-400" />
                                                            </div>
                                                        )}
                                                        <span className="text-white font-semibold text-[15px] tracking-tight">{item.name}</span>
                                                    </div>
                                                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-200 ${isExpanded ? "rotate-180 text-blue-400" : ""}`} />
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-all group"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors" />
                                                    </div>
                                                    <span className="text-white font-semibold text-[15px] tracking-tight">{item.name}</span>
                                                </Link>
                                            )}

                                            {/* Sub-menu accordion */}
                                            <AnimatePresence initial={false}>
                                                {item.hasDropdown && isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-11 pl-4 border-l border-white/10 py-2 space-y-1">
                                                            {dropdownData?.items.map((subItem) => (
                                                                <Link
                                                                    key={subItem.slug}
                                                                    href={subItem.slug.startsWith('/') ? subItem.slug : `/services/${subItem.slug}`}
                                                                    className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-all"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    <span className="w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </nav>

                            {/* Bottom CTA */}
                            <div className="px-4 pb-8 pt-4 border-t border-white/10 space-y-3">
                                <Link
                                    href="/calculator"
                                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[15px] rounded-xl transition-all shadow-lg shadow-blue-900/40"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Calculator className="w-5 h-5" />
                                    Cost Calculator
                                </Link>
                                <div className="flex items-center justify-center gap-1.5 text-white/30 text-xs">
                                    <span className="w-1 h-1 rounded-full bg-green-400" />
                                    Expert advisors available Mon–Fri, 9AM–6PM
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
