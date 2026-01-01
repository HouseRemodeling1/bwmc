"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#111] text-white pt-16">
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

                            <button className="border border-white/20 rounded-[4px] px-6 py-3 flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                                <MapPin className="w-4 h-4" />
                                <span>Click For Directions</span>
                            </button>

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

            {/* Bottom Bar */}
            <div className="bg-[#001B44] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Logo Area */}
                        <div className="relative w-[220px] h-[60px]">
                            <Image
                                src="https://bwmc.ae/wp-content/uploads/2025/03/BRIDGEWATER-WHITE-400x150.png"
                                alt="BWMC Logo"
                                fill
                                className="object-contain object-left"
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
