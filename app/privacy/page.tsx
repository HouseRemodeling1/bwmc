import { ArrowRight, ChevronRight, Shield, Lock, Eye, FileText } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | BWMC",
    description:
        "Learn how Bridge Water Management Consultancies collects, uses, and protects your personal information.",
    alternates: {
        canonical: "https://www.bwmc.ae/privacy",
    },
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-navy relative overflow-hidden py-24 px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-royal-blue/20 to-sky-blue/10" />
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-sky-blue">Privacy Policy</span>
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Shield className="w-12 h-12 text-sky-blue" />
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-neutral/90 leading-relaxed">
                            Your privacy is important to us. This policy outlines how Bridge Water Management Consultancies collects, uses, and protects your personal information.
                        </p>
                        <p className="text-sm text-white/60 mt-4">Last Updated: December 31, 2025</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-navy/70 leading-relaxed">
                            Bridge Water Management Consultancies ("BWMC", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-royal-blue" />
                            <h2 className="text-3xl font-bold text-navy">Information We Collect</h2>
                        </div>
                        <div className="space-y-6 text-navy/70">
                            <div>
                                <h3 className="text-xl font-semibold text-navy mb-3">Personal Information</h3>
                                <p className="leading-relaxed">
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                                    <li>Request a consultation or contact us</li>
                                    <li>Subscribe to our newsletter or updates</li>
                                    <li>Fill out forms on our website</li>
                                    <li>Engage our professional services</li>
                                </ul>
                                <p className="mt-3">
                                    This information may include: name, email address, phone number, company name, job title, and any other information you choose to provide.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-navy mb-3">Automatically Collected Information</h3>
                                <p className="leading-relaxed">
                                    When you visit our website, we may automatically collect certain information about your device, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                                    <li>IP address and browser type</li>
                                    <li>Operating system and device information</li>
                                    <li>Pages visited and time spent on pages</li>
                                    <li>Referring website addresses</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-sky-blue" />
                            <h2 className="text-3xl font-bold text-navy">How We Use Your Information</h2>
                        </div>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide, operate, and maintain our services</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                                <li>Improve our website and services</li>
                                <li>Comply with legal obligations and regulatory requirements</li>
                                <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                            </ul>
                        </div>
                    </div>

                    {/* Information Sharing */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Information Sharing and Disclosure</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong className="text-navy">Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business</li>
                                <li><strong className="text-navy">Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                                <li><strong className="text-navy">Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                                <li><strong className="text-navy">With Your Consent:</strong> When you have given us explicit permission to share your information</li>
                            </ul>
                        </div>
                    </div>

                    {/* Data Security */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-sky-blue" />
                            <h2 className="text-3xl font-bold text-navy">Data Security</h2>
                        </div>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Your Rights</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access and receive a copy of your personal information</li>
                                <li>Request correction of inaccurate or incomplete information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Object to or restrict the processing of your information</li>
                                <li>Withdraw consent at any time (where processing is based on consent)</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                            <p className="mt-4">
                                To exercise these rights, please contact us at <a href="mailto:sales@bwmc.com" className="text-royal-blue hover:text-sky-blue">sales@bwmc.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Cookies and Tracking Technologies</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                            </p>
                        </div>
                    </div>

                    {/* Third-Party Links */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Third-Party Links</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
                            </p>
                        </div>
                    </div>

                    {/* Children's Privacy */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Children's Privacy</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                            </p>
                        </div>
                    </div>

                    {/* Changes to Policy */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Changes to This Privacy Policy</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-neutral p-8 rounded-[4px] border-l-4 border-royal-blue">
                        <h2 className="text-3xl font-bold text-navy mb-4">Contact Us</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="space-y-2">
                                <p><strong className="text-navy">Bridge Water Management Consultancies</strong></p>
                                <p>Emarat Atrium - 1st Floor – Unit 147<br />
                                    Sheikh Zayed Rd, Dubai<br />
                                    United Arab Emirates</p>
                                <p>Email: <a href="mailto:sales@bwmc.com" className="text-royal-blue hover:text-sky-blue">sales@bwmc.com</a></p>
                                <p>Phone: <a href="tel:+97145488184" className="text-royal-blue hover:text-sky-blue">+971 45488184</a></p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-royal-blue hover:bg-sky-blue text-white px-8 py-4 rounded-[4px] font-semibold transition-all shadow-lg hover:translate-y-[-2px]"
                        >
                            Have Questions? Contact Us
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
