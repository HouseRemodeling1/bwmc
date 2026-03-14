export async function POST(request) {
  try {
    const body = await request.json();

    const webhookUrl = process.env.LEADS_WEBHOOK_URL;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const result = await response.json();

    return Response.json({ success: true, result });

  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
