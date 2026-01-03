import { AlertTriangle, ArrowRight, Calendar, CheckSquare, FileText, Scale } from "lucide-react";
import Link from "next/link";
import ServiceSEO from "../ServiceSEO";
import Breadcrumbs from "../Breadcrumbs";
import RelatedContent from "../RelatedContent";
import { serviceContent } from "@/lib/serviceContent";

interface LayoutProps {
    content: any;
    slug: string;
}

export default function TaxationLayout({ content, slug }: LayoutProps) {
    // Get other services in the same category for RelatedContent
    const relatedServices = Object.entries(serviceContent)
        .filter(([key, val]) => val.category === content.category && key !== slug)
        .slice(0, 3)
        .map(([key, val]) => ({
            title: val.title,
            href: `/services/${key}`,
            description: val.subtitle,
            category: "Service"
        }));

    return (
        <main className="min-h-screen bg-stone-50">
            {/* Inject SEO Schemas */}
            <ServiceSEO content={content} slug={slug} />

            {/* Minimal Header with Breadcrumbs */}
            <div className="bg-navy text-white py-20 px-6 relative">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <Breadcrumbs
                            items={[
                                { label: "Services", href: "/services" },
                                { label: content.title, href: `/services/${slug}` }
                            ]}
                            className="text-white/60"
                        />
                    </div>
                    <span className="uppercase tracking-widest text-sm text-sky-blue mb-4 block font-semibold">Tax & Compliance Services</span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">{content.title}</h1>
                    <p className="text-xl text-white/80 leading-relaxed font-light">{content.subtitle}</p>
                </div>
            </div>

            <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10 pb-20">
                <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-yellow-500">
                    {/* Important Context Alert */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12 flex gap-4 items-start">
                        <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0" />
                        <div>
                            <h4 className="font-bold text-orange-900 mb-1">Compliance Context</h4>
                            <p className="text-orange-900/80 text-sm leading-relaxed">{content.context}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Description */}
                        <div>
                            <h3 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
                                <Scale className="w-5 h-5 text-gray-400" />
                                Overview
                            </h3>
                            <p className="text-gray-600 leading-7 text-sm">{content.description}</p>
                        </div>

                        {/* Key deliverables */}
                        <div className="bg-stone-100 p-6 rounded-sm">
                            <h3 className="text-navy font-bold text-lg mb-4">Key Deliverables</h3>
                            <ul className="space-y-3">
                                {content.scope.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckSquare className="w-4 h-4 text-royal-blue shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Process Timeline */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-center font-bold text-navy text-xl mb-12">Compliance Workflow</h3>
                        <div className="grid gap-8 md:grid-cols-4 relative">
                            {/* Line connector for desktop */}
                            <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                            {content.methodology.slice(0, 4).map((step: any, i: number) => (
                                <div key={i} className="flex flex-col items-center text-center bg-white p-4 md:bg-transparent md:p-0">
                                    <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold mb-4 shadow-lg ring-4 ring-white">
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold text-navy text-sm mb-2">{step.phase}</h4>
                                    <p className="text-xs text-gray-500">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
                <h3 className="text-2xl font-bold text-navy mb-8 text-center">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {content.faq.map((item: any, i: number) => (
                        <details key={i} className="group bg-white rounded shadow-sm border border-gray-100 p-4 cursor-pointer">
                            <summary className="flex items-start justify-between font-semibold text-navy cursor-pointer list-none">
                                <span>{item.q}</span>
                                <ArrowRight className="w-4 h-4 mt-1 text-royal-blue transition-transform group-open:rotate-90" />
                            </summary>
                            <div className="mt-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA Strip */}
            <section className="bg-white py-16 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-navy mb-6">Need Expert Tax Advice?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3 bg-navy text-white font-semibold hover:bg-royal-blue transition-colors rounded">
                            Book Consultation
                        </Link>
                        <Link href="/services" className="px-8 py-3 bg-transparent border border-gray-300 text-gray-600 font-semibold hover:border-navy hover:text-navy transition-colors rounded">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <RelatedContent
                    title="Related Tax & Compliance Services"
                    items={relatedServices}
                    className="bg-stone-50 border-t border-gray-200"
                />
            )}
        </main>
    )
}
