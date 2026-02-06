"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Calculator, Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { menuItems, mainNav } from "@/lib/menuData";

export default function Header() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Pages that have a dark hero section and need a transparent/white-text header initially
    const isTransparentPage = pathname === "/" || pathname.startsWith("/services/") || pathname === "/vat-guide";

    // Use dark header style if scrolled OR if we are on a page without a dark hero
    const isDarkHeader = scrolled || !isTransparentPage;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isDarkHeader ? "bg-[#1A2B4C]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="flex items-center justify-between lg:justify-start">
                {/* Logo */}
                <Link href="/" className="relative z-50">
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

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6 ml-auto mr-6 whitespace-nowrap">
                    {mainNav.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div
                                className={`flex items-center gap-1 text-sm font-medium cursor-pointer py-2 transition-colors ${isDarkHeader ? "text-white hover:text-gold" : "text-white/90 hover:text-white"
                                    }`}
                            >
                                <Link href={item.href}>{item.name}</Link>
                                {item.hasDropdown && (
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                )}
                            </div>

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

                {/* Call to Action */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/calculator"
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-semibold transition-all ${isDarkHeader
                            ? "bg-white text-navy hover:bg-gold hover:text-navy"
                            : "bg-white text-navy hover:bg-neutral"
                            }`}
                    >
                        <span>Cost Calculator</span>
                        <Calculator className="w-4 h-4" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden relative z-50 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className={`w-8 h-8 text-white`} />
                    ) : (
                        <Menu className={`w-8 h-8 text-white`} />
                    )}
                </button>
            </div>
        </div>

            {/* Mobile Menu Overlay */ }
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
            >
                <div className="pt-24 px-6 pb-12 space-y-8">
                    {menuItems.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                <category.icon className="w-5 h-5 text-royal-blue" />
                                {category.title}
                            </h3>
                            <ul className="space-y-3 pl-7 border-l-2 border-neutral">
                                {category.items.map((item) => (
                                    <li key={item.slug}>
                                        <Link
                                            href={`/services/${item.slug}`}
                                            className="block text-navy/70 text-sm py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="pt-6 border-t border-neutral">
                        <Link
                            href="/calculator"
                            className="w-full flex items-center justify-center gap-2 bg-royal-blue text-white py-3 rounded-[4px] font-semibold"
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
