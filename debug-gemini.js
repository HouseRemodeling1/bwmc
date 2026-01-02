const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in process.env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const testModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

    for (const modelName of testModels) {
        try {
            console.log(`Testing with ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("hi");
            console.log(`✅ Success with ${modelName}!`);
            console.log("Response:", result.response.text());
            return; // Stop if success
        } catch (error) {
            console.error(`❌ Failed with ${modelName}:`, error.message);
        }
    }
}

listModels();
