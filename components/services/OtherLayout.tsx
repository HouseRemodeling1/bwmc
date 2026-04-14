import { ArrowRight, Check, Diamond, Zap, HelpCircle } from "lucide-react";
import Link from "next/link";
import ServiceSEO from "../ServiceSEO";
import Breadcrumbs from "../Breadcrumbs";
import RelatedContent from "../RelatedContent";
import { serviceContent } from "@/lib/serviceContent";

interface LayoutProps {
    content: any;
    slug: string;
}

export default function OtherLayout({ content, slug }: LayoutProps) {
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
        <main className="min-h-screen bg-white">
            {/* Inject SEO Schemas */}
            <ServiceSEO content={content} slug={slug} />

            {/* Vibrant Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-royal-blue via-navy to-purple-900 py-32 px-6">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl rounded-full" />

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <Breadcrumbs
                            items={[
                                { label: "Services", href: "/services" },
                                { label: content.title, href: `/services/${slug}` }
                            ]}
                            variant="light"
                        />
                    </div>
                    <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block backdrop-blur-sm border border-white/10 uppercase tracking-widest">
                        Enterprise Solutions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                        {content.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-4 bg-sky-blue hover:bg-royal-blue text-white rounded-full font-bold transition-all shadow-lg shadow-sky-blue/25 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Book a Consultation
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://wa.me/971543097850"
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold backdrop-blur-sm transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Speak to an Expert
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl text-navy/80 font-light leading-9">
                        {content.description}
                    </p>
                    <div className="mt-12 p-8 bg-sky-50 rounded-2xl border border-sky-100">
                        <h3 className="font-bold text-royal-blue mb-2 uppercase text-sm tracking-wider">Why this matters</h3>
                        <p className="text-navy/70 text-lg">{content.context}</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-50 py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-navy">Service Features</h2>
                        <p className="text-gray-500 mt-4">Everything included in this package</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.scope.map((item: string, i: number) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-100">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-royal-blue group-hover:text-white transition-colors duration-300">
                                    <Diamond className="w-6 h-6 text-royal-blue group-hover:text-white" />
                                </div>
                                <h3 className="font-semibold text-navy leading-snug">{item}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Horizontal Scroll */}
            <section className="py-24 px-6 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy mb-16 text-center">How We Deliver Results</h2>
                    <div className="grid lg:grid-cols-4 gap-8">
                        {content.methodology.slice(0, 4).map((step: any, i: number) => (
                            <div key={i} className="relative p-6 pt-8 border-t-2 border-gray-100 hover:border-royal-blue transition-colors">
                                <div className="text-6xl font-black text-gray-50 absolute -top-8 left-0 -z-10 select-none">
                                    0{i + 1}
                                </div>
                                <h3 className="font-bold text-xl text-navy mb-3">{step.phase}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="bg-navy py-24 px-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-royal-blue/10 skew-y-3 transform origin-bottom-left" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {content.faq.map((item: any, i: number) => (
                            <div key={i} className="border border-white/10 rounded-lg p-6 hover:bg-white/5 transition-colors bg-white/5 backdrop-blur-sm">
                                <h3 className="font-semibold text-lg mb-3 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-sky-blue shrink-0 mt-1" />
                                    {item.q}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-full font-bold hover:bg-sky-blue hover:text-white transition-all shadow-lg hover:shadow-sky-blue/30">
                            Get Started Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <RelatedContent
                    title="Explore Other Solutions"
                    items={relatedServices}
                    className="bg-white border-t border-gray-200"
                />
            )}
        </main>
    )
}
