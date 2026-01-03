import { getServiceContent, serviceContent } from "@/lib/serviceContent";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { servicesMetadata } from "@/lib/metadata";
import { generateServiceSchema } from "@/lib/schema";

export const metadata = servicesMetadata;

export default function ServicesPage() {
    // Filter out the 'default' key and get all services as an array
    const services = Object.entries(serviceContent)
        .filter(([slug]) => slug !== "default")
        .map(([slug, content]) => ({
            slug,
            ...content
        }));

    // Generate Service schemas for all services
    const serviceSchemas = services.map(service =>
        generateServiceSchema({
            name: service.title,
            description: service.subtitle,
            provider: "BWMC",
            areaServed: "United Arab Emirates",
            serviceType: service.title,
            url: `https://bwmc.ae/services/${service.slug}`
        })
    );

    return (
        <>
            {/* Service Schemas */}
            {serviceSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="bg-navy relative overflow-hidden py-24 px-6 lg:px-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-royal-blue/20 to-sky-blue/10" />
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-sky-blue">Services</span>
                        </div>

                        <div className="max-w-3xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <LayoutGrid className="w-12 h-12 text-sky-blue" />
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                    Our Services
                                </h1>
                            </div>
                            <p className="text-xl md:text-2xl text-neutral/90 leading-relaxed">
                                Comprehensive financial, auditing, and business consultancy solutions tailored for your growth in the UAE market.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-24 px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={`/services/${service.slug}`}
                                    className="group bg-zinc-50 hover:bg-white border border-gray-200 hover:border-royal-blue/30 rounded-[4px] p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-navy group-hover:text-royal-blue transition-colors mb-2">
                                            {service.title}
                                        </h3>
                                        <div className="h-1 w-12 bg-sky-blue rounded-full group-hover:w-20 transition-all duration-300" />
                                    </div>

                                    <p className="text-navy/70 mb-8 leading-relaxed flex-grow">
                                        {service.subtitle}
                                    </p>

                                    <div className="flex items-center gap-2 text-royal-blue font-semibold group-hover:text-sky-blue transition-colors mt-auto">
                                        Learn More
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-20 text-center bg-navy rounded-[4px] p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-royal-blue/20" />
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-6">Need a Custom Solution?</h2>
                                <p className="text-white/80 mb-8 text-lg">
                                    Not sure which service fits your needs? Our experts are here to guide you through a tailored consultation.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-sky-blue hover:bg-royal-blue text-white px-8 py-4 rounded-[4px] font-semibold transition-all shadow-lg hover:translate-y-[-2px]"
                                >
                                    Book a Free Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
