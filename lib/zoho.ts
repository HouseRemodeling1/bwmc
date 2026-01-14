export async function submitToZoho(data: {
    firstName?: string; // Optional
    lastName: string;   // Required
    email?: string;
    mobile: string;
    company?: string;
    description?: string;
    interestedServices?: string[];
}) {
    const ZOHO_ACTION_URL = "https://crm.zoho.com/crm/WebToLeadForm";
    const ZOHO_ID_1 = process.env.ZOHO_ID_1;
    const ZOHO_ID_2 = process.env.ZOHO_ID_2;

    if (!ZOHO_ID_1 || !ZOHO_ID_2) {
        console.error("❌ Zoho Integration: Missing environment variables (ZOHO_ID_1, ZOHO_ID_2)");
        return false;
    }

    const formData = new FormData();

    // Zoho Hidden Fields
    formData.append("xnQsjsdp", ZOHO_ID_1);
    formData.append("xmIwtLD", ZOHO_ID_2);
    formData.append("actionType", "TGVhZHM=");
    formData.append("returnURL", "null"); // We handle redirect/success in frontend

    // Mapped Fields
    formData.append("Company", data.company || "Individual");
    formData.append("First Name", data.firstName || "");
    formData.append("Last Name", data.lastName);
    formData.append("Email", data.email || "");
    formData.append("Mobile", data.mobile);
    formData.append("Description", data.description || "");

    // Interested Services (Multi-select)
    if (data.interestedServices && data.interestedServices.length > 0) {
        data.interestedServices.forEach(service => {
            formData.append("LEADCF1", service);
        });
    } else {
        formData.append("LEADCF1", "Business Setup Services"); // Default
    }

    try {
        const response = await fetch(ZOHO_ACTION_URL, {
            method: "POST",
            body: formData,
        });

        // Zoho returns a 302 redirect on success usually, but since we are server-side fetching, 
        // we might get the HTML of the redirect or the page. 
        // If it didn't crash, it likely submitted. 
        // Note: fetch() follows redirects by default.

        if (response.ok) {
            console.log("✅ Zoho Lead Submitted Successfully for:", data.lastName);
            return true;
        } else {
            console.error("❌ Zoho Submission Failed Status:", response.status);
            const text = await response.text();
            console.error("Response:", text);
            return false;
        }
    } catch (error) {
        console.error("❌ Zoho Submission Error:", error);
        return false;
    }
}
