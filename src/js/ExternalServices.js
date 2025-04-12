const baseUrl = "https://api.jikan.moe/v4/anime";

// This little function makes things easier to convert the data from JSON format to JS
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Here is my class I have created to be able to use it across my pages whenever I need info from the API
export default class ExternalServices {
  // This function gets the an Array of data from the API. This API is paginated and that's why
  // it has a parameter so it can be changed by the user in the trailers and library pages
  async getData(page = 1) {

    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await convertToJson(response);
    return data.data;
  }
  // I'm using this function in my ThankYou file only if the user decides to get anime recommendations
  // in the join form. It chooses a random content and displays it for the user as a thank you for
  // deciding to get recommendations
  async getRandomAnime() {
    const response = await fetch("https://api.jikan.moe/v4/random/anime");
    const data = await response.json();
    return data.data;
  }
}
