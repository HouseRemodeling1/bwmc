const apiKey = "AIzaSyAtH5y0Y6H9pvfd10GbWkOTnbSyY_sB9xQ";

async function checkModels() {
    console.log("Checking available models for your API key...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
            return;
        }

        console.log("Available Models:");
        data.models.forEach(m => {
            console.log(`- ${m.name} (Supports: ${m.supportedGenerationMethods.join(", ")})`);
        });
    } catch (err) {
        console.error("Fetch Error:", err.message);
    }
}

checkModels();
