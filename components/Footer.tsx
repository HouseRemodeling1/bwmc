"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();
    const isLandingPage = pathname === "/global-setup" || pathname === "/uae-setup" || pathname === "/ecommerce-license";

    return (
        <footer className={`${isLandingPage ? "bg-[#001B44]" : "bg-[#111] pt-16"} text-white`}>
            {!isLandingPage && (
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                    <div className="grid md:grid-cols-4 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>

                            <div className="space-y-4 text-white text-sm">
                                <p className="leading-relaxed">
                                    Emarat Atrium - 1st Floor - Unit 147<br />
                                    Sheikh Zayed Rd, Dubai,<br />
                                    United Arab Emirates
                                </p>

                                <Link href="mailto:sales@bwmc.com" className="block hover:text-white transition-colors">
                                    sales@bwmc.com
                                </Link>

                                <Link href="https://www.google.com/maps/place/Bridgewater+Management+Consultancies+Co.+L.L.C/@25.1950293,55.2633005,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69046059c16b:0x597f744e8ec53f58!8m2!3d25.1950293!4d55.2633005!16s%2Fg%2F11vjn1q_k8?entry=ttu" target="_blank" className="border border-white/20 rounded-[4px] px-6 py-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all w-fit text-white">
                                    <MapPin className="w-4 h-4" />
                                    <span>Click For Directions</span>
                                </Link>

                                <div className="pt-2">
                                    <p className="text-white text-lg font-bold">Tel: +971 45488184</p>
                                    <p className="text-xs text-white mt-1">[Monday to Friday | 9:00 AM - 6:00 PM]</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-white">
                                <li><Link href="/about" className="hover:text-sky-blue transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-sky-blue transition-colors">Contact Us</Link></li>

                                <li><Link href="/privacy" className="hover:text-sky-blue transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-sky-blue transition-colors">Terms And Conditions</Link></li>
                            </ul>
                        </div>

                        {/* Our Services Column 1 */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
                            <ul className="space-y-3 text-sm text-white">
                                <li><Link href="/services/accounting-bookkeeping" className="hover:text-sky-blue transition-colors">Accounting & Bookkeeping</Link></li>
                                <li><Link href="/services/auditing-assurance" className="hover:text-sky-blue transition-colors">Auditing & Assurance</Link></li>
                                <li><Link href="/services/vat-accounting" className="hover:text-sky-blue transition-colors">VAT Consultancy</Link></li>
                                <li><Link href="/services/corporate-tax" className="hover:text-sky-blue transition-colors">Corporate Tax</Link></li>
                                <li><Link href="/blog" className="hover:text-sky-blue transition-colors">Blog</Link></li>
                                <li><Link href="/contact" className="hover:text-sky-blue transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Our Services Column 2 */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Business Growth</h3>
                            <ul className="space-y-3 text-sm text-white">
                                <li><Link href="/services/business-setup" className="hover:text-sky-blue transition-colors">Business Setup</Link></li>
                                <li><Link href="/services/trade-finance" className="hover:text-sky-blue transition-colors">Trade Finance</Link></li>
                                <li><Link href="/services/trademark-registration" className="hover:text-sky-blue transition-colors">Trademark Registration</Link></li>
                                <li><Link href="/services/compliance-advisory" className="hover:text-sky-blue transition-colors">Compliance Advisory</Link></li>
                                <li><Link href="/blog" className="hover:text-sky-blue transition-colors">Latest Insights</Link></li>
                                <li><Link href="/contact" className="hover:text-sky-blue transition-colors">Get Support</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Bar */}
            <div className={`bg-[#001B44] ${isLandingPage ? "border-t border-white/20" : "border-t border-white/5"}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Logo Area */}
                        <div className="relative w-[220px] h-[65px] bg-white rounded-lg shadow-sm px-3 py-1 flex items-center justify-center">
                            <Image
                                src="/images/bwmc-logo-new.png"
                                alt="BWMC Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Tagline */}
                        <div className="hidden md:block text-white font-medium">
                            Expert Financial Services In UAE
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 border border-white/20 rounded-[4px] px-6 py-2.5 hover:bg-white hover:text-[#001B44] transition-all font-medium"
                        >
                            Book A Meeting
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
