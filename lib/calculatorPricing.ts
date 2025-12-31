// Comprehensive pricing data for UAE Freezone Business Setup Calculator

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

// ANC FZ Pricing
export const ANC_FZ_PRICING = {
    packages: [
        { visas: 0, price: 4888, renewal: 4888 },
        { visas: 1, price: 12000, renewal: 11000 },
        { visas: 2, price: 18000, renewal: 15500 },
        { visas: 3, price: 23000, renewal: 19500 },
        { visas: 4, price: 28000, renewal: 23500 },
        { visas: 5, price: 33000, renewal: 27500 },
        { visas: 6, price: 38000, renewal: 31500 },
        { visas: 7, price: 43000, renewal: 35500 }
    ]
};

// AJMAN Pricing
export const AJMAN_PRICING = {
    freelancer: [
        { visas: 0, price: 6000 },
        { visas: 1, price: 12121 }
    ],
    virtualOffice: [
        { visas: 0, price: 5555 },
        { visas: 1, price: 13131 },
        { visas: 2, price: 17171 },
        { visas: 3, price: 21212 },
        { visas: 4, price: 24242 }
    ],
    physicalOffice: [
        { visas: 1, price: 21750 },
        { visas: 2, price: 24750 },
        { visas: 3, price: 29750 },
        { visas: 4, price: 35500 }
    ]
};

// RAKEZ Pricing - Biz Saver (Coworking)
export const RAKEZ_BIZ_SAVER = {
    0: { 1: 6000, 2: 10800, 3: 15300, 5: 25500, 10: 51000 },
    1: { 1: 12000, 2: 22800, 3: 32400, 5: 51000, 10: 90000 },
    2: { 1: 18000, 2: 34200, 3: 48600, 5: 76500, 10: 135000 },
    3: { 1: 22000, 2: 41800, 3: 59400, 5: 93500, 10: 165000 },
    4: { 1: 26000, 2: 49400, 3: 70200, 5: 110500, 10: 195000 }
};

// RAKEZ SME Serviced Office
export const RAKEZ_SME_SERVICED = {
    1: { 1: 20500, 2: 38950, 3: 55350, 5: 87125, 10: 153750 },
    2: { 1: 24500, 2: 46550, 3: 66150, 5: 104125, 10: 183750 }
};

// RAKEZ SME Standard Office
export const RAKEZ_SME_STANDARD = {
    1: { 1: 27000, 2: 51300, 3: 72900, 5: 114750, 10: 202500 },
    2: { 1: 31000, 2: 58900, 3: 83700, 5: 131750, 10: 232500 }
};

// SHAMS Pricing
export const SHAMS_STANDARD = [
    { visas: 0, price: 6875 },
    { visas: 1, price: 8475 },
    { visas: 2, price: 10075 },
    { visas: 3, price: 11675 },
    { visas: 4, price: 13275 },
    { visas: 5, price: 14875 },
    { visas: 6, price: 16475 },
    { visas: 7, price: 18075 },
    { visas: 8, price: 19675 },
    { visas: 9, price: 21275 },
    { visas: 10, price: 22875 }
];

export const SHAMS_MEDIA = [
    { visas: 0, price: 5750 },
    { visas: 1, price: 7350 },
    { visas: 2, price: 8950 },
    { visas: 3, price: 10550 },
    { visas: 4, price: 12150 },
    { visas: 5, price: 13750 },
    { visas: 6, price: 15350 },
    { visas: 7, price: 16950 },
    { visas: 8, price: 18550 },
    { visas: 9, price: 20150 },
    { visas: 10, price: 21750 }
];

// SPC Pricing
export const SPC_BUSINESS = {
    0: { 1: 6875, 2: 13475, 3: 20006, 5: 32656, 10: 61875 },
    1: { 1: 8475, 2: 16611, 3: 24662, 5: 40256, 10: 76275 },
    2: { 1: 10075, 2: 19747, 3: 29318, 5: 47856, 10: 90675 },
    3: { 1: 11675, 2: 22883, 3: 33974, 5: 55456, 10: 105075 },
    4: { 1: 13275, 2: 26019, 3: 38630, 5: 63056, 10: 119475 },
    5: { 1: 14875, 2: 29155, 3: 43286, 5: 70656, 10: 133875 }
};

export const SPC_PUBLISHING = {
    0: { 1: 5750, 2: 11270, 3: 16733, 5: 27313, 10: 51750 },
    1: { 1: 7350, 2: 14406, 3: 21389, 5: 34913, 10: 66150 },
    2: { 1: 8950, 2: 17542, 3: 26045, 5: 42513, 10: 80550 },
    3: { 1: 10550, 2: 20678, 3: 30701, 5: 50113, 10: 94950 },
    4: { 1: 12150, 2: 23814, 3: 35357, 5: 57713, 10: 109350 },
    5: { 1: 13750, 2: 26950, 3: 40013, 5: 65313, 10: 123750 }
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
        switch (freezone) {
            case FREEZONES.ANC_FZ:
                const ancPackage = ANC_FZ_PRICING.packages.find(p => p.visas === visaCount);
                return ancPackage ? ancPackage.price : null;

            case FREEZONES.AJMAN:
                if (officeType === "Freelancer") {
                    const ajFreelancer = AJMAN_PRICING.freelancer.find(p => p.visas === visaCount);
                    return ajFreelancer ? ajFreelancer.price : null;
                } else if (officeType === "Virtual Office") {
                    const ajVirtual = AJMAN_PRICING.virtualOffice.find(p => p.visas === visaCount);
                    return ajVirtual ? ajVirtual.price : null;
                } else if (officeType === "Standard Office") {
                    const ajPhysical = AJMAN_PRICING.physicalOffice.find(p => p.visas === visaCount);
                    return ajPhysical ? ajPhysical.price : null;
                }
                return null;

            case FREEZONES.RAKEZ:
                if (officeType === "Virtual Office" && visaCount <= 4) {
                    return RAKEZ_BIZ_SAVER[visaCount as keyof typeof RAKEZ_BIZ_SAVER]?.[contractYears as keyof typeof RAKEZ_BIZ_SAVER[0]] || null;
                } else if (officeType === "Serviced Office" && visaCount <= 2) {
                    return RAKEZ_SME_SERVICED[visaCount as keyof typeof RAKEZ_SME_SERVICED]?.[contractYears as keyof typeof RAKEZ_SME_SERVICED[1]] || null;
                } else if (officeType === "Standard Office" && visaCount <= 2) {
                    return RAKEZ_SME_STANDARD[visaCount as keyof typeof RAKEZ_SME_STANDARD]?.[contractYears as keyof typeof RAKEZ_SME_STANDARD[1]] || null;
                }
                return null;

            case FREEZONES.SHAMS:
                const shamsData = licenseType === "Media License" ? SHAMS_MEDIA : SHAMS_STANDARD;
                const shamsPackage = shamsData.find(p => p.visas === visaCount);
                if (!shamsPackage) return null;
                const discount = MULTI_YEAR_DISCOUNTS[contractYears] || 0;
                return shamsPackage.price * contractYears * (1 - discount);

            case FREEZONES.SPC:
                const spcData = licenseType === "Publishing License" ? SPC_PUBLISHING : SPC_BUSINESS;
                const basePrice = spcData[visaCount as keyof typeof spcData]?.[contractYears as keyof typeof spcData[0]];
                return basePrice || null;

            default:
                return null;
        }
    } catch {
        return null;
    }
}
