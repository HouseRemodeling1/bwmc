'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import ProjectCard from './ProjectCard';

const categories = ['all', 'wordpress', 'react', 'saas', 'landing'] as const;

export default function ProjectGrid() {
  const [filter, setFilter] = useState<typeof categories[number]>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects-grid" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-blue to-cyan-400">Portfolio</span>
            </h2>
            <p className="text-slate-400 max-w-xl">
              Showcasing excellence in digital transformation and web engineering across diverse industries.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all capitalize tracking-widest ${
                  filter === cat 
                    ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/20' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
