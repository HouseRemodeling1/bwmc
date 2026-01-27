'use client';

import { CheckCircle, Download } from 'lucide-react';

export default function ThankYou() {
    return (
        <div className="text-center space-y-8 py-12">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-navy">Thank You!</h2>
                <p className="text-xl text-gray-600 max-w-lg mx-auto">
                    Our advisory team will contact you with a clear structure and cost overview.
                    Check your LinkedIn and Instagram for useful updates.
                </p>
            </div>

            <div className="pt-8">
                <button className="inline-flex items-center gap-2 bg-royal-blue text-white px-6 py-3 rounded-lg hover:bg-navy transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Download Cost Comparison Guide</span>
                </button>
                <p className="text-sm text-gray-400 mt-2">PDF Guide (Optional)</p>
            </div>
        </div>
    );
}
