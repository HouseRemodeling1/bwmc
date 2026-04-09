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
    <section id="projects-grid" className="py-24 bg-portfolio-bg">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-portfolio-text-primary tracking-tight">
              Our <span className="text-portfolio-accent">Portfolio</span>
            </h2>
            <p className="text-portfolio-text-secondary max-w-xl text-lg font-medium">
              A showcase of our high-performance digital projects and engineering excellence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all capitalize tracking-widest border ${
                  filter === cat 
                    ? 'bg-portfolio-accent text-portfolio-bg border-portfolio-accent shadow-lg shadow-portfolio-accent/20' 
                    : 'bg-transparent text-portfolio-text-primary border-portfolio-border hover:border-portfolio-accent/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-6"
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
