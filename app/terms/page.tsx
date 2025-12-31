import { ArrowRight, ChevronRight, FileText, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
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
                        <span className="text-sky-blue">Terms and Conditions</span>
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Scale className="w-12 h-12 text-sky-blue" />
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Terms and Conditions
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-neutral/90 leading-relaxed">
                            Please read these terms and conditions carefully before using our services or website.
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
                            These Terms and Conditions ("Terms") govern your use of the Bridge Water Management Consultancies ("BWMC", "we", "us", or "our") website and services. By accessing or using our website and services, you agree to be bound by these Terms.
                        </p>
                    </div>

                    {/* Acceptance of Terms */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-royal-blue" />
                            <h2 className="text-3xl font-bold text-navy">Acceptance of Terms</h2>
                        </div>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                By accessing and using this website, you accept and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our website or services.
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-sky-blue" />
                            <h2 className="text-3xl font-bold text-navy">Services</h2>
                        </div>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                BWMC provides professional financial, accounting, auditing, tax, and business consultancy services in the United Arab Emirates. Our services include but are not limited to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Accounting and Bookkeeping</li>
                                <li>Auditing and Assurance</li>
                                <li>VAT Consultancy and Compliance</li>
                                <li>Corporate Tax Advisory</li>
                                <li>Business Setup and Registration</li>
                                <li>Trade Finance and Trademark Registration</li>
                                <li>Compliance and Regulatory Advisory</li>
                            </ul>
                            <p className="mt-4">
                                Specific terms for each service will be outlined in separate engagement letters or service agreements.
                            </p>
                        </div>
                    </div>

                    {/* Professional Relationship */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Professional Relationship</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                The provision of our services creates a professional relationship between BWMC and the client. This relationship is governed by:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>These Terms and Conditions</li>
                                <li>Individual engagement letters or service agreements</li>
                                <li>Applicable professional standards and regulations in the UAE</li>
                                <li>Relevant laws and regulations of the United Arab Emirates</li>
                            </ul>
                        </div>
                    </div>

                    {/* Client Responsibilities */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Client Responsibilities</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">Clients agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate, complete, and timely information required for our services</li>
                                <li>Cooperate fully with BWMC and respond promptly to requests</li>
                                <li>Maintain proper records and documentation as required by law</li>
                                <li>Pay fees and charges as agreed in the engagement letter</li>
                                <li>Inform us immediately of any changes that may affect our services</li>
                                <li>Comply with all applicable laws and regulations</li>
                            </ul>
                        </div>
                    </div>

                    {/* Fees and Payment */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Fees and Payment</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                Fees for our services will be specified in individual engagement letters. Unless otherwise agreed:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Fees are exclusive of VAT and other applicable taxes</li>
                                <li>Payment terms are typically 30 days from invoice date</li>
                                <li>Late payments may incur interest charges</li>
                                <li>We reserve the right to suspend services for non-payment</li>
                                <li>Additional services not covered in the engagement letter will be charged separately</li>
                            </ul>
                        </div>
                    </div>

                    {/* Confidentiality */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Confidentiality</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We maintain strict confidentiality of all client information in accordance with professional standards and applicable laws. However, we may disclose information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>With your explicit consent</li>
                                <li>When required by law or regulatory authorities</li>
                                <li>To professional advisors bound by confidentiality obligations</li>
                                <li>In response to legal proceedings or court orders</li>
                            </ul>
                        </div>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-royal-blue" />
                            <h2 className="text-3xl font-bold text-navy">Limitation of Liability</h2>
                        </div>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                To the fullest extent permitted by law:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Our liability is limited to the fees paid for the specific service giving rise to the claim</li>
                                <li>We are not liable for indirect, consequential, or punitive damages</li>
                                <li>We are not responsible for losses arising from client's failure to provide accurate information</li>
                                <li>Claims must be brought within 12 months of the service completion</li>
                            </ul>
                            <p className="mt-4">
                                Specific liability terms may be outlined in individual engagement letters.
                            </p>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Intellectual Property</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                All content on this website, including text, graphics, logos, and software, is the property of BWMC and protected by intellectual property laws. You may not:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Reproduce, distribute, or modify our content without permission</li>
                                <li>Use our trademarks or branding without authorization</li>
                                <li>Extract data through automated means (scraping)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Website Use */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Website Use</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">You agree not to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Use the website for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Transmit viruses or malicious code</li>
                                <li>Interfere with the proper functioning of the website</li>
                                <li>Impersonate any person or entity</li>
                            </ul>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Disclaimer</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                Information on this website is for general guidance only and does not constitute professional advice. We make no warranties about the accuracy, completeness, or timeliness of the information. You should not act on this information without seeking professional advice specific to your circumstances.
                            </p>
                        </div>
                    </div>

                    {/* Termination */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Termination</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                Either party may terminate the professional relationship by providing written notice as specified in the engagement letter. Upon termination:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>All outstanding fees become immediately due</li>
                                <li>We will return client documents as requested</li>
                                <li>Confidentiality obligations continue</li>
                                <li>We may retain copies of documents as required by law</li>
                            </ul>
                        </div>
                    </div>

                    {/* Governing Law */}
                    <div className="border-l-4 border-sky-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Governing Law</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                These Terms are governed by the laws of the United Arab Emirates. Any disputes will be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                            </p>
                        </div>
                    </div>

                    {/* Changes to Terms */}
                    <div className="border-l-4 border-royal-blue pl-8">
                        <h2 className="text-3xl font-bold text-navy mb-4">Changes to These Terms</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of our services constitutes acceptance of the modified Terms.
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-neutral p-8 rounded-[4px] border-l-4 border-royal-blue">
                        <h2 className="text-3xl font-bold text-navy mb-4">Contact Us</h2>
                        <div className="space-y-4 text-navy/70">
                            <p className="leading-relaxed">
                                If you have any questions about these Terms and Conditions, please contact us:
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
                            Ready to Get Started?
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
