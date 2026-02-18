"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Fallback data
const initialTestimonials = [
    {
        name: "Fawad Ali",
        role: "Business Owner",
        content: "I want to take a moment to express my heartfelt appreciation for the exceptional services provided by Bridgewater Management Consultancies Co LLC, led by the brilliant Mahesh. Their team's expertise in Audit, Taxation, and Financial Consultancy has been instrumental in guiding my business towards financial clarity and success. Their professionalism, attention to detail, and timely delivery have exceeded my expectations.",
        rating: 5,
        imageSrc: "/images/testimonials/fawad-new.png",
        timeAgo: "a year ago",
        isLocalGuide: false
    },
    {
        name: "Adnan Shehzad",
        role: "Local Guide",
        content: "I am truly grateful to Mr. Mahesh and his team for their outstanding support. They handled my company license and related processes in a very professional and efficient way. Even when the chances of getting my visa were low, they managed to secure it successfully, and today I also have my Emirates ID and a registered company.",
        rating: 5,
        imageSrc: "/images/testimonials/adnan-new.png",
        timeAgo: "4 months ago",
        isLocalGuide: true
    },
    {
        name: "Mansoor Shah",
        role: "CEO",
        content: "Our experience with Bridgewater for Rockwell's company registration process has been nothing short of excellent. From the outset, they demonstrated deep expertise in the field and a clear understanding of local regulations and procedures, ensuring the process moved smoothly and efficiently.",
        rating: 5,
        imageSrc: "/images/testimonials/mansoor-new.png",
        timeAgo: "a year ago",
        isLocalGuide: false
    }
];

const trustLogos = [
    { name: "FTA Approved", badge: "FTA" },
    { name: "Ministry of Economy", badge: "MOE" },
    { name: "IFRS Certified", badge: "IFRS" }
];

interface GoogleReview {
    name: string;
    relativePublishTimeDescription: string;
    rating: number;
    text: {
        text: string;
        languageCode: string;
    };
    originalText: {
        text: string;
        languageCode: string;
    };
    authorAttribution: {
        displayName: string;
        uri: string;
        photoUri: string;
        photoUri?: string;
    };
    publishTime: string;
}

export default function TestimonialsAndTrust() {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch('/api/reviews');
                if (!res.ok) throw new Error('Failed to fetch reviews');
                const data = await res.json();

                if (data.reviews && data.reviews.length > 0) {
                    const formattedReviews = data.reviews.slice(0, 3).map((review: any) => ({
                        name: review.authorAttribution.displayName,
                        role: "Client",
                        content: review.originalText?.text || review.text?.text,
                        rating: review.rating,
                        imageSrc: review.authorAttribution.photoUri,
                        timeAgo: review.relativePublishTimeDescription,
                        isLocalGuide: false
                    }));
                    setTestimonials(formattedReviews);
                }
            } catch (error) {
                console.error("Error loading Google Reviews:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        {/* Google G Logo */}
                        <svg viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        <span className="font-semibold text-gray-700">Google Rating</span>
                        <div className="flex items-center gap-0.5">
                            <span className="font-bold text-gray-900 ml-1">5.0</span>
                            <div className="flex ml-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-navy mb-2">
                        What Our Clients Say
                    </h3>
                    {/* Added Caption */}
                    <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
                        All reviews are from UAE-based clients across Dubai, Abu Dhabi, and the Northern Emirates.
                    </p>


                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-white rounded-lg p-6 shadow-md border border-gray-100 h-full flex flex-col"
                        >
                            {/* Header: User Info */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {/* User Image */}
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={testimonial.imageSrc}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                            unoptimized={testimonial.imageSrc.startsWith('http')}
                                        />
                                    </div>

                                    {/* Name & Local Guide Badge */}
                                    <div>
                                        <div className="font-bold text-sm text-[#202124]">{testimonial.name}</div>
                                        {testimonial.isLocalGuide ? (
                                            <div className="flex items-center gap-1 text-xs text-[#70757a]">
                                                <span>Local Guide</span>
                                                <span>·</span>
                                                <span>25 reviews</span>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-[#70757a]">
                                                {testimonial.role === "Local Guide" ? "Local Guide" :
                                                    "Client"}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Three Dots Menu Icon (Visual) */}
                                <div className="text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Stars & Time */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                                    ))}
                                </div>
                                <span className="text-xs text-[#70757a]">{testimonial.timeAgo}</span>
                            </div>

                            {/* Content */}
                            <p className="text-[#202124] text-sm leading-relaxed line-clamp-6">
                                {testimonial.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* View All Reviews Link */}
                <div className="mb-24 text-center">
                    <a
                        href="https://search.google.com/local/reviews?placeid=ChIJ45KMeQBDXz4RxAHzXOyswLM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-royal-blue hover:text-sky-blue font-medium transition-colors text-sm"
                    >
                        View all reviews on Google
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* Trust Badges - Section 9 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8">
                        Trusted & Certified
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {trustLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-royal-blue to-sky-blue rounded-[4px] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {logo.badge}
                                </div>
                                <span className="text-sm text-navy/60">{logo.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
