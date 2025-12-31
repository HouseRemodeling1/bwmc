const apiKey = "AIzaSyBdZ-73DP8cgOVf_xRoRySNWp_EmHrcMe4";
const placeId = "ChIJ45KMeQBDXz4RxAHzXOyswLM";
const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`;

async function testFetch() {
    console.log("Fetching URL:", url);
    try {
        const response = await fetch(url);
        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response:", text);
    } catch (error) {
        console.error("Error:", error);
    }
}

testFetch();
