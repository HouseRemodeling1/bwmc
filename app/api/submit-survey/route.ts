import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { submitToZoho } from "@/lib/zoho";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { contact, ...surveyAnswers } = body;

        // Basic Validation
        if (!contact?.name || !contact?.phone) {
            return NextResponse.json(
                { error: "Missing required contact fields" },
                { status: 400 }
            );
        }

        // Prepare Data for Zoho / Email
        const contactName = contact.name;
        const mobile = contact.phone;
        const email = contact.email || "Not Provided";

        // Format Survey Answers for Description
        let description = "Source: Outdoor Survey (Website)\n\nSurvey Answers:\n";
        for (const [key, value] of Object.entries(surveyAnswers)) {
            if (key !== 'contact') {
                // Format key to be more readable
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                const val = Array.isArray(value) ? value.join(', ') : value;
                description += `${label}: ${val}\n`;
            }
        }

        // --- PARALLEL SUBMISSION ---
        // Split name for Zoho (Simple split)
        const nameParts = contactName.trim().split(" ");
        const lastName = nameParts.length > 1 ? nameParts.pop() || "Lead" : nameParts[0] || "Lead";
        const firstName = nameParts.join(" ");

        const zohoTask = submitToZoho({
            firstName,
            lastName,
            email: email === "Not Provided" ? "" : email,
            mobile,
            company: "Individual (Survey Lead)",
            description: description,
            interestedServices: ["Business Setup Services"]
        }).catch(err => {
            console.error("❌ Zoho Task Failed:", err);
            return false;
        });

        let emailSent = false;
        const emailTask = (async () => {
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
                        to: "fazil4fazi@gmail.com",
                        subject: `New Survey Lead: ${contactName}`,
                        html: `
                            <h2>New Survey Lead Captured</h2>
                            <h3>Contact Details:</h3>
                            <ul>
                                <li><strong>Name:</strong> ${contactName}</li>
                                <li><strong>Phone:</strong> <a href="https://wa.me/${mobile.replace(/[^0-9]/g, '')}">${mobile}</a></li>
                                <li><strong>Email:</strong> ${email}</li>
                            </ul>
                            <hr />
                            <h3>Survey Responses:</h3>
                            <pre style="font-family: sans-serif; white-space: pre-wrap;">${description}</pre>
                            <hr />
                            <p style="color: grey; font-size: 10px;">Submitted to Zoho CRM automatically.</p>
                        `,
                    };

                    await transporter.sendMail(mailOptions);
                    console.log("✅ Survey email sent successfully");
                    return true;
                } catch (emailError) {
                    console.error("❌ Survey email sending failed:", emailError);
                    return false;
                }
            }
            return false;
        })();

        const [zohoResult, emailResult] = await Promise.all([zohoTask, emailTask]);

        emailSent = emailResult;
        const zohoSubmitted = zohoResult;

        return NextResponse.json({
            message: "Survey submitted successfully",
            emailSent,
            zohoSubmitted: true
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Survey Submission Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
