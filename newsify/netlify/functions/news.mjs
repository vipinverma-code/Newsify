
export default async (req) => {
  try {
    const apiKey = process.env.GUARDIAN_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Guardian API key is missing" },
        { status: 500 }
      );
    }

    const requestUrl = new URL(req.url);
    const category = requestUrl.searchParams.get("category") || "general";

    const categoryMap = {
      business: "business",
      entertainment: "culture",
      science: "science",
      sports: "sport",
      technology: "technology",
    };

    const params = new URLSearchParams({
      "api-key": apiKey,
      "page-size": "12",
      "show-fields": "trailText,thumbnail",
      "order-by": "newest",
    });

    if (categoryMap[category]) {
      params.set("section", categoryMap[category]);
    } else if (category === "health") {
      params.set("q", "health");
    }

    const apiUrl = `https://content.guardianapis.com/search?${params}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.response?.status !== "ok") {
      return Response.json(
        { error: "Unable to fetch news from Guardian API" },
        { status: 502 }
      );
    }

    const articles = data.response.results.map((item) => ({
      title: item.webTitle,
      description: item.fields?.trailText || "",
      url: item.webUrl,
      urlToImage: item.fields?.thumbnail || "",
      source: "The Guardian",
      publishedAt: item.webPublicationDate,
    }));

    return Response.json({ articles });
  } catch (error) {
    console.error("News function error:", error);

    return Response.json(
      { error: "Something went wrong while fetching news" },
      { status: 500 }
    );
  }
};
