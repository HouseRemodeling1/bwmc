export async function POST(request) {
  try {
    const { leadData, reportData } = await request.json();

    const accessToken = await getZohoAccessToken();

    const nameParts = leadData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName  = nameParts.slice(1).join(" ") || ".";

    const zohoLead = {
      data: [
        {
          First_Name:  firstName,
          Last_Name:   lastName,
          Phone:       leadData.phone,
          Company:     leadData.companyName,
          Lead_Source: "FinSight AI Tool",
          Lead_Status: "New",
          Description: buildDescription(reportData),
          FinSight_Health_Score:  String(reportData.healthScore.overall),
          FinSight_Grade:         reportData.executiveSummary.grade,
          FinSight_Recovery_AED:  String(reportData.profitLeakage
                                    .recoveryOpportunity.monthlyAED),
          FinSight_Top_Red_Flag:  reportData.riskAssessment
                                    .redFlags[0]?.title || "",
          FinSight_VAT_Status:    reportData.riskAssessment
                                    .vatExposure.status,
          FinSight_Cash_Runway:   String(reportData.riskAssessment
                                    .cashRunway.months || ""),
          FinSight_Revenue_Range: leadData.revenueRange || "",
        }
      ]
    };

    const zohoResponse = await fetch(
      `${process.env.ZOHO_API_DOMAIN}/crm/v3/Leads`,
      {
        method: "POST",
        headers: {
          "Authorization": `Zoho-oauthtoken ${accessToken}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify(zohoLead),
      }
    );

    const result = await zohoResponse.json();
    console.log("Zoho response:", JSON.stringify(result));

    return Response.json({ success: true, result });

  } catch (error) {
    console.error("Zoho lead error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function getZohoAccessToken() {
  const response = await fetch(
    `https://accounts.zoho.com/oauth/v2/token?` +
    `refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&` +
    `client_id=${process.env.ZOHO_CLIENT_ID}&` +
    `client_secret=${process.env.ZOHO_CLIENT_SECRET}&` +
    `grant_type=refresh_token`,
    { method: "POST" }
  );
  const data = await response.json();
  return data.access_token;
}

function buildDescription(reportData) {
  return `
FINSIGHT AI REPORT
==================
Health Score: ${reportData.healthScore.overall}/100
Grade: ${reportData.executiveSummary.grade}

HEADLINE
${reportData.executiveSummary.headline}

SUMMARY
${reportData.executiveSummary.narrative}

RED FLAGS
${reportData.riskAssessment.redFlags.map((f, i) =>
  `${i+1}. [${f.severity.toUpperCase()}] ${f.title}
   ${f.cfoObservation}
   Action: ${f.immediateAction}`
).join('\n\n')}

PROFIT LEAKAGE
Recovery: AED ${reportData.profitLeakage
  .recoveryOpportunity.monthlyAED.toLocaleString()}/month
${reportData.profitLeakage.narrative}

TOP RECOMMENDATIONS
${reportData.strategicRecommendations.map((r, i) =>
  `${i+1}. ${r.title} — ${r.expectedImpact} (${r.timeframe})`
).join('\n')}

VAT: ${reportData.riskAssessment.vatExposure.status}
Cash Runway: ${reportData.riskAssessment.cashRunway.months} months
Points from perfect: ${reportData.closingStatement.pointsFromPerfect}
  `.trim();
}
