'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ProjectHero() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase border rounded-full text-sky-blue border-sky-blue/30 bg-sky-blue/5">
            Showcase
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white">
            <span className="block">BWMC</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-blue to-cyan-400">Portfolio</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 font-medium">
            Discover our collection of high-performance digital solutions, 
            engineered to drive business growth and operational excellence.
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
