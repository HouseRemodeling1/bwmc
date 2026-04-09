'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ProjectHero() {
  return (
    <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-portfolio-bg">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-portfolio-accent/5 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-portfolio-accent/5 rounded-full blur-[160px] animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.3em] uppercase border rounded-full text-portfolio-accent border-portfolio-accent/30 bg-portfolio-accent/5">
            Engineering & Success
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-portfolio-text-primary leading-[0.9]">
            Our <span className="text-portfolio-accent">Portfolio</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-portfolio-text-secondary mb-12 font-medium tracking-tight">
            Strategic digital solutions designed for impact, scalability, and technical excellence.
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-portfolio-text-muted"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
