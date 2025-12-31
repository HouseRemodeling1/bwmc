import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = "AIzaSyBdZ-73DP8cgOVf_xRoRySNWp_EmHrcMe4";
    const placeId = "ChIJ45KMeQBDXz4RxAHzXOyswLM";
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch reviews" }, { status: response.status });
        }
        const data = await response.json();

        // Filter for 5-star reviews
        const reviews = data.reviews || [];
        const fiveStarReviews = reviews.filter((review: any) => review.rating === 5);

        return NextResponse.json({
            reviews: fiveStarReviews,
            rating: data.rating,
            userRatingCount: data.userRatingCount
        });

    } catch (error) {
        console.error("Error fetching Google Reviews:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
