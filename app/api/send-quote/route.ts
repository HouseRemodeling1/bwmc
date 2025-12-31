import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, quoteDetails } = body;

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

        const mailOptions = {
            from: process.env.SMTP_USER, // Sender address
            to: "sales@bwmc.ae", // Receiver address
            subject: `New Calculator Quote: ${name}`,
            html: `
                <h2>New Business Setup Quote Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                
                <h3>Quote Details:</h3>
                <ul>
                    <li><strong>Freezone:</strong> ${quoteDetails.freezone}</li>
                    <li><strong>Office Type:</strong> ${quoteDetails.officeType}</li>
                    <li><strong>License Type:</strong> ${quoteDetails.licenseType}</li>
                    <li><strong>Visa Count:</strong> ${quoteDetails.visaCount}</li>
                    <li><strong>Contract Years:</strong> ${quoteDetails.contractYears}</li>
                    <li><strong>Total Estimated Cost:</strong> AED ${quoteDetails.price.toLocaleString()}</li>
                </ul>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
