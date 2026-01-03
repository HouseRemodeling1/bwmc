import BusinessCalculator from "@/components/BusinessCalculator";
import { Calculator } from "lucide-react";
import { calculatorMetadata } from "@/lib/metadata";

export const metadata = calculatorMetadata;

export default function CalculatorPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-navy py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full mb-6">
                        <Calculator className="w-5 h-5 text-sky-blue" />
                        <span className="text-white font-semibold text-sm">FREE COST ESTIMATOR</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Business Setup Cost Calculator
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Get instant pricing estimates for setting up your business in UAE freezones.
                        Compare costs across different jurisdictions and find the best option for your needs.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <BusinessCalculator />
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 px-6 lg:px-8 bg-neutral">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy mb-8 text-center">What's Included?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-[4px] border border-gray-100">
                            <h3 className="font-bold text-navy mb-3">Business License</h3>
                            <p className="text-navy/70 text-sm">
                                Complete trade license registration with your chosen freezone authority including all government fees.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-[4px] border border-gray-100">
                            <h3 className="font-bold text-navy mb-3">Visa Processing</h3>
                            <p className="text-navy/70 text-sm">
                                Entry permits, medical tests, Emirates ID, and residence visa stamping for selected number of visas.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-[4px] border border-gray-100">
                            <h3 className="font-bold text-navy mb-3">Office Space</h3>
                            <p className="text-navy/70 text-sm">
                                Lease agreement for virtual, coworking, serviced, or physical office based on your selection.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-royal-blue/10 border border-royal-blue/20 p-6 rounded-[4px]">
                        <h3 className="font-bold text-navy mb-2">Important Notes</h3>
                        <ul className="space-y-2 text-sm text-navy/70">
                            <li>• Health insurance is mandatory but charged separately</li>
                            <li>• Multi-year contracts receive automatic discounts (2%-10%)</li>
                            <li>• Additional activities and shareholders may incur extra fees</li>
                            <li>• Prices are subject to change - contact us for final confirmation</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
