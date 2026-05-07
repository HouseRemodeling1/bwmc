import { CheckCircle2, ChevronRight, FileCheck, ShieldCheck, BarChart3, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import ServiceSEO from "../ServiceSEO";
import Breadcrumbs from "../Breadcrumbs";
import RelatedContent from "../RelatedContent";
import ContactForm from "../contact/ContactForm";
import { serviceContent } from "@/lib/serviceContent";
import { motion } from "framer-motion";

interface LayoutProps {
    content: any;
    slug: string;
}

export default function AccountingLayout({ content, slug }: LayoutProps) {
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
        <main className="min-h-screen bg-slate-50">
            {/* Inject SEO Schemas */}
            <ServiceSEO content={content} slug={slug} />

            {/* Hero Section */}
            <section className="bg-navy pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right scale-150 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: "Services", href: "/services" },
                                { label: content.title, href: `/services/${slug}` }
                            ]}
                            variant="light"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-8">
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

                            {/* Trust Badges */}
                            {content.trustBadges && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                    {content.trustBadges.map((badge: any, i: number) => (
                                        <div key={i} className="flex flex-col p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                                            <span className="text-white font-bold text-xs">{badge.label}</span>
                                            <span className="text-white/60 text-[10px]">{badge.sub}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/contact" className="bg-white text-navy px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                                    Book a Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="tel:+971561625698" className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                                    Talk to an Expert
                                </Link>
                            </div>
                            
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-navy bg-slate-300 overflow-hidden">
                                            <div className="w-full h-full bg-royal-blue/20" />
                                        </div>
                                    ))}
                                </div>
                                <span>Trusted by 500+ UAE Businesses</span>
                            </div>
                        </div>
                        {/* Floating Card */}
                        <div className="hidden lg:block w-full md:w-1/3 bg-white rounded-lg p-8 shadow-xl">
                            <h3 className="text-navy font-bold text-xl mb-4">Fast Track Inquiry</h3>
                            <p className="text-gray-600 mb-6 text-sm">Get an expert audit consultation within 24 hours.</p>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Market Context Section */}
            {content.marketContext && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-navy leading-tight">
                                    {content.marketContext.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {content.marketContext.description}
                                </p>
                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    {content.marketContext.stats.map((stat: any, i: number) => (
                                        <div key={i} className="space-y-1">
                                            <div className="text-3xl font-bold text-royal-blue">{stat.value}</div>
                                            <div className="text-sm font-bold text-navy">{stat.label}</div>
                                            <div className="text-xs text-gray-500">{stat.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-royal-blue/5 rounded-full -mr-16 -mt-16" />
                                <h4 className="font-bold text-navy mb-4 relative z-10">Strategic Importance</h4>
                                <ul className="space-y-4 relative z-10">
                                    {[
                                        "Avoid Corporate Tax non-compliance penalties",
                                        "Maintain eligibility for Free Zone license renewals",
                                        "Secure bank credit lines and private investment",
                                        "Ensure AML/CFT regulatory standing"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Structured Content */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Detailed Service Items */}
                    {content.detailedItems && (
                        <div className="space-y-12 py-12">
                            <h2 className="text-3xl font-bold text-navy">Deep Dive: Audit Expertise</h2>
                            <div className="grid gap-8">
                                {content.detailedItems.map((article: any, i: number) => (
                                    <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-navy mb-4">{article.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {article.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {article.features.map((feat: string, j: number) => (
                                                <span key={j} className="text-xs font-semibold bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                                                    {feat}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="p-4 bg-royal-blue/5 rounded-lg border-l-4 border-royal-blue">
                                            <p className="text-sm italic text-navy/80">{article.context}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Industry Expertise */}
                    {content.industryExpertise && (
                        <div className="py-12">
                            <h2 className="text-3xl font-bold text-navy mb-8">Specialized Industry Vertical Audits</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {content.industryExpertise.map((industry: any, i: number) => (
                                    <div key={i} className="p-6 bg-navy text-white rounded-xl">
                                        <h4 className="font-bold mb-2 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-sky-blue" />
                                            {industry.title}
                                        </h4>
                                        <p className="text-sm text-white/70">{industry.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-6 text-sm text-gray-500 italic">
                                *We also provide auditing for General Trading, Manufacturing, and Hospitality sectors.
                            </p>
                        </div>
                    )}

                    {/* Scope Grid */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-6">Comprehensive Coverage</h2>
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
                        <h2 className="text-2xl font-bold text-navy mb-6">Our 5-Step Audit Methodology</h2>
                        <div className="space-y-4">
                            {content.methodology.map((step: any, i: number) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-royal-blue text-white flex items-center justify-center font-bold shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy text-lg">{step.phase}</h4>
                                        <p className="text-gray-600 mt-1">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Why Choose Us */}
                    {content.whyChooseUs && (
                        <div className="py-12">
                            <h2 className="text-3xl font-bold text-navy mb-8">Why BWMC for Your Audits?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {content.whyChooseUs.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-royal-blue/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-royal-blue" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-navy mb-4 text-lg">Common Questions</h3>
                        <div className="space-y-4">
                            {content.faq.map((item: any, i: number) => (
                                <details key={i} className="group cursor-pointer">
                                    <summary className="flex items-start justify-between font-medium text-gray-700 text-sm hover:text-royal-blue list-none">
                                        <span>{item.q}</span>
                                        <ChevronRight className="w-4 h-4 mt-0.5 transition-transform group-open:rotate-90 shrink-0" />
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

            {/* Testimonials */}
            <section className="bg-slate-50 py-20 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-navy mb-4">Trusted by Hundreds of Businesses</h2>
                        <p className="text-gray-600">See what our clients say about our professional expertise.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Fawad Ali",
                                role: "Business Owner",
                                content: " Bridgewater's level of professionalism and attention to detail in Audit and Taxation has exceeded my expectations. Led by Mahesh, the team is instrumental for our success."
                            },
                            {
                                name: "Adnan Shehzad",
                                role: "Managing Director",
                                content: "They handled our company licensing and visa processing efficiently even when chances were low. Truly outstanding support from the BWMC team."
                            },
                            {
                                name: "Mansoor Shah",
                                role: "CEO",
                                content: "Deep expertise in UAE regulations. The registration and compliance process moved smoothly and we felt in safe hands throughout."
                            }
                        ].map((testi, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex gap-1 mb-4 text-yellow-400">
                                    {[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-gray-600 text-sm italic mb-6">"{testi.content}"</p>
                                <div className="font-bold text-navy">{testi.name}</div>
                                <div className="text-xs text-slate-400">{testi.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile/Bottom Form */}
            <section className="lg:hidden py-12 bg-white">
                <div className="px-6">
                    <ContactForm />
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <RelatedContent
                    title="You May Also Be Interested In"
                    items={relatedServices}
                    className="bg-white border-t border-gray-200"
                />
            )}
        </main>
    )
}

