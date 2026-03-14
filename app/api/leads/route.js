export async function POST(request) {
  try {
    const { leadData, reportData } = await request.json();

    // Zoho Web-to-Lead IDs (using same logic as lib/zoho.ts)
    const PID1 = "4d98b7d5df064fa9d055f0904ebcf9de445815041780cebce4af9522abcf10ac";
    const PID2 = "5fa5d3a7a6ad2379c6db240af4164bbc0d3f014b47d579b3a5993fb433654ec4973758679de988d71d0087d9a935e35b";

    const ZOHO_ID_1 = process.env.ZOHO_ID_1 || PID1;
    const ZOHO_ID_2 = process.env.ZOHO_ID_2 || PID2;

    const nameParts = leadData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName  = nameParts.slice(1).join(" ") || ".";

    const formData = new URLSearchParams();
    
    // Zoho Hidden Fields
    formData.append("xnQsjsdp", ZOHO_ID_1);
    formData.append("xmIwtLD", ZOHO_ID_2);
    formData.append("actionType", "TGVhZHM=");
    formData.append("returnURL", "null");

    // Standard Fields
    formData.append("First Name", firstName);
    formData.append("Last Name", lastName);
    formData.append("Phone", leadData.phone);
    formData.append("Company", leadData.companyName || "Individual");
    formData.append("Lead Source", "FinSight AI Tool");
    formData.append("Description", buildDescription(reportData));

    // Custom FinSight Fields (Using exact API names confirmed by user)
    formData.append("FinSight_Health_Score", String(reportData?.healthScore?.overall || ""));
    formData.append("FinSight_Grade", reportData?.executiveSummary?.grade || "");
    formData.append("FinSight_Recovery_AED", String(reportData?.profitLeakage?.recoveryOpportunity?.monthlyAED || ""));
    formData.append("FinSight_Top_Red_Flag", reportData?.riskAssessment?.redFlags?.[0]?.title || "");
    formData.append("FinSight_VAT_Status", reportData?.riskAssessment?.vatExposure?.status || "");
    formData.append("FinSight_Cash_Runway", String(reportData?.riskAssessment?.cashRunway?.months || ""));
    formData.append("FinSight_Revenue_Range", leadData.revenueRange || "");

    const zohoResponse = await fetch("https://crm.zoho.com/crm/WebToLeadForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    console.log("Zoho Web-to-Lead Status:", zohoResponse.status);

    return Response.json({ success: true, status: zohoResponse.status });

  } catch (error) {
    console.error("Zoho Web-to-Lead Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function buildDescription(reportData) {
  try {
    return `
FINSIGHT AI REPORT
==================
Health Score: ${reportData?.healthScore?.overall ?? "N/A"}/100
Grade: ${reportData?.executiveSummary?.grade ?? "N/A"}

HEADLINE
${reportData?.executiveSummary?.headline ?? "No headline"}

SUMMARY
${reportData?.executiveSummary?.narrative ?? "No summary"}

RED FLAGS
${(reportData?.riskAssessment?.redFlags || []).map((f, i) =>
  `${i+1}. [${f?.severity?.toUpperCase() ?? "WATCH"}] ${f?.title ?? "Unknown Risk"}
   ${f?.cfoObservation ?? ""}
   Action: ${f?.immediateAction ?? ""}`
).join('\n\n')}

PROFIT LEAKAGE
Recovery: AED ${reportData?.profitLeakage?.recoveryOpportunity?.monthlyAED?.toLocaleString() ?? "0"}/month
${reportData?.profitLeakage?.narrative ?? ""}

TOP RECOMMENDATIONS
${(reportData?.strategicRecommendations || []).map((r, i) =>
  `${i+1}. ${r?.title ?? ""} — ${r?.expectedImpact ?? ""} (${r?.timeframe ?? ""})`
).join('\n')}

VAT: ${reportData?.riskAssessment?.vatExposure?.status ?? "Unknown"}
Cash Runway: ${reportData?.riskAssessment?.cashRunway?.months ?? "Unknown"} months
Points from perfect: ${reportData?.closingStatement?.pointsFromPerfect ?? "N/A"}
    `.trim();
  } catch (err) {
    return "Error generating report summary.";
  }
}
