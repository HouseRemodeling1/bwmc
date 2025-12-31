import { getServiceContent } from "@/lib/serviceContent";
import { ArrowRight, CheckCircle2, ChevronRight, FileCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const content = getServiceContent(slug);

    if (!content) {
        notFound();
    }

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
                        <span className="text-white">Services</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-sky-blue capitalize">{slug.replace(/-/g, ' ')}</span>
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {content.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral/90 leading-relaxed mb-8">
                            {content.subtitle}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-royal-blue hover:bg-sky-blue text-white px-8 py-4 rounded-[4px] font-semibold transition-all shadow-lg hover:translate-y-[-2px]"
                        >
                            Book a Consultation
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
                    {/* Left Column (Content) */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Description & Context */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-navy">Overview</h2>
                            <div className="prose prose-lg text-navy/70">
                                <p className="text-lg leading-relaxed">{content.description}</p>
                                <div className="bg-neutral p-6 rounded-[4px] border-l-4 border-royal-blue mt-8">
                                    <h4 className="flex items-center gap-2 font-bold text-navy mb-2">
                                        <FileCheck className="w-5 h-5 text-royal-blue" />
                                        Regulatory Context
                                    </h4>
                                    <p className="text-base m-0">{content.context}</p>
                                </div>
                            </div>
                        </div>

                        {/* Scope of Service */}
                        <div>
                            <h2 className="text-3xl font-bold text-navy mb-8">Scope of Service</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {content.scope.map((item: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-[4px] hover:bg-neutral transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                                        <span className="text-navy/80 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Methodology */}
                        <div>
                            <h2 className="text-3xl font-bold text-navy mb-8">Our Methodology</h2>
                            <div className="relative border-l-2 border-dashed border-gray-200 ml-4 space-y-12">
                                {content.methodology.map((step: any, index: number) => (
                                    <div key={index} className="relative pl-12">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-royal-blue border-4 border-white shadow-sm" />
                                        <h3 className="text-xl font-bold text-navy mb-2">{step.phase}</h3>
                                        <p className="text-navy/60">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="border-t pt-16">
                            <h2 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {content.faq.map((item: any, index: number) => (
                                    <div key={index} className="bg-white border rounded-[4px] p-6 shadow-sm">
                                        <h3 className="font-semibold text-lg text-navy mb-3">{item.q}</h3>
                                        <p className="text-navy/70 pb-2">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            {/* Contact Card */}
                            <div className="bg-navy p-8 rounded-[4px] text-white">
                                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                                <p className="text-white/70 mb-8">
                                    Schedule a free 15-minute consultation with our experts to discuss your specific needs.
                                </p>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center bg-sky-blue hover:bg-royal-blue text-white py-4 rounded-[4px] font-semibold transition-colors mb-4"
                                >
                                    Book Consultation
                                </Link>
                                <div className="text-center text-sm text-white/50">
                                    Or call us at <span className="text-white">+971 45488184</span>
                                </div>
                            </div>

                            {/* Other Services */}
                            <div className="bg-neutral/50 p-8 rounded-[4px] border border-gray-100">
                                <h3 className="font-bold text-navy mb-4">Related Services</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-navy/70 hover:text-royal-blue cursor-pointer transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                        <Link href="/services/corporate-tax">Corporate Tax Advisory</Link>
                                    </li>
                                    <li className="flex items-center gap-2 text-navy/70 hover:text-royal-blue cursor-pointer transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                        <Link href="/services/vat-consultancy">VAT Consultancy</Link>
                                    </li>
                                    <li className="flex items-center gap-2 text-navy/70 hover:text-royal-blue cursor-pointer transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                        <Link href="/services/auditing-assurance">External Audit</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
