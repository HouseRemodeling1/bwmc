// Common UAE business activities for the calculator
export const businessActivities = [
    // Trading
    { value: "general-trading", label: "General Trading", category: "Trading" },
    { value: "ecommerce", label: "E-commerce & Online Retail", category: "Trading" },
    { value: "import-export", label: "Import & Export", category: "Trading" },
    { value: "wholesale", label: "Wholesale Trading", category: "Trading" },
    { value: "retail", label: "Retail Trading", category: "Trading" },

    // Consulting
    { value: "management-consulting", label: "Management Consulting", category: "Consulting" },
    { value: "it-consulting", label: "IT Consulting & Services", category: "Consulting" },
    { value: "marketing-consulting", label: "Marketing & PR Consulting", category: "Consulting" },
    { value: "financial-consulting", label: "Financial Consulting", category: "Consulting" },
    { value: "hr-consulting", label: "HR Consulting & Recruitment", category: "Consulting" },

    // Professional Services
    { value: "accounting", label: "Accounting & Auditing", category: "Professional Services" },
    { value: "legal-services", label: "Legal Services", category: "Professional Services" },
    { value: "engineering", label: "Engineering Services", category: "Professional Services" },
    { value: "architecture", label: "Architecture & Design", category: "Professional Services" },

    // Technology
    { value: "software-development", label: "Software Development", category: "Technology" },
    { value: "web-development", label: "Web Development & Design", category: "Technology" },
    { value: "mobile-apps", label: "Mobile App Development", category: "Technology" },
    { value: "saas", label: "SaaS & Cloud Services", category: "Technology" },
    { value: "cybersecurity", label: "Cybersecurity Services", category: "Technology" },

    // Creative & Media
    { value: "advertising", label: "Advertising & Creative Agency", category: "Creative & Media" },
    { value: "content-creation", label: "Content Creation & Production", category: "Creative & Media" },
    { value: "photography", label: "Photography & Videography", category: "Creative & Media" },
    { value: "graphic-design", label: "Graphic Design", category: "Creative & Media" },
    { value: "media-production", label: "Media Production", category: "Creative & Media" },

    // Education & Training
    { value: "training-center", label: "Training & Education Center", category: "Education" },
    { value: "online-education", label: "Online Education Platform", category: "Education" },
    { value: "coaching", label: "Business Coaching", category: "Education" },

    // Real Estate
    { value: "real-estate-brokerage", label: "Real Estate Brokerage", category: "Real Estate" },
    { value: "property-management", label: "Property Management", category: "Real Estate" },

    // Manufacturing
    { value: "light-manufacturing", label: "Light Manufacturing", category: "Manufacturing" },
    { value: "food-production", label: "Food Production", category: "Manufacturing" },

    // Healthcare
    { value: "healthcare-services", label: "Healthcare Services", category: "Healthcare" },
    { value: "telemedicine", label: "Telemedicine Platform", category: "Healthcare" },

    // Logistics
    { value: "logistics", label: "Logistics & Supply Chain", category: "Logistics" },
    { value: "freight-forwarding", label: "Freight Forwarding", category: "Logistics" },

    // Hospitality
    { value: "restaurant", label: "Restaurant & Food Services", category: "Hospitality" },
    { value: "catering", label: "Catering Services", category: "Hospitality" },

    // Other
    { value: "other", label: "Other (Specify Later)", category: "Other" },
];

// Group activities by category for better UX
export const groupedActivities = businessActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
        acc[activity.category] = [];
    }
    acc[activity.category].push(activity);
    return acc;
}, {} as Record<string, typeof businessActivities>);
