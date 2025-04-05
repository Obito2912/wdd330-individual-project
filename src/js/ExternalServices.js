const apiKey = import.meta.env.VITE_API_KEY;
console.log('API key', apiKey)
const apiHost = "api-nba-v1.p.rapidapi.com";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // You can initialize a default league/category here if needed
  }

  get headers() {
    return {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost
    };
  }

  // Get NBA leagues (only a single endpoint here)
  async getLeagues() {
    const response = await fetch(`${baseURL}leagues`, {
      method: "GET",
      headers: this.headers
    });
    const data = await convertToJson(response);
    return data.response; // This is where RapidAPI returns the useful data
  }

  // Example: Find all NBA teams in a league/season
  async getTeamsByLeagueAndSeason(league, season) {
    const url = `${baseURL}teams?league=${league}&season=${season}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers
    });
    const data = await convertToJson(response);
    return data.response;
  }

  // Example: Fetch games by date
  async getGamesByDate(date) {
    const url = `${baseURL}games?date=${date}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers
    });
    const data = await convertToJson(response);
    return data.response;
  }
}