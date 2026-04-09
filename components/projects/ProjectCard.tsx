'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-2',
  large: 'col-span-1 md:col-span-2 row-span-2',
  wide: 'col-span-1 md:col-span-2 row-span-1',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-card flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-portfolio-accent/10",
        sizeClasses[project.size] || 'col-span-1 row-span-1'
      )}
    >
      {/* Browser Mockup Wrapper */}
      <div className="relative w-full h-full flex flex-col">
        {/* Browser Header */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-portfolio-border/30 border-b border-portfolio-border/50">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="ml-2 flex-1 h-4 rounded bg-portfolio-bg/50 border border-portfolio-border/30 flex items-center px-2">
            <span className="text-[8px] text-portfolio-text-muted truncate opacity-50">
              {project.url?.replace('https://', '') || project.title.toLowerCase().replace(/ /g, '-')}
            </span>
          </div>
        </div>

        {/* Project Image Container */}
        <div className="relative flex-1 bg-portfolio-bg overflow-hidden">
          {project.images && project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-portfolio-card to-portfolio-bg">
               <span className="text-4xl font-black text-portfolio-accent/20 select-none">
                 {project.title.charAt(0)}
               </span>
            </div>
          )}

          {/* Overlay Info (on Hover) */}
          <div className="absolute inset-0 bg-portfolio-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span 
                    key={t} 
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-portfolio-accent/50 text-portfolio-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="space-y-2">
                <Link href={`/projects/${project.id}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-portfolio-text-primary hover:text-portfolio-accent transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-sm text-portfolio-text-secondary line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-portfolio-border/50 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-portfolio-text-muted">
                {project.client}
              </span>
              <div className="flex gap-2">
                {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-portfolio-bg border border-portfolio-border flex items-center justify-center text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg transition-all"
                    >
                      <ExternalLink size={14} />
                    </a>
                )}
                <Link 
                  href={`/projects/${project.id}`}
                  className="w-8 h-8 rounded-full bg-portfolio-bg border border-portfolio-border flex items-center justify-center text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
