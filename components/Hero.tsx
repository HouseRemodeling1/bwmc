"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {


  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-royal-blue/40 z-10" />
        {/* Abstract geometric shapes or low-opacity business image could go here */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            UAE’s Trusted Experts in <br />
            <span className="text-sky-blue">Financial Management</span> <br />
            and Business Setup
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Whether you’re launching a new venture or optimizing an established business,
            BWMC delivers tailored financial services, expert business setup support,
            and scalable ERP solutions all under one roof.
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="https://www.zoho.com/books/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-royal-blue hover:bg-sky-blue text-white px-8 py-4 rounded-[4px] text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl inline-flex items-center gap-2 min-w-[200px] justify-center"
            >
              Open Zoho Books
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-[4px] text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 min-w-[200px] justify-center"
            >
              Explore Services
            </Link>
          </motion.div>





        </motion.div>
      </div>
    </section>
  );
}
