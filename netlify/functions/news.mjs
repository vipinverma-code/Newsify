
export default async (request) => {
  // This function only handles GET requests
  if (request.method !== "GET") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Read the secret from Netlify's server environment
    const apiKey = process.env.GUARDIAN_API_KEY;

    if (!apiKey) {
      console.error("GUARDIAN_API_KEY is missing");

      return Response.json(
        { error: "Server API configuration is missing" },
        { status: 500 }
      );
    }

    const requestUrl = new URL(request.url);
    const section = requestUrl.searchParams.get("section");

    // Only allow the categories used by your Navbar
    const allowedSections = [
      "technology",
      "business",
      "health",
      "science",
      "sport",
      "culture"
    ];

    if (section && !allowedSections.includes(section)) {
      return Response.json(
        { error: "Invalid news category" },
        { status: 400 }
      );
    }

    // Build Guardian API parameters
    const params = new URLSearchParams({
      "api-key": apiKey,
      "show-fields": "thumbnail,trailText",
      "page-size": "20",
      "order-by": "newest"
    });

    // General news has no section filter
    if (section) {
      params.set("section", section);
    }

    const guardianUrl =
      `https://content.guardianapis.com/search?${params.toString()}`;

    const guardianResponse = await fetch(guardianUrl);

    const data = await guardianResponse.json();

    // Handle Guardian API errors
    if (!guardianResponse.ok) {
      console.error(
        "Guardian API returned:",
        guardianResponse.status,
        data
      );

      return Response.json(
        { error: "Guardian API request failed" },
        { status: guardianResponse.status }
      );
    }

    // Return news articles to React
    return Response.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60"
      }
    });

  } catch (error) {
    console.error("News function error:", error);

    return Response.json(
      { error: "Unable to fetch news" },
      { status: 500 }
    );
  }
};
