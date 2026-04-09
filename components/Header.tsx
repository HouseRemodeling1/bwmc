"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Calculator, Menu, X, ArrowRight, Phone, MessageCircle } from "lucide-react";

import { usePathname } from "next/navigation";
import { menuItems, mainNav } from "@/lib/menuData";

export default function Header() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

    // Close mobile menu whenever route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileExpandedItem(null);
    }, [pathname]);

    const toggleMobileExpanded = (name: string) => {
        setMobileExpandedItem(mobileExpandedItem === name ? null : name);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isDarkHeader ? "bg-[#1A2B4C]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className={`mx-auto px-6 lg:px-10 h-full flex items-center ${isGlobalSetup ? "justify-between" : "justify-between lg:justify-normal"} ${isGlobalSetup ? "max-w-7xl" : "max-w-[1440px]"}`}>
                {/* Logo Section */}
                <div className={`flex-shrink-0 flex justify-start z-50 ${!isGlobalSetup && "lg:flex-1"}`}>
                    <Link href="/">
                        <div className="relative w-[220px] h-[65px] bg-white rounded-lg shadow-sm px-3 py-1 flex items-center justify-center">
                            <Image
                                src="/images/bwmc-logo-new.png"
                                alt="BWMC Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation - Standard Pages Only */}
                {!isGlobalSetup && (
                    <nav className="hidden lg:flex items-center gap-8 whitespace-nowrap z-40">
                        {mainNav.map((item) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {item.hasDropdown ? (
                                    <div
                                        className={`flex items-center gap-1 text-base font-medium cursor-pointer py-2 transition-colors ${isDarkHeader ? "text-white hover:text-gold" : "text-white/90 hover:text-white"
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`block text-base font-medium py-2 transition-colors ${isDarkHeader ? "text-white hover:text-gold" : "text-white/90 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown Content */}
                                <AnimatePresence>
                                    {item.hasDropdown && hoveredItem === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full -left-4 w-64 bg-white rounded-[4px] shadow-xl border border-neutral/20 p-2 z-50"
                                        >
                                            <ul className="space-y-1">
                                                {menuItems.find(m => m.title === item.name)?.items.map((subItem) => (
                                                    <li key={subItem.slug}>
                                                        <Link
                                                            href={`/services/${subItem.slug}`}
                                                            className="block px-4 py-2 text-sm text-navy/70 hover:text-royal-blue hover:bg-neutral rounded-[2px] transition-colors"
                                                        >
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

                {/* Right/CTA Section */}
                <div className={`hidden lg:flex items-center gap-4 z-50 ${!isGlobalSetup && "lg:flex-1 justify-end"}`}>
                    {isGlobalSetup ? (
                        <>
                            <a
                                href="https://wa.me/971543097850"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-semibold bg-[#25D366] text-white hover:bg-[#128C7E] transition-all"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="tel:+971543097850"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-semibold bg-white text-navy hover:bg-neutral transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Call Us</span>
                            </a>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className={`text-sm font-bold transition-all ${isDarkHeader ? "text-white/80 hover:text-white" : "text-white/90 hover:text-white"}`}>
                                Sign In
                            </Link>
                            <Link
                                href="/calculator"
                                className={`flex items-center gap-2 px-6 py-3 rounded-[4px] text-base font-semibold transition-all ${isDarkHeader
                                    ? "bg-white text-navy hover:bg-gold hover:text-navy"
                                    : "bg-white text-navy hover:bg-neutral"
                                    }`}
                            >
                                <span>Cost Calculator</span>
                                <Calculator className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden relative z-50 text-white ml-auto"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className={`w-8 h-8 text-white`} />
                    ) : (
                        <Menu className={`w-8 h-8 text-white`} />
                    )}
                </button>
            </div>


            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
                    >
                        <div className="pt-24 px-6 pb-12 space-y-4">
                            {mainNav.map((item) => {
                                const isExpanded = mobileExpandedItem === item.name;
                                const dropdownData = item.hasDropdown ? menuItems.find(m => m.title === item.name) : null;

                                return (
                                    <div key={item.name} className="border-b border-neutral/50 pb-2">
                                        {item.hasDropdown ? (
                                            <button
                                                onClick={() => toggleMobileExpanded(item.name)}
                                                className="w-full flex items-center justify-between text-lg font-bold text-navy py-2"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {dropdownData?.icon && <dropdownData.icon className="w-5 h-5 text-royal-blue" />}
                                                    {item.name}
                                                </div>
                                                <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="block text-lg font-bold text-navy py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        )}

                                        {/* Mobile Dropdown Items */}
                                        <AnimatePresence>
                                            {item.hasDropdown && isExpanded && (
                                                <motion.ul
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-neutral/30 rounded-lg"
                                                >
                                                    <div className="py-2 px-4 space-y-2">
                                                        {dropdownData?.items.map((subItem) => (
                                                            <li key={subItem.slug}>
                                                                <Link
                                                                    href={`/services/${subItem.slug}`}
                                                                    className="block text-navy/70 text-sm py-2 hover:text-royal-blue"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </div>
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}

                            <div className="pt-6">
                                <Link
                                    href="/calculator"
                                    className="w-full flex items-center justify-center gap-2 bg-royal-blue text-white py-4 rounded-[4px] font-bold text-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Calculator className="w-5 h-5" />
                                    Cost Calculator
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
}
