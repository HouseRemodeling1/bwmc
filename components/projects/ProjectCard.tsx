'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Determine card size for bento variety
  const isLarge = index % 7 === 0;
  const isWide = index % 7 === 3;
  const isTall = index % 7 === 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-sky-blue/10",
        isLarge && "md:col-span-2 md:row-span-2",
        isWide && "md:col-span-2",
        isTall && "md:row-span-2"
      )}
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="relative w-full h-full min-h-[300px] flex flex-col justify-end p-6">
          {/* Background Placeholder */}
          <div className="absolute inset-0 bg-slate-900 -z-10 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
             <div className="flex items-center justify-center h-full text-white/5 font-black text-6xl select-none group-hover:scale-110 transition-transform duration-700">
                {project.title.charAt(0)}
             </div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-sky-blue/10 text-sky-blue border border-sky-blue/20">
                  {t}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold text-white group-hover:text-sky-blue transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4 group-hover:text-slate-300 transition-colors">
              {project.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                {project.client}
              </span>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-sky-blue group-hover:text-white transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {project.url && (
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/50 backdrop-blur-md text-white/50 hover:text-sky-blue opacity-0 group-hover:opacity-100 transition-all z-20"
          title="View Live Site"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </motion.div>
  );
}
