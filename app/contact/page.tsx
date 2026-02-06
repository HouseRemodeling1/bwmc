import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { contactMetadata } from '@/lib/metadata';
import { generateLocalBusinessSchema } from '@/lib/schema';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = contactMetadata;

export default function ContactPage() {
    const localBusinessSchema = generateLocalBusinessSchema({
        name: "Bridgewater Management Consultancies (BWMC)",
        description: "Leading business consultancy and financial services provider in Dubai, UAE.",
        url: "https://bwmc.ae/contact",
        logo: "https://bwmc.ae/images/bwmc-logo-new.png",
        telephone: "+971 4 548 8184",
        email: "sales@bwmc.com",
        address: {
            streetAddress: "Emarat Atrium 1st Floor, Unit 147, Sheikh Zayed Rd",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            postalCode: "00000",
            addressCountry: "AE"
        },
        geo: {
            latitude: "25.1891339",
            longitude: "55.2535588"
        }
    });

    return (
        <main className="min-h-screen bg-neutral-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-navy text-white overflow-hidden flex items-center justify-center min-h-[40vh]">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-royal-blue/20 to-sky-blue/10" />
                <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
                    <h2 className="text-2xl md:text-3xl text-white/90 font-light mb-6">Connect with Our Team of Experts</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80 leading-relaxed">
                        Contact our team of excellence-driven experts today to bring your project to life. <br className="hidden md:block" />
                        We Provide excellent Audit & Financial Services in UAE.
                    </p>
                </div>
            </section>

            {/* Contact Info & Map Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Details */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                                <h3 className="text-2xl font-bold text-navy mb-6">Get In Touch</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-royal-blue">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy mb-1">Visit Us</h4>
                                            <p className="text-black leading-relaxed">
                                                Emarat Atrium 1st Floor, Unit 147<br />
                                                Sheikh Zayed Rd, Dubai<br />
                                                United Arab Emirates
                                            </p>
                                            <a
                                                href="https://www.google.com/maps/place/Bridgewater+Management+Consultancies+Co+LLC/@25.1891339,55.2535588,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f4300798c92e3:0xb3c0acec5cf301c4!8m2!3d25.1891291!4d55.2561337!16s%2Fg%2F11y7q3f32l?entry=ttu"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sky-blue mt-2 hover:text-royal-blue transition-colors font-medium"
                                            >
                                                Get Directions <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-royal-blue">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy mb-1">Call Us</h4>
                                            <a href="tel:+97145488184" className="text-black hover:text-royal-blue transition-colors">
                                                +971 4 548 8184
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-royal-blue">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy mb-1">Email Us</h4>
                                            <a href="mailto:sales@bwmc.com" className="text-black hover:text-royal-blue transition-colors">
                                                sales@bwmc.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-royal-blue">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy mb-1">Working Hours</h4>
                                            <p className="text-black">
                                                Mon - Fri: 8:00 am - 7:00 pm
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="h-full">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section - Full Width */}
            <section className="pb-20 px-4 md:px-6">
                <div className="container mx-auto">
                    <div className="h-[450px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.176469688538!2d55.25355877605481!3d25.189133877717013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4300798c92e3%3A0xb3c0acec5cf301c4!2sBridgewater%20Management%20Consultancies%20Co%20LLC!5e0!3m2!1sen!2sae!4v1709633000000!5m2!1sen!2sae"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}

