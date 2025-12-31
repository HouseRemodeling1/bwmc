"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
    const logos = [
        "https://zorxmedia.com/wp-content/uploads/2025/12/logo-1-scaled-e1766209436341.png",
        "https://synopslabs.com/_next/image?url=%2Ftrart-logo.png&w=3840&q=75",
        "https://fmauditors.com/wp-content/uploads/2024/06/logo-transparent.png",
        "https://zorxmedia.com/wp-content/uploads/2025/12/logo-1-scaled-e1766209436341.png",
        "https://synopslabs.com/_next/image?url=%2Ftrart-logo.png&w=3840&q=75",
        "https://fmauditors.com/wp-content/uploads/2024/06/logo-transparent.png"
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-center text-navy/60 text-sm uppercase tracking-widest mb-8 font-medium">
                        Trusted by Leading Brands
                    </p>

                    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll">
                            {logos.map((logo, index) => (
                                <li key={index}>
                                    <img
                                        src={logo}
                                        alt="Client Logo"
                                        className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                                    />
                                </li>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                            {logos.map((logo, index) => (
                                <li key={`duplicate-${index}`}>
                                    <img
                                        src={logo}
                                        alt="Client Logo"
                                        className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
