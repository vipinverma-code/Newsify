
const categoryMapping = {
  general: "",
  technology: "technology",
  business: "business",
  health: "health",
  science: "science",
  sports: "sport",
  entertainment: "culture"
};

export const fetchNews = async (category = "general") => {
  const section = categoryMapping[category];

  if (section === undefined) {
    throw new Error("Invalid news category");
  }

  try {
    const params = new URLSearchParams();

    if (section) {
      params.set("section", section);
    }

    const response = await fetch(
      `/.netlify/functions/news?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Unable to fetch news"
      );
    }

    return data.response?.results || [];

  } catch (error) {
    console.error("API service error:", error);
    throw error;
  }
};
