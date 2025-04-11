const baseUrl = "https://api.jikan.moe/v4/anime";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {

  async getTrailers() {

    const response = await fetch(baseUrl);
    const data = await convertToJson(response);
    return data.data;
  }

  async getTeams(league, season) {
    const cacheKey = `nbaTeams_${league}_${season}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const url = `${baseUrl}teams?league=${league}&season=${season}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    const data = await convertToJson(response);
    localStorage.setItem(cacheKey, JSON.stringify(data.response));
    console.log("Teams response:", data);
    return data.response;
  }

  async getSeasons() {
    const requestOptions = {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}seasons`, requestOptions);
      const text = await response.text(); // Read raw response
      console.log("Raw Seasons Response:", text);
      const data = JSON.parse(text); // Convert to JSON
      return data.response; // Return only the seasons list
    } catch (err) {
      console.error("Error fetching seasons:", err);
      return [];
    }
  }
}
