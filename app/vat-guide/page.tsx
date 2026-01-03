import { vatGuideData } from "@/lib/vatGuideData";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "VAT Knowledge Base | Everything You Need to Know About VAT",
    description: "A comprehensive resource for understanding the Value Added Tax (VAT) in UAE. Guides, articles, and compliance tips."
};

export default function VatGuidePage() {
    return (
        <main className="min-h-screen bg-neutral/30">
            {/* Hero Section */}
            <section className="bg-navy relative overflow-hidden pt-36 pb-20 px-6 lg:px-8">
                {/* Abstract Background patterns */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-blue/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sky-blue text-sm font-medium mb-8 border border-white/5 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Knowledge Hub</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Everything You Need to <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-white">Know About VAT</span>
                    </h1>

                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
                        A comprehensive resource for understanding the Value Added Tax.
                        Navigate the complexities of UAE tax laws with our expert guides.
                    </p>

                    {/* Search Bar (Visual) */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-sky-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl">
                            <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search for a topic (e.g., 'Registration', 'Refunds')..."
                                className="w-full px-4 py-2 outline-none text-navy placeholder:text-gray-400 bg-transparent"
                            />
                            <button className="bg-royal-blue hover:bg-navy text-white px-6 py-2 rounded-full font-medium transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs (Simulated) */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                        <button className="py-4 border-b-2 border-royal-blue text-royal-blue font-semibold whitespace-nowrap">
                            All Topics
                        </button>
                        <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-navy hover:border-gray-300 font-medium transition-all whitespace-nowrap">
                            Compliance Guides
                        </button>
                        <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-navy hover:border-gray-300 font-medium transition-all whitespace-nowrap">
                            Video Tutorials
                        </button>
                        <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-navy hover:border-gray-300 font-medium transition-all whitespace-nowrap">
                            FAQs
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vatGuideData.map((item, index) => (
                            <Link
                                key={index}
                                href="#" // Placeholder link as specific sub-pages are not requested yet
                                className="group bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-sky-blue/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-neutral rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-royal-blue shadow-sm mb-6 group-hover:bg-royal-blue group-hover:text-white transition-colors duration-300">
                                        <item.icon className="w-7 h-7" strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-royal-blue transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center text-sky-blue font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 bg-gradient-to-r from-navy to-royal-blue rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4">Still have questions about VAT?</h2>
                            <p className="text-white/80 max-w-2xl mb-8">
                                Our team of certified tax experts is ready to assist you with compliance, registration, and filing.
                            </p>
                            <Link
                                href="/contact"
                                className="bg-white text-navy px-8 py-3 rounded-full font-bold hover:bg-sky-blue hover:text-white transition-all shadow-lg"
                            >
                                Speak to an Expert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
