const baseUrl = "https://api.jikan.moe/v4/anime";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {

  async getData(page = 1) {

    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await convertToJson(response);
    return data.data;
  }
}
