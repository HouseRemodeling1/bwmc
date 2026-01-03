import { vatGuideData } from "@/lib/vatGuideData";
import { ArrowLeft, Calendar, User, Clock, Share2, Printer, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const guide = vatGuideData.find(g => g.slug === slug);

    if (!guide) {
        return {
            title: "Guide Not Found",
        };
    }

    return {
        title: `${guide.title} | VAT Knowledge Base`,
        description: guide.description,
    };
}

export default async function GuidePage({ params }: PageProps) {
    const { slug } = await params;
    const guide = vatGuideData.find(g => g.slug === slug);

    if (!guide) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Header / Breadcrumb Section */}
            <section className="bg-navy pt-32 pb-16 px-6 lg:px-8 shadow-sm">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link href="/vat-guide" className="hover:text-sky-blue transition-colors">VAT Knowledge Base</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white truncate">{guide.title}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {guide.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>BWMC Tax Team</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Updated Jan 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 lg:px-8 -mt-8 mb-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12">
                        {/* Article Content */}
                        <article className="prose prose-lg prose-slate max-w-none 
                            prose-headings:text-navy prose-headings:font-bold 
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:text-royal-blue
                            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-gray-600
                            prose-li:mb-2
                            prose-strong:text-navy prose-strong:font-semibold
                            prose-a:text-sky-blue prose-a:no-underline hover:prose-a:underline
                        ">
                            {guide.content ? (
                                <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4 text-royal-blue">
                                        <Printer className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy mb-2">Content Coming Soon</h3>
                                    <p className="text-gray-500">
                                        Our tax experts are currently finalizing this guide. Please check back later or contact us for immediate assistance.
                                    </p>
                                    <Link href="/contact" className="inline-block mt-6 bg-royal-blue text-white px-6 py-2 rounded-full font-medium hover:bg-navy transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            )}
                        </article>

                        {/* Article Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link href="/vat-guide" className="flex items-center gap-2 text-navy font-semibold hover:text-royal-blue transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Guides
                            </Link>

                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-royal-blue transition-colors bg-gray-50 rounded-full hover:bg-neutral">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-royal-blue transition-colors bg-gray-50 rounded-full hover:bg-neutral">
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
