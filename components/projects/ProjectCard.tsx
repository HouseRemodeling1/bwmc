'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

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
        "group relative overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-card p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-portfolio-accent/10",
        sizeClasses[project.size] || 'col-span-1 row-span-1'
      )}
    >
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        <div className="space-y-4">
          {/* Tech Stack Pills */}
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
            <h3 className="text-xl md:text-2xl font-bold text-portfolio-text-primary group-hover:text-portfolio-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-portfolio-text-secondary line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-portfolio-border/50 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-portfolio-text-muted">
            {project.client}
          </span>
          <div className="w-8 h-8 rounded-full bg-portfolio-bg border border-portfolio-border flex items-center justify-center text-portfolio-accent group-hover:bg-portfolio-accent group-hover:text-portfolio-bg transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
