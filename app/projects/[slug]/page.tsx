import { projects } from '@/lib/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | BWMC Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Project Hero */}
      <section className="relative h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-8xl font-black text-slate-800 opacity-20">
            {project.title.split(' ').map(w => w[0]).join('')}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 pb-16">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sky-blue hover:text-sky-blue/80 transition-colors mb-8 group font-bold"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-md bg-sky-blue/10 text-sky-blue border border-sky-blue/20 text-xs font-black uppercase tracking-widest mb-4">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">{project.title}</h1>
            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-sky-blue/20 flex items-center justify-center text-sky-blue">
                    <Zap size={20} />
                  </span>
                  The Challenge
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">
                  {project.challenge || "Building a high-performance digital presence that balances aesthetic excellence with technical robustness. The goal was to create an experience that resonates with the target audience while maintaining lightning-fast load times and seamless interactivity."}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-sky-blue/20 flex items-center justify-center text-sky-blue">
                    <ShieldCheck size={20} />
                  </span>
                  Strategic Solution
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">
                  {project.solution || "Leveraging modern frameworks and optimized delivery pipelines, we implemented a custom architecture tailored to the client's specific needs. By focusing on mobile-first design and core web vitals, we ensured a premium user experience across all devices."}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black mb-8">Engineering Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature) => (
                    <div key={feature} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-sky-blue/20 flex items-center justify-center text-sky-blue shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                      </div>
                      <span className="text-slate-200 font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Meta */}
            <div className="space-y-12">
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-sky-blue/5">
                <h3 className="text-xs font-black mb-10 text-sky-blue uppercase tracking-widest border-b border-white/10 pb-4">Project Intelligence</h3>
                
                <div className="space-y-8">
                  <div>
                    <span className="block text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Partner Organization</span>
                    <span className="text-lg font-bold text-white">{project.client}</span>
                  </div>

                  <div>
                    <span className="block text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Tech Stack</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-md bg-sky-blue/10 text-sky-blue text-xs font-bold border border-sky-blue/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.url && (
                    <div className="pt-4">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-sky-blue hover:bg-sky-blue/90 text-white rounded-xl font-bold transition-all group"
                      >
                        Visit Live Platform
                        <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

               <div className="p-8 rounded-2xl border border-sky-blue/20 bg-sky-blue/5">
                 <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                   <Globe size={18} className="text-sky-blue" />
                   Global Impact
                 </h3>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                   This project represents BWMC's commitment to delivering enterprise-grade {project.category} solutions that define industry standards.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
