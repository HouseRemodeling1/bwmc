import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileText, 
  Briefcase, 
  MessageCircle, 
  Phone,
  Calculator,
  ScrollText,
  Shield,
  Receipt,
  FolderCheck,
  Building2,
  Workflow,
  Handshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Trade Finance Services UAE | LCs, Supply Chain Finance & Guarantees | BWMC",
  description: "Expert trade finance solutions in UAE: Letters of Credit, supply chain finance, documentary collections & bank guarantees. DIFC, ADGM, mainland compliance support.",
  alternates: {
    canonical: 'https://www.bwmc.ae/industries/trade-finance-services-uae/',
  },
  openGraph: {
    title: "Trade Finance Services UAE | LCs, Supply Chain Finance & Guarantees | BWMC",
    description: "Expert trade finance solutions in UAE: Letters of Credit, supply chain finance, documentary collections & bank guarantees. DIFC, ADGM, mainland compliance support.",
    url: 'https://www.bwmc.ae/industries/trade-finance-services-uae/',
    type: 'website',
    images: [{ url: 'https://www.bwmc.ae/images/trade-finance-og.jpg' }]
  }
};

export default function TradeFinancePage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans leading-relaxed">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Trade Finance Services UAE",
              "provider": {
                "@type": "Organization",
                "name": "BWMC",
                "url": "https://www.bwmc.ae"
              },
              "serviceType": "Trade Finance & Banking Advisory",
              "areaServed": {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Trade Finance Solutions",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Letters of Credit Advisory",
                      "description": "Expert guidance on Sight, Usance, Back-to-Back and Transferable LCs for UAE importers and exporters"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Supply Chain Finance Structuring",
                      "description": "Invoice factoring, discounting and receivables financing solutions to optimize working capital"
                    }
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What documents are required for a Letter of Credit application in UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Banks typically require: Commercial invoice, proforma invoice, purchase contract, trade license, MOA, audited financial statements, KYC documents, shipping terms (Incoterms), and detailed goods description. BWMC prepares a complete, bank-ready package to minimize queries."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to get a trade finance facility approved in UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simple LCs/guarantees: 7–14 days. Supply chain finance: 30–45 days. Structured/commodity finance: 60–90 days. BWMC's pre-vetted applications typically reduce these timelines by 30–50%."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can free zone companies access the same trade finance products as mainland entities?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, but with nuances. Free zone companies can access LCs, guarantees, and supply chain finance, though some banks may require additional documentation. BWMC structures applications to address jurisdiction-specific requirements."
                  }
                }
              ]
            }
          ])
        }}
      />

      {/* Hero Section */}
      <header className="relative bg-[#001B44] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in shadow-xl">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-sky-blue">Trade Finance Specialists</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                Trade Finance Services in <span className="text-white underline decoration-yellow-400 decoration-8">UAE</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-semibold">
                Letters of Credit, Supply Chain Finance & Bank Guarantees for Importers, Exporters and Trading Houses. Secure your liquidity with the UAE's premier banking architects.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
                {["Central Bank Compliant", "DIFC & ADGM Approved", "LC Advisory Specialists", "Bank Partnership Network"].map(badge => (
                  <span key={badge} className="bg-white/10 border border-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                    ✓ {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link href="#consultation" className="w-full sm:w-auto bg-white text-[#001B44] px-10 py-5 rounded-2xl font-black hover:bg-yellow-400 hover:text-navy transition-all shadow-2xl flex items-center justify-center group">
                  Get Free Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> 45 Day Approval</span>
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> 15+ Partners</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl -z-10" />
              <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-md shadow-2xl">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                       <TrendingUp className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-white/50 uppercase tracking-widest">Market Impact</p>
                       <p className="text-2xl font-black text-white">$500B+ Annual Trade</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Success Rate", val: "98%", desc: "On BWMC proposed facilities" },
                      { label: "Avg Timeline", val: "45 Days", desc: "For full facility activation" },
                      { label: "Active Clients", val: "150+", desc: "UAE based trading entities" }
                    ].map(stat => (
                      <div key={stat.label} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div>
                          <p className="text-sm font-bold text-white">{stat.label}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{stat.desc}</p>
                        </div>
                        <p className="text-xl font-black text-white">{stat.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Market Context */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-[#001B44] mb-8 leading-tight">
                Why UAE Businesses Need <br/> <span className="text-blue-600">Expert Trade Finance</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                The UAE is a global trade hub handling over <strong>$500 billion in non-oil trade annually</strong>, connecting markets across Asia, Africa, and Europe. Navigating trade finance instruments—from <strong>Letters of Credit (LCs)</strong> to <strong>supply chain finance</strong>—requires deep expertise in UAE banking regulations and international trade standards (UCP 600, ISP98).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-8 rounded-[30px] bg-[#001B44] text-white shadow-xl">
                   <p className="text-3xl font-black mb-1">$500B+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-sky-blue">UAE Non-Oil Trade Context</p>
                 </div>
                 <div className="p-8 rounded-[30px] bg-white border border-slate-100 shadow-xl">
                   <p className="text-3xl font-black text-[#001B44] mb-1">45 Days</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#001B44]/40">Avg approval timeline</p>
                 </div>
              </div>
              <div className="mt-12 flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                 </div>
                 <p className="text-sm font-bold text-slate-700">
                    Compliant with Central Bank of UAE regulations & international UCP 600 standards.
                 </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-blue/10 rounded-[60px] blur-2xl -z-10" />
              <div className="bg-white p-4 rounded-[60px] shadow-2xl border border-slate-100">
                <img src="/images/industries/trade-finance-concept.png" alt="Trade Finance Dubai" className="w-full rounded-[50px] shadow-inner" />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Solutions */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#001B44] mb-4">Core Trade Finance Solutions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Precision-structured instruments to optimize working capital and minimize transaction risk.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Letters of Credit (LC)",
                subtitle: "Import & Export",
                icon: ScrollText,
                desc: "Expertly structured Sight, Usance, and Transferable LCs to secure your international procurement."
              },
              {
                title: "Bank Guarantees",
                subtitle: "Tender, Performance, Advance",
                icon: ShieldCheck,
                desc: "Contract security bonds issued under URDG 758 to fulfill government and private tender requirements."
              },
              {
                title: "Standby LCs (SBLC)",
                subtitle: "Financial Security",
                icon: Shield,
                desc: "A secondary payment mechanism that serves as a proof of quality and reliable financial standing."
              },
              {
                title: "Trust Receipts (TR)",
                subtitle: "& Bill Discounting",
                icon: Receipt,
                desc: "Liquidity solutions allowing you to take possession of goods while deferring bank payment."
              },
              {
                title: "Documentary Collections",
                subtitle: "CAD / DA / DP",
                icon: FolderCheck,
                desc: "Secure handling of shipping documents against payment or acceptance (URC 522)."
              },
              {
                title: "Invoice Factoring",
                subtitle: "& Discounting",
                icon: FileText,
                desc: "Accelerate your cash flow by receiving immediate advances against your outstanding receivables."
              },
              {
                title: "Supply Chain Finance",
                subtitle: "Solutions",
                icon: Workflow,
                desc: "Collaborative financing programs that optimize working capital for both buyers and suppliers."
              },
              {
                title: "Bank Liaising",
                subtitle: "Credit Facilities",
                icon: Handshake,
                desc: "Direct representation with UAE banks to negotiate and secure complex credit lines and facilities."
              }
            ].map((sol, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#001B44] transition-colors shadow-sm">
                  <sol.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-black text-[#001B44] leading-tight">{sol.title}</h3>
                <p className="text-xs font-bold text-blue-600 mb-4">{sol.subtitle}</p>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">{sol.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="mb-32 bg-[#001B44] rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black mb-16 max-w-2xl relative z-10">Our 5-Step Trade Finance Roadmap</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
             {[
               { step: "01", title: "Analysis", desc: "Transaction and needs assessment." },
               { step: "02", title: "Negotiation", desc: "Bank selection and term optimization." },
               { step: "03", title: "Compliance", desc: "UCP 600 & KYC folder preparation." },
               { step: "04", title: "Liaison", desc: "Bank relationship & approval tracking." },
               { step: "05", title: "Activation", desc: "Facility activation & initial drawdown." }
             ].map((item, i) => (
               <div key={i} className="relative">
                  <span className="text-6xl font-black text-white/5 absolute -top-10 -left-4">0{i+1}</span>
                  <div className="pt-4">
                    <h3 className="text-lg font-black text-sky-blue uppercase tracking-widest mb-3">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20">
          <div>
             <h2 className="text-3xl md:text-5xl font-black text-[#001B44] mb-12 leading-tight">
               Trade Finance: <br/> Professional Insights
             </h2>
             <div className="space-y-10">
               {[
                 {
                   q: "What documents are required for an LC application?",
                   a: "Typical requirements include: Commercial invoice, trade license, MOA, audited financials (2 years), and KYC for directors. BWMC prepares bank-ready application packs to minimize rejection risk."
                 },
                 {
                   q: "How long does the facility approval take?",
                   a: "Simple LCs can be issued in 7-10 days. Complex supply chain facilities take 30-45 days. Our direct bank liaisons reduce this timeline by up to 50%."
                 },
                 {
                   q: "Can Free Zone companies access these facilities?",
                   a: "Yes. DMCC, JAFZA and DAFZA entities have full access to trade finance. We specialize in structuring applications that meet specific bank risk-scoring for free zone jurisdictions."
                 }
               ].map((faq, i) => (
                 <div key={i} className="border-b border-slate-100 pb-10">
                    <h4 className="text-xl font-black text-[#001B44] mb-4 flex gap-4">
                       <span className="text-blue-600">Q.</span> {faq.q}
                    </h4>
                    <p className="text-slate-500 pl-8 leading-relaxed font-semibold italic border-l-4 border-slate-50">{faq.a}</p>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-6">
             <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-50">
               <h3 className="text-2xl font-black text-[#001B44] mb-8 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Strategic Resources
               </h3>
               <div className="space-y-4">
                 {[
                   { t: "Regulatory Approvals Guide", l: "/resources/guides/regulatory-approvals-specialized-businesses-uae/", tag: "Compliance" },
                   { t: "Hidden Costs of UAE Setup", l: "/resources/guides/hidden-costs-niche-business-setup-uae/", tag: "Finance" },
                   { t: "Best Free Zone for Trade", l: "/resources/guides/best-free-zone-specialized-business-uae/", tag: "Strategy" }
                 ].map(guide => (
                   <Link key={guide.t} href={guide.l} className="group flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-[#001B44] transition-all">
                      <div>
                         <span className="text-[10px] font-black tracking-widest text-[#001B44]/40 uppercase mb-1 block group-hover:text-sky-blue">{guide.tag}</span>
                         <span className="text-sm font-black text-[#001B44] group-hover:text-white">{guide.t}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#001B44]/20 group-hover:text-white transition-all group-hover:translate-x-1" />
                   </Link>
                 ))}
               </div>
             </div>
             
             <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[50px] p-12 text-white shadow-2xl group flex flex-col justify-between h-full min-h-[300px]">
                <div>
                   <h3 className="text-3xl font-black mb-4">Request Facility Feasibility</h3>
                   <p className="text-white/80 font-semibold mb-8">Schedule a private session to analyze your trade flow and facility eligibility.</p>
                </div>
                <Link href="/contact" className="bg-white text-blue-700 px-10 py-5 rounded-3xl font-black hover:bg-yellow-400 hover:text-navy transition-all inline-flex items-center justify-center gap-2 shadow-xl group/btn">
                   Book Free Session
                   <MessageCircle className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                </Link>
             </div>
          </div>
        </section>

        {/* Consultation Form */}
        <section id="consultation" className="bg-slate-950 rounded-[60px] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.2),transparent)]" />
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Ready to Secure Your <span className="text-blue-500 underline decoration-8 decoration-white/10 uppercase tracking-tighter">Trade Finance</span>?</h2>
              <p className="text-slate-400 text-lg mb-12 font-semibold">Get a free, no-obligation feasibility review. We'll recommend the most cost-effective and compliant banking solutions for your business flow.</p>
              
              <form className="grid md:grid-cols-2 gap-6 text-left mb-12">
                 <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-blue-500 transition-all font-bold" />
                 <input type="email" placeholder="Business Email" className="bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-blue-500 transition-all font-bold" />
                 <input type="tel" placeholder="UAE Phone Number" className="bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-blue-500 transition-all font-bold" />
                 <select className="bg-white/10 border border-white/10 rounded-3xl px-8 py-5 text-white/50 focus:outline-none focus:border-blue-500 transition-all font-bold">
                    <option className="bg-navy">Select Business Type</option>
                    <option className="bg-navy">Importer</option>
                    <option className="bg-navy">Exporter</option>
                    <option className="bg-navy">Trading House / Other</option>
                 </select>
                 <textarea placeholder="Tell us about your requirements (LCs, Supply Chain, Guarantees...)" className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-blue-500 transition-all h-40 font-bold"></textarea>
                 <button className="md:col-span-2 bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-white hover:text-[#001B44] transition-all shadow-2xl flex items-center justify-center gap-3 group">
                    Request Professional Consultation
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                 </button>
              </form>
              <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-50">
                 <span className="flex items-center gap-2">✓ 100% Confidential</span>
                 <span className="flex items-center gap-2">✓ UAE Central Bank Compliant</span>
                 <span className="flex items-center gap-2">✓ Expert Bank Liaison</span>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}
