import { CheckCircle2, ChevronRight, FileCheck, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
    content: any;
    slug: string;
}

export default function AccountingLayout({ content, slug }: LayoutProps) {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-navy">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/services" className="hover:text-navy">Services</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-navy font-semibold capitalize">{slug.replace(/-/g, ' ')}</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-navy py-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right scale-150 pointer-events-none" />
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm border border-white/10">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Professional Grade</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg text-white/80 max-w-xl">
                            {content.subtitle}
                        </p>
                    </div>
                    {/* Floating Card */}
                    <div className="w-full md:w-1/3 bg-white rounded-lg p-8 shadow-xl">
                        <h3 className="text-navy font-bold text-xl mb-4">Request Proposal</h3>
                        <p className="text-gray-600 mb-6 text-sm">Get a customized quote for your business accounting needs.</p>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 width-full w-full bg-royal-blue hover:bg-sky-blue text-white text-center py-3 rounded-md font-semibold transition-colors"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Structured Content */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Overview */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-royal-blue" />
                            Service Overview
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {content.description}
                        </p>
                        <div className="bg-slate-50 p-4 rounded border-l-4 border-royal-blue">
                            <h4 className="font-semibold text-navy mb-1 flex items-center gap-2">
                                <FileCheck className="w-4 h-4 text-royal-blue" />
                                Regulatory Note
                            </h4>
                            <p className="text-sm text-gray-600">{content.context}</p>
                        </div>
                    </div>

                    {/* Scope Grid */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-6">What We Cover</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {content.scope.map((item: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Methodology Steps */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-6">Our Process</h2>
                        <div className="space-y-4">
                            {content.methodology.map((step: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue font-bold shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy">{step.phase}</h4>
                                        <p className="text-sm text-gray-600">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-navy mb-4">Common Questions</h3>
                        <div className="space-y-4">
                            {content.faq.map((item: any, i: number) => (
                                <details key={i} className="group cursor-pointer">
                                    <summary className="flex items-center justify-between font-medium text-gray-700 text-sm hover:text-royal-blue list-none">
                                        <span>{item.q}</span>
                                        <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                                    </summary>
                                    <div className="text-sm text-gray-500 mt-2 pl-2 border-l-2 border-gray-200">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
