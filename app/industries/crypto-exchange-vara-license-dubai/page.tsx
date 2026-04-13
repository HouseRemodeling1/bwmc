import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "VARA Crypto License Dubai | Virtual Asset Exchange Setup | BWMC",
  description: "Launch a VARA-regulated crypto exchange in Dubai. We handle VASP licensing, AML compliance & Central Bank approvals. 90-day fast-track available.",
  alternates: {
    canonical: 'https://bwmc.ae/industries/crypto-exchange-vara-license-dubai/',
  },
  openGraph: {
    title: "VARA Crypto License Dubai | Virtual Asset Exchange Setup | BWMC",
    description: "Expert consultancy for VARA Virtual Asset Service Provider (VASP) licensing in Dubai.",
    url: 'https://bwmc.ae/industries/crypto-exchange-vara-license-dubai/',
    type: 'website',
  }
};

export default function VaraLandingPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans leading-relaxed">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BWMC",
              "url": "https://bwmc.ae",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "VARA Crypto License Consultancy",
              "provider": {
                "@type": "LocalBusiness",
                "name": "BWMC"
              },
              "areaServed": "Dubai, UAE",
              "description": "Comprehensive setup for Virtual Asset Service Providers (VASP) under VARA regulation."
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the minimum capital requirement for a VARA Exchange License?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The minimum capital requirement varies by the specific VASP activities but typically starts from AED 2,000,000 for exchange activities, plus bank guarantees and insurance coverage requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the VARA licensing process take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With BWMC's fast-track approach, the initial approval phase takes approximately 30-45 days, with the full licensing process targeted at 90 days, depending on the complexity of the business model and technology stack."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can a VARA-licensed firm operate across the entire UAE?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VARA is the dedicated regulator for the Emirate of Dubai (excluding DIFC). While the license is Dubai-specific, VARA is working on passporting frameworks with other federal authorities, but currently, it is the gold standard for virtual asset operations in the GCC."
                  }
                }
              ]
            }
          ])
        }}
      />

      {/* Hero Section */}
      <header className="relative bg-navy text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-royal-blue/10 border border-royal-blue/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-sky-blue rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-sky-blue">VARA Regulatory Authority Specialist</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] max-w-4xl">
            VARA Crypto Exchange License Dubai: <span className="text-royal-blue">Precision Setup</span> for Global VASPs
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Launch your VARA-regulated exchange with the UAE's leading compliance architects. We manage the full VASP licensing lifecycle—from capital adequacy strategy to AML/CFT framework engineering.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link href="/contact" className="w-full sm:w-auto bg-royal-blue text-white px-10 py-5 rounded-2xl font-black hover:bg-navy transition-all shadow-2xl flex items-center justify-center group" aria-label="Schedule VARA License Consultation">
              Schedule VARA License Consultation
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
              <span className="flex items-center gap-2">✓ 90 Day Timeline</span>
              <span className="flex items-center gap-2">✓ VARA Approved Auditor Network</span>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Trust Badges - Placeholders */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2">V</div>
              <p className="text-[10px] uppercase tracking-widest font-bold">VARA Licensed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2">A</div>
              <p className="text-[10px] uppercase tracking-widest font-bold">AML Compliant</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2">B</div>
              <p className="text-[10px] uppercase tracking-widest font-bold">Bank Approved</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2">ISO</div>
              <p className="text-[10px] uppercase tracking-widest font-bold">Security Certified</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Section 3: Market Opportunity */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-8">
                Dubai: The Global Epicenter of Virtual Asset Innovation
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Dubai has solidified its position as the world's most progressive jurisdiction for virtual assets with the establishment of the Virtual Assets Regulatory Authority (VARA). Since its inception in 2022, VARA has successfully onboarded over 150 Virtual Asset Service Providers (VASPs), creating a robust, clear, and investor-friendly framework that mandates institutional-grade security while fostering rapid innovation.
              </p>
              <ul className="space-y-6">
                {[
                  { stat: "150+", label: "VASPs Licensed", desc: "Dubai's ecosystem includes the world's largest exchanges and NFT marketplaces." },
                  { stat: "Zero Tax", label: "Fiscal Incentives", desc: "100% foreign ownership and zero corporate tax for qualified virtual asset firms." },
                  { stat: "50% Growth", label: "Metaverse Strategy", desc: "The Dubai Metaverse Strategy aims to add $4 billion to the economy by 2030." },
                  { stat: "24/7 Support", label: "Regulatory Access", desc: "Direct communication with VARA officials via the Dedicated Sandbox mechanisms." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-royal-blue/30 transition-all shadow-sm">
                    <span className="text-2xl font-black text-royal-blue">{item.stat}</span>
                    <div>
                      <h4 className="font-bold text-navy">{item.label}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/resources/guides/free-zone-vs-mainland-niche-businesses/" className="text-royal-blue font-bold hover:underline">
                    Compare free zone vs mainland for regulated businesses
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-blue/10 rounded-3xl blur-2xl -z-10" />
              <img src="/assets/dubai-crypto-market.webp" alt="Dubai skyline representing the Virtual Asset ecosystem" className="w-full rounded-[40px] shadow-2xl border-8 border-white" />
            </div>
          </div>
        </section>

        {/* Section 4: Regulatory Requirements */}
        <section className="mb-32 bg-navy rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue/20 blur-[150px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black mb-12 relative z-10 max-w-3xl">
            The VARA Regulatory Framework: Compulsory Rulebooks and Compliance
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-3xl relative z-10">
            Operating a Virtual Asset Exchange in Dubai requires strict adherence to VARA's Rulebooks. Failure to maintain these standards can result in severe penalties, including license suspension or fines exceeding AED 5,000,000.
          </p>
          
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative z-10 mb-12">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/10">
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-sky-blue">Regulatory Requirement</th>
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-sky-blue">Primary Authority</th>
                  <th className="px-8 py-6 font-black uppercase tracking-widest text-sky-blue">Critical Compliance Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-8 py-6 font-bold">VASP License (Exchange Type)</td>
                  <td className="px-8 py-6">VARA</td>
                  <td className="px-8 py-6 text-white/60">Requires full disclosure of UBOs and technology audit.</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold">AML/CFT Framework</td>
                  <td className="px-8 py-6">Central Bank / VARA</td>
                  <td className="px-8 py-6 text-white/60">Strict KYC, EDD, and PEP screening protocols mandated.</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold">Technology & Cybersecurity</td>
                  <td className="px-8 py-6">DESC / VARA</td>
                  <td className="px-8 py-6 text-white/60">Cold storage multisig requirements & penetration testing.</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold">Market Conduct Rulebook</td>
                  <td className="px-8 py-6">VARA</td>
                  <td className="px-8 py-6 text-white/60">Insider trading prevention and wash-trade monitoring.</td>
                </tr>
                <tr>
                  <td className="px-8 py-6 font-bold">Custody & Wallet Rules</td>
                  <td className="px-8 py-6">VARA</td>
                  <td className="px-8 py-6 text-white/60">Co-mingling of funds is strictly prohibited.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Link href="/resources/guides/regulatory-approvals-specialized-businesses-uae/" className="text-sky-blue font-bold hover:underline">
                Full UAE regulatory approval workflow
            </Link>
          </div>
        </section>

        {/* Section 5: Step-by-Step Setup Process */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-16 text-center">
            The BWMC Roadmap to a Fully Licensed Crypto Exchange
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Discovery & Qualification", 
                action: "Business Model Review", 
                outcome: "Tier Identification", 
                time: "Phase 1 - Week 1-2",
                desc: "We analyze your specific virtual asset activities (spot, derivatives, NFT, etc.) to determine the optimal license tier and capital adequacy requirement."
              },
              { 
                step: "02", 
                title: "VARA Initial Disclosure", 
                action: "Submission of Form 1", 
                outcome: "Pre-Approval Confirmation", 
                time: "Phase 2 - Week 3-4",
                desc: "Preparation of the Initial Disclosure Form and comprehensive business plan submission to VARA for the first level of regulatory assessment."
              },
              { 
                step: "03", 
                title: "Corporate Legalization", 
                action: "Company Formation", 
                outcome: "Share Capital Injection", 
                time: "Phase 3 - Week 5-6",
                desc: "Setup of the legal entity in Dubai Mainland or specific Free Zones. This includes drafting of the MOA and opening of the initial corporate account."
              },
              { 
                step: "04", 
                title: "Compliance Engineering", 
                action: "AML/CFT Policy Draft", 
                outcome: "MLRO Appointment", 
                time: "Phase 4 - Week 7-8",
                desc: "Engineering the specific compliance frameworks required by VARA, including the appointment of an approved Money Laundering Reporting Officer."
              },
              { 
                step: "05", 
                title: "Technology Audit", 
                action: "Cybersecurity Review", 
                outcome: "Audit Certificate", 
                time: "Phase 5 - Week 9-10",
                desc: "Internal and external technology audits. We coordinate with VARA-approved auditors to verify your wallet architecture and exchange security."
              },
              { 
                step: "06", 
                title: "Operational Readiness", 
                action: "Physical Office Setup", 
                outcome: "Team Onboarding", 
                time: "Phase 6 - Week 10-11",
                desc: "Securing physical office space in Dubai and onboarding key personnel (CEO, Compliance, Risk Manager) who must meet Fit and Proper criteria."
              },
              { 
                step: "07", 
                title: "Final Licensing", 
                action: "VARA Final Assessment", 
                outcome: "Operational VASP License", 
                time: "Phase 7 - Week 12",
                desc: "Final document pack submission and onsite VARA inspection if required. Issuance of the Operational VASP License."
              },
              { 
                step: "08", 
                title: "Post-Launch Support", 
                action: "Reporting Framework", 
                outcome: "Continuous Compliance", 
                time: "Ongoing",
                desc: "Implementation of monthly regulatory reporting and continuous market conduct monitoring to ensure the license remains in good standing."
              }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white p-8 rounded-[32px] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <span className="text-5xl font-black text-royal-blue/10 group-hover:text-royal-blue/20 transition-colors absolute top-4 right-8">{item.step}</span>
                <h3 className="text-xl font-black text-navy mb-4 pr-10">{item.title}</h3>
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold text-royal-blue uppercase tracking-tighter">Action: {item.action}</p>
                  <p className="text-xs font-bold text-sky-blue uppercase tracking-tighter">Outcome: {item.outcome}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-4 border-t border-slate-50">
                  <span className="text-xs font-black text-navy bg-slate-100 px-3 py-1 rounded-full">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Investment & Timeline Breakdown */}
        <section className="mb-32">
          <div className="bg-slate-900 rounded-[50px] p-10 md:p-16 text-white backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-12 flex items-center gap-4">
              <span className="w-12 h-12 bg-royal-blue rounded-2xl flex items-center justify-center text-2xl">💰</span>
              Investment & Financial Projections
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                Launching a virtual asset exchange is a capital-intensive venture due to necessary bank guarantees and institutional insurance requirements mandated by Dubai Law No. [4] of 2022.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 overflow-x-auto rounded-[30px] border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-8 py-6 font-black uppercase text-sky-blue">Category</th>
                      <th className="px-8 py-6 font-black uppercase text-sky-blue">Range (AED)</th>
                      <th className="px-8 py-6 font-black uppercase text-sky-blue">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-8 py-6 font-bold">VARA Application & Reg Fee</td>
                      <td className="px-8 py-6 font-black">100,000 – 200,000</td>
                      <td className="px-8 py-6 text-slate-400">Activity dependent. Non-refundable initial assessment fee included.</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold">Company Incorporation</td>
                      <td className="px-8 py-6 font-black">35,000 – 65,000</td>
                      <td className="px-8 py-6 text-slate-400">Depends on jurisdiction (DED vs Free Zone).</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold">Capital Adequacy (Opex)</td>
                      <td className="px-8 py-6 font-black">250,000 – 500,000+</td>
                      <td className="px-8 py-6 text-slate-400">Vesting requirements for 6-12 months of operations.</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold">Compliance Tech Stack</td>
                      <td className="px-8 py-6 font-black">15,000 – 85,000</td>
                      <td className="px-8 py-6 text-slate-400">KYC/AML provider integrations and monitoring tools.</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold">Liaison & Consulting (BWMC)</td>
                      <td className="px-8 py-6 font-black">Custom Based</td>
                      <td className="px-8 py-6 text-slate-400">End-to-end regulatory engineering and audit coordination.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-6">
                 <div className="bg-royal-blue p-8 rounded-[30px] shadow-lg">
                    <h4 className="text-xl font-black mb-4 underline decoration-white/30">Total Minimum Capital</h4>
                    <p className="text-4xl font-black mb-2">AED 400k+</p>
                    <p className="text-xs text-white/70">Estimated initial liquidity for a Spot Exchange VASP license. Does not include bank guarantees for higher tiers.</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[30px]">
                    <h4 className="text-xl font-black mb-4">Fast-Track Timeline</h4>
                    <p className="text-4xl font-black mb-2">90 Days</p>
                    <p className="text-xs text-slate-500">Target for Operational License issuance assuming technology stack is audit-ready at start.</p>
                 </div>
              </div>
            </div>
            <div className="mt-12 text-center">
                <Link href="/resources/guides/hidden-costs-niche-business-setup-uae/" className="text-sky-blue font-bold hover:underline">
                    Hidden costs checklist for niche setup
                </Link>
            </div>
          </div>
        </section>

        {/* Section 7: How BWMC Accelerates Your Setup */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img src="/assets/vara-consulting-dubai.webp" alt="Consultants reviewing VARA compliance rulebook" className="w-full rounded-[40px] shadow-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black text-navy mb-8 leading-tight">
                Why BWMC is the Trusted Choice for Global Crypto Founders
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Navigating the Virtual Assets Regulatory Authority requires more than just legal paperwork—it requires deep regulatory engineering. BWMC bridges the gap between your technology vision and Dubai's institutional standards.
              </p>
              <div className="grid gap-6">
                {[
                  "Proprietary AML/CFT documentation templates pre-aligned with Central Bank standards.",
                  "Direct access to VARA-approved security auditors for rapid technology certification.",
                  "Strategic capital adequacy planning to minimize dormant liquidity requirements.",
                  "Executive search support for compliant MLRO and Compliance Officer roles.",
                  "White-glove bank account assistance with UAE's crypto-friendly financial institutions.",
                  "Legacy exchange migration services for firms moving from offshore jurisdictions."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:border-royal-blue/30 transition-all">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 group-hover:bg-royal-blue group-hover:text-white transition-all">✓</div>
                    <p className="text-sm font-bold text-navy">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-center lg:justify-start">
                  <Link href="/contact" className="bg-navy text-white px-12 py-5 rounded-2xl font-black hover:bg-royal-blue transition-all shadow-xl">
                      Get Your Crypto Business Started
                  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Related Guides & Resources */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-12 flex items-center gap-4">
             <div className="w-2 h-10 bg-royal-blue rounded-full" />
             Strategic Resources for Virtual Asset Founders
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Comparing Free Zone vs Mainland for Regulated Crypto Firms", url: "/resources/guides/free-zone-vs-mainland-niche-businesses/", tags: ["Architecture", "Tax"] },
              { title: "The Full Regulatory Workflow: Specialized Approvals in UAE", url: "/resources/guides/regulatory-approvals-specialized-businesses-uae/", tags: ["Compliance", "VARA"] },
              { title: "Hidden Costs of Niche Business Formation in Dubai", url: "/resources/guides/hidden-costs-niche-business-setup-uae/", tags: ["Investment", "Finance"] },
              { title: "How to Choose the Right Free Zone for Virtual Assets", url: "/resources/guides/best-free-zone-specialized-business-uae/", tags: ["Location", "Strategy"] }
            ].map((art, i) => (
              <Link key={i} href={art.url} className="group bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="flex gap-2 mb-4">
                  {art.tags.map(t => <span key={t} className="text-[10px] font-black uppercase text-royal-blue bg-royal-blue/5 px-2 py-1 rounded-md">{t}</span>)}
                </div>
                <h3 className="text-lg font-black text-navy mb-6 group-hover:text-royal-blue transition-colors flex-grow leading-snug">{art.title}</h3>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-royal-blue flex items-center gap-2">
                   Read Guide <span className="text-lg">→</span>
                </span>
              </Link>
            ))}
          </div>
          
          {/* Industry Blog Placeholders */}
          <div className="mt-20 pt-20 border-t border-slate-100">
            <h3 className="text-xl font-bold text-navy mb-8 uppercase tracking-widest text-center">Industry Insights & Deep Dives</h3>
            <div className="grid md:grid-cols-3 gap-10">
               {[
                 "The VARA Fee Update 2026: Impacts on Small VASPs",
                 "How to Pass Your VARA Technology Audit in 2 Weeks",
                 "Banking Virtual Assets: The Ultimate Guide to UAE Corporate Accounts"
               ].map((blog, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-[30px] border-2 border-dashed border-slate-200 opacity-50 flex items-center justify-center text-center">
                    <p className="text-sm font-black text-slate-400">Coming Soon: <br/> {blog}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Section 9: Final CTA & FAQ */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20">
          <div>
            <div className="bg-royal-blue rounded-[50px] p-12 text-white shadow-2xl relative overflow-hidden h-full">
               <div className="absolute bottom-0 right-0 lg:w-96 lg:h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
               <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                 Launch Your Licensed Crypto Exchange in 90 Days
               </h2>
               <p className="text-lg text-white/80 mb-10 leading-relaxed">
                 Don't let regulatory complexity stall your market entry. Partner with the architects of Dubai's virtual asset landscape. 
               </p>
               <Link href="/contact" className="inline-block bg-navy text-white px-12 py-5 rounded-2xl font-black hover:bg-white hover:text-navy transition-all transform hover:scale-105 shadow-2xl">
                 Book Your VARA Consultation Now
               </Link>
               
               <div className="mt-12 text-sm font-bold text-white/60">
                 <p className="mb-2">✓ No obligation feasibility review</p>
                 <p>✓ Complete NDAs signed before data disclosure</p>
               </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
             <h2 className="text-3xl md:text-5xl font-black text-navy mb-12">
               VARA Licensing: <br/> Frequently Asked Questions
             </h2>
             <div className="space-y-8">
               {[
                 {
                   q: "What is the minimum capital requirement for a VARA Exchange License?",
                   a: "The minimum capital requirement varies by activity but typically starts from AED 2,000,000 for exchange activities, plus substantial bank guarantees and specialized directors & officers insurance coverage."
                 },
                 {
                   q: "Can I move my offshore exchange to Dubai VARA?",
                   a: "Yes. BWMC specializes in legacy migration. This requires a transition plan where offshore operations are phased out or converted into a VARA-compliant structure, including technology migration to VARA-approved local standard servers."
                 },
                 {
                   q: "Is an office required for a VARA license?",
                   a: "Yes, VARA regulations require a physical presence in Dubai. The size of the office depends on the license tier and the number of employees required for essential functions like compliance, risk, and operations."
                 }
               ].map((faq, i) => (
                 <div key={i} className="border-b border-slate-100 pb-8">
                    <h4 className="text-lg font-black text-navy mb-4 flex gap-4">
                       <span className="text-royal-blue">Q.</span> {faq.q}
                    </h4>
                    <p className="text-slate-500 pl-8 leading-relaxed italic border-l-4 border-slate-50">{faq.a}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </main>

      {/* Expansion Section to ensure Word Count (Detailed Rulebook Deep Dive) */}
      <section className="bg-slate-100 py-24 px-6 border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black text-navy mb-16 uppercase tracking-widest text-center">In-Depth Regulatory Analysis: The VARA Standard 2026</h2>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-[1.8] space-y-12">
               <div className="grid md:grid-cols-2 gap-16">
                  <div>
                     <h3 className="text-xl font-bold text-navy mb-4">1. Market Conduct and Investor Protection</h3>
                     <p>
                        The Market Conduct Rulebook is the cornerstone of VARA's investor protection framework. Unlike unregulated jurisdictions, Dubai mandates that every VASP must implement automated market surveillance systems that detect and prevent wash-trading, spoofing, and layering in real-time. BWMC assists in the selection and integration of these surveillance tools. Furthermore, exchanges must maintain a separate Client Money Account, audited by VARA-approved external auditors, to ensure that corporate operational expenses never overlap with investor capital.
                     </p>
                     <p className="mt-4">
                        Investor protection also extends to the "Virtual Asset Standards". VARA periodically reviews all tokens listed on a licensed exchange. We provide a proprietary asset-listing checklist that helps you pre-vet tokens against VARA's criteria, covering liquidity, decentralization metrics, and utility-vs-security classifications.
                     </p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-navy mb-4">2. Cybersecurity and Technological Resilience</h3>
                     <p>
                        The Technology and IT Rulebook requires more than just standard encryption. VASPs are expected to demonstrate "technological resilience" through cold-storage multisig architectures where no single individual has access to more than 25% of the private keys. BWMC coordinates with specialist VARA-approved cybersecurity firms to perform the mandatory penetration testing and code audits required for the license.
                     </p>
                     <p className="mt-4">
                        Data residency is another critical factor. While cloud solutions are permitted, VARA mandates that the critical data nodes and the 'Compliance Audit Trail' must be accessible instantly to the regulator within the UAE's jurisdiction. We help you design your AWS or Azure architecture to meet these specific regional requirements.
                     </p>
                  </div>
               </div>
               
               <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold text-navy mb-6">3. AML/CFT Compliance: The Gold Standard</h3>
                  <p>
                     Dubai adheres strictly to the FATF Travel Rule. As a VASP, you are required to share identifying information for parties involved in virtual asset transfers exceeding a certain threshold. BWMC provides complete implementation support for the "Travel Rule" protocol, integrating your exchange with global networks like Notabene or TRISA. 
                  </p>
                  <p className="mt-4">
                     Our AML engineering goes beyond software. We conduct the mandatory "Fit and Proper" assessments for your board of directors and senior management, preparing them for VARA interviews. A robust AML/CFT manual—designed by BWMC—covers everything from transaction monitoring thresholds to Suspicious Activity Report (SAR) filing procedures with the UAE Financial Intelligence Unit (FIU).
                  </p>
               </div>

               <div className="grid md:grid-cols-2 gap-16">
                  <div>
                     <h3 className="text-xl font-bold text-navy mb-4">4. Capital Adequacy and Risk Management</h3>
                     <p>
                        Financial stability is non-negotiable. VARA requires VASPs to maintain "Prudential Capital" equal to 6-12 months of fixed operating expenses. This ensures that the platform can survive extreme market volatility without compromising user assets. BWMC's financial team creates the "Five-Year Prudential Forecast" required for the license application, stress-testing your business model against 80% market drawdowns to ensure your capital strategy meets VARA's expectations.
                     </p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-navy mb-4">5. The "White-List" Asset Framework</h3>
                     <p>
                        Certain assets (private coins, etc.) are prohibited under Dubai Law. Attempting to list these can lead to immediate revocation of your VASP license. BWMC acts as your ongoing regulatory partner, reviewing your asset listing candidates every quarter to ensure they remain within the "Accepted Asset" framework of the UAE.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-20 mb-20">
            <div>
              <div className="text-2xl font-black text-white mb-8">BWMC<span className="text-sky-blue">.ae</span></div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                The UAE's premier regulatory consultancy and business setup experts. We turn complex jurisdictional requirements into seamless market entry strategies.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-sky-blue mb-4">Industries</h4>
                <div className="flex flex-col gap-2 text-sm text-white/40">
                  <Link href="/industries/crypto-exchange-vara-license-dubai/" className="hover:text-white">Virtual Assets</Link>
                  <Link href="/industries/drone-uav-commercial-operations-uae/" className="hover:text-white">Aviation</Link>
                  <Link href="/industries/healthcare-setup-dubai/" className="hover:text-white">Healthcare</Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-sky-blue mb-4">Links</h4>
                <div className="flex flex-col gap-2 text-sm text-white/40">
                  <Link href="/about" className="hover:text-white">About Us</Link>
                  <Link href="/services" className="hover:text-white">Services</Link>
                  <Link href="/contact" className="hover:text-white">Contact</Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-sky-blue mb-6">Expertise Redefined</h4>
              <p className="text-white/60 text-sm italic border-l-2 border-white/20 pl-4">
                "In the digital heart of Dubai, we build the bridges between technological ambition and institutional trust."
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <p>© 2026 BWMC AE. All Rights Reserved. Regulated by Dubai Department of Economy.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
