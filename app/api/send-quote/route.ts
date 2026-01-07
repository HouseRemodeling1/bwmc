import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type } = body;

        // Common variables
        let contactName = "";
        let mobile = "";
        let email = "";
        let businessName = "";
        let businessActivity = "";
        let jurisdiction = "";
        let detailsHTML = "";
        let subject = "";

        // Handle new Calculator Lead Payload
        if (type === "calculator_lead") {
            const {
                activity,
                visaCount,
                jurisdiction: jur,
                lead
            } = body;

            // Validate
            if (!lead?.name || !lead?.whatsapp) {
                return NextResponse.json({ error: "Missing name or whatsapp" }, { status: 400 });
            }

            contactName = lead.name;
            mobile = lead.whatsapp;
            businessActivity = activity;
            jurisdiction = jur || "Not Selected";
            businessName = body.businessName || "Not Provided (Calculator Lead)";
            email = "Not Provided"; // New form doesn't ask for email
            subject = `New Calculator Lead: ${contactName} - ${jurisdiction.toUpperCase()}`;

            detailsHTML = `
                <h3>Calculator Inputs:</h3>
                <ul>
                    <li><strong>Activity:</strong> ${activity}</li>
                    <li><strong>Visa Count:</strong> ${visaCount}</li>
                    <li><strong>Jurisdiction:</strong> ${jurisdiction}</li>
                </ul>
            `;
        } else {
            // Fallback for old payload (if used elsewhere)
            const {
                businessName: bName,
                contactName: cName,
                mobile: mob,
                email: em,
                businessActivity: bAct,
                jurisdiction: jur,
                freezone,
                mainland
            } = body;

            businessName = bName;
            contactName = cName;
            mobile = mob;
            email = em;
            businessActivity = bAct;
            jurisdiction = jur;
            subject = `New Quote Request: ${businessName}`;

            if (jurisdiction === "freezone" && freezone) {
                detailsHTML = `
                    <h3>Free Zone Setup Details:</h3>
                    <ul>
                        <li><strong>Free Zone:</strong> ${freezone.freezone}</li>
                        <li><strong>Office Type:</strong> ${freezone.officeType}</li>
                        <li><strong>Visa Count:</strong> ${freezone.visaCount}</li>
                        <li><strong>Contract Years:</strong> ${freezone.contractYears}</li>
                    </ul>
                `;
            } else if (jurisdiction === "mainland" && mainland) {
                detailsHTML = `
                    <h3>Mainland Setup Details:</h3>
                    <ul>
                        <li><strong>Office Type:</strong> ${mainland.officeType}</li>
                    </ul>
                `;
            }
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
                    subject: subject,
                    html: `
                        <h2>New Lead captured from Website</h2>
                        <h3>Contact Information:</h3>
                        <ul>
                            <li><strong>Name:</strong> ${contactName}</li>
                            <li><strong>WhatsApp:</strong> <a href="https://wa.me/${mobile.replace(/[^0-9]/g, '')}">${mobile}</a></li>
                            ${email !== "Not Provided" ? `<li><strong>Email:</strong> ${email}</li>` : ''}
                            ${businessName !== "Not Provided (Calculator Lead)" ? `<li><strong>Business Name:</strong> ${businessName}</li>` : ''}
                        </ul>
                        
                        ${detailsHTML}
                    `,
                };

                await transporter.sendMail(mailOptions);
                emailSent = true;
                console.log("✅ Email sent successfully to sales@bwmc.ae");
            } catch (emailError) {
                console.error("❌ Email sending failed:", emailError);
            }
        } else {
            console.warn("⚠️ SMTP credentials not configured. Email not sent.");
        }

        // Return success
        return NextResponse.json({
            message: "Lead captured successfully",
            emailSent,
            leadId: `LEAD-${Date.now()}`,
        }, { status: 200 });

    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
