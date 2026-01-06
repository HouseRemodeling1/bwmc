import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            businessName,
            contactName,
            mobile,
            email,
            businessActivity,
            jurisdiction,
            freezone,
            mainland
        } = body;

        // Validate required fields
        if (!businessName || !contactName || !mobile || !email || !businessActivity || !jurisdiction) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Build quote details HTML based on jurisdiction
        let quoteDetailsHTML = "";
        if (jurisdiction === "freezone" && freezone) {
            quoteDetailsHTML = `
                <h3>Free Zone Setup Details:</h3>
                <ul>
                    <li><strong>Free Zone:</strong> ${freezone.freezone}</li>
                    <li><strong>Office Type:</strong> ${freezone.officeType}</li>
                    <li><strong>Visa Count:</strong> ${freezone.visaCount}</li>
                    <li><strong>Contract Years:</strong> ${freezone.contractYears}</li>
                    ${freezone.calculatedPrice ? `<li><strong>Calculated Price (Internal):</strong> <span style="background-color: yellow; padding: 2px 6px;">AED ${freezone.calculatedPrice.toLocaleString()}</span></li>` : ''}
                    <li><em>Note: User was shown "Starting from AED 4,888" - actual price above</em></li>
                </ul>
            `;
        } else if (jurisdiction === "mainland" && mainland) {
            quoteDetailsHTML = `
                <h3>Mainland Setup Details:</h3>
                <ul>
                    <li><strong>Office Type:</strong> ${mainland.officeType}</li>
                    <li><strong>Estimated License Fee:</strong> AED ${mainland.estimatedLicenseFee ? mainland.estimatedLicenseFee.toLocaleString() : 'N/A'}</li>
                    <li><strong>Note:</strong> DED fees subject to specific activity approval</li>
                </ul>
            `;
        }

        // Try to send email if SMTP is configured
        let emailSent = false;
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || "smtp.gmail.com",
                    port: Number(process.env.SMTP_PORT) || 465,
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });

                const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: "sales@bwmc.ae",
                    subject: `New Calculator Quote: ${businessName} - ${jurisdiction.toUpperCase()}`,
                    html: `
                        <h2>New Business Setup Quote Request</h2>
                        <h3>Contact Information:</h3>
                        <ul>
                            <li><strong>Business Name:</strong> ${businessName}</li>
                            <li><strong>Contact Name:</strong> ${contactName}</li>
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Mobile (WhatsApp):</strong> ${mobile}</li>
                        </ul>
                        
                        <h3>Business Requirements:</h3>
                        <ul>
                            <li><strong>Business Activity:</strong> ${businessActivity}</li>
                            <li><strong>Jurisdiction:</strong> ${jurisdiction === "freezone" ? "Free Zone" : "Mainland (Dubai DED)"}</li>
                        </ul>
                        
                        ${quoteDetailsHTML}
                    `,
                };

                await transporter.sendMail(mailOptions);
                emailSent = true;
                console.log("✅ Email sent successfully to sales@bwmc.ae");
            } catch (emailError) {
                console.error("❌ Email sending failed:", emailError);
                // Continue to fallback storage
            }
        } else {
            console.warn("⚠️ SMTP credentials not configured. Email not sent.");
        }

        // Store lead data as fallback (always store, regardless of email status)
        const leadData = {
            timestamp: new Date().toISOString(),
            businessName,
            contactName,
            mobile,
            email,
            businessActivity,
            jurisdiction,
            ...(jurisdiction === "freezone" ? { freezone } : { mainland }),
            emailSent,
        };

        console.log("📝 Lead captured:", JSON.stringify(leadData, null, 2));

        // Return success (lead is captured even if email failed)
        return NextResponse.json({
            message: "Quote request received successfully",
            emailSent,
            leadId: `LEAD-${Date.now()}`,
        }, { status: 200 });

    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            {
                error: "Failed to process quote request",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

