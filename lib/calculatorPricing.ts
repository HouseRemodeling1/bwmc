// Comprehensive pricing data for UAE Freezone Business Setup Calculator
// Updated with Recalculated Linear Model (Jan 2026)

export const FREEZONES = {
    ANC_FZ: 'ANC_FZ',
    AJMAN: 'AJMAN',
    RAKEZ: 'RAKEZ',
    SHAMS: 'SHAMS',
    DMCC: 'DMCC',
    MEYDAN: 'MEYDAN',
    IFZA: 'IFZA',
    SPC: 'SPC'
} as const;

export const OFFICE_TYPES = {
    FREELANCER: 'Freelancer',
    VIRTUAL: 'Virtual Office',
    SERVICED: 'Serviced Office',
    STANDARD: 'Standard Office',
    EXECUTIVE: 'Executive Office'
} as const;

export const LICENSE_TYPES = {
    STANDARD: 'Standard License',
    MEDIA: 'Media License',
    PUBLISHING: 'Publishing License'
} as const;

export const FREEZONE_LICENSE_MAP: Record<string, string[]> = {
    [FREEZONES.ANC_FZ]: [LICENSE_TYPES.STANDARD],
    [FREEZONES.AJMAN]: [LICENSE_TYPES.STANDARD, LICENSE_TYPES.MEDIA], // Assuming Standard covers Freelancer/Commercial
    [FREEZONES.RAKEZ]: [LICENSE_TYPES.STANDARD, LICENSE_TYPES.MEDIA],
    [FREEZONES.SHAMS]: [LICENSE_TYPES.STANDARD, LICENSE_TYPES.MEDIA],
    [FREEZONES.DMCC]: [LICENSE_TYPES.STANDARD],
    [FREEZONES.MEYDAN]: [LICENSE_TYPES.STANDARD, LICENSE_TYPES.MEDIA],
    [FREEZONES.IFZA]: [LICENSE_TYPES.STANDARD],
    [FREEZONES.SPC]: [LICENSE_TYPES.STANDARD, LICENSE_TYPES.PUBLISHING],
};

// CONSTANTS
const VISA_COST_YEARLY = 10000;
const VISA_FEE_YEARLY = 1000; // Medical, ID, etc. per visa
const BASE_FEE_YEARLY = 500; // Fixed base additional fee

// Base License Fees (Per Year)
// Logic: Map Freezone + OfficeType -> Base Price
// If OfficeType not found, use 'default'
const BASE_LICENSE_PRICING: Record<string, Record<string, number>> = {
    [FREEZONES.ANC_FZ]: {
        default: 4888
    },
    [FREEZONES.AJMAN]: {
        [OFFICE_TYPES.FREELANCER]: 6000,
        [OFFICE_TYPES.VIRTUAL]: 5555,
        default: 8500 // Physical/Standard
    },
    [FREEZONES.RAKEZ]: {
        [OFFICE_TYPES.FREELANCER]: 6000, // Biz Saver / Coworking logic
        [OFFICE_TYPES.VIRTUAL]: 6000,    // Biz Saver
        [OFFICE_TYPES.SERVICED]: 10000,
        [OFFICE_TYPES.STANDARD]: 12000,
        [OFFICE_TYPES.EXECUTIVE]: 15000,
        default: 8000 // SME All-Inclusive Coworking fallback
    },
    [FREEZONES.SHAMS]: {
        // Note: SHAMS pricing depends heavily on "Media" vs "Standard" license in the prompt.
        // We will handle license type specific logic in the function or here.
        // Prompt: Media = 5500, Standard = 6000.
        default: 6000
    },
    [FREEZONES.SPC]: {
        // Prompt: Publishing = 5500, Business = 6500.
        default: 6500
    },
    [FREEZONES.DMCC]: {
        default: 2237 // Very low base, high other fees usually, but using prompt value
    },
    [FREEZONES.MEYDAN]: {
        default: 6000
    },
    [FREEZONES.IFZA]: {
        default: 5500
    }
};

// License Type adjustments (Overrides base if applicable)
const LICENSE_SPECIFIC_BASE: Record<string, Record<string, number>> = {
    [FREEZONES.SHAMS]: {
        [LICENSE_TYPES.MEDIA]: 5500,
        [LICENSE_TYPES.STANDARD]: 6000
    },
    [FREEZONES.SPC]: {
        [LICENSE_TYPES.PUBLISHING]: 5500,
        [LICENSE_TYPES.STANDARD]: 6500
    }
};

// Discount rates by contract period
export const MULTI_YEAR_DISCOUNTS: Record<number, number> = {
    1: 0,
    2: 0.02,
    3: 0.03,
    5: 0.05,
    10: 0.10
};

// Helper function to get price
export function getPrice(
    freezone: string,
    officeType: string,
    licenseType: string,
    visaCount: number,
    contractYears: number
): number | null {
    try {
        // 1. Determine Base License Fee per year
        let baseLicense = 0;

        // Check for License-Specific pricing first (e.g. SHAMS Media vs Standard)
        if (LICENSE_SPECIFIC_BASE[freezone] && LICENSE_SPECIFIC_BASE[freezone][licenseType]) {
            baseLicense = LICENSE_SPECIFIC_BASE[freezone][licenseType];
        }
        // Fallback to Office Type pricing
        else if (BASE_LICENSE_PRICING[freezone]) {
            const fzPricing = BASE_LICENSE_PRICING[freezone];
            baseLicense = fzPricing[officeType] || fzPricing['default'] || 0;
        }

        if (baseLicense === 0) return null; // Logic gap or invalid zone

        // 2. Calculate Total for One Year (Base + Visas + Fees)
        // Formula: BaseLicense + (VisaCount * 10000) + (VisaCount * 1000) + 500
        // Combined: BaseLicense + (VisaCount * 11000) + 500

        // SPECIAL CASE: 0 Visa might just be Base + 500?
        // Prompt: "0 Visas ... Additional Fees 500"
        // Prompt: "1 Visa ... Additional Fees 1500" (which is 500 + 1000)
        // So formula holds: 500 + (VisaCount * 1000)
        const additionalFees = BASE_FEE_YEARLY + (visaCount * VISA_FEE_YEARLY);
        const visaCosts = visaCount * VISA_COST_YEARLY;

        const oneYearTotal = baseLicense + visaCosts + additionalFees;

        // 3. Multiply by Years
        const rawTotal = oneYearTotal * contractYears;

        // 4. Apply Discount
        // Note: Discount is on TOTAL or just License?
        // Prompt: "Discounts: Applied to total cost"
        const discountRate = MULTI_YEAR_DISCOUNTS[contractYears] || 0;
        const finalPrice = rawTotal * (1 - discountRate);

        return Math.round(finalPrice);

    } catch (e) {
        console.error("Pricing calculation error", e);
        return null;
    }
}
