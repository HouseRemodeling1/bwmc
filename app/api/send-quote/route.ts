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

        // Create a transporter using SMTP
        // For production, these should be environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com", // Default fallback (likely needs updating)
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

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

        const mailOptions = {
            from: process.env.SMTP_USER, // Sender address
            to: "sales@bwmc.ae", // Receiver address
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

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
