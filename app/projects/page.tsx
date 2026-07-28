import ProjectHero from "@/components/projects/Hero";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "BWMC Portfolio | Business Showcase & Case Studies",
  description: "Explore BWMC's diverse portfolio of web development, SaaS, and digital transformation projects across the UAE and beyond.",
  alternates: {
    canonical: "https://www.bwmc.ae/projects",
  },
};
export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <ProjectHero />
      <ProjectGrid />
      
      {/* Internal CTA */}
      <section className="py-24 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-blue to-cyan-400">Success Story</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
            Let BWMC's expertise in business management and engineering drive your next breakthrough.
          </p>
          <a 
            href="/contact"
            className="inline-block px-10 py-5 bg-sky-blue hover:bg-sky-blue/90 text-white rounded-xl font-bold transition-all shadow-xl shadow-sky-blue/20"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
