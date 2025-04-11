import { createElement } from "./utils";
import ExternalServices from "./ExternalServices";

const externalServices = new ExternalServices();

function LibraryPage(params = new URLSearchParams()) {
  let currentPage = parseInt(params.get("page")) || 1;

  const title = createElement("h1", { textContent: "Enjoy our huge library" });
  const aside = createElement("aside", { className: "aside" }, [
    createElement("span", { textContent: "Filters", className: "filter-span" }),
  ]);

  const libraryCardsContainer = createElement(
    "div",
    { className: "library-cards_container" });
    
  externalServices.getData(currentPage).then((animeArray) => {
    console.log(animeArray);
    animeArray.forEach((anime) => {
      if (
        anime.year &&
        anime.title &&
        anime.url &&
        anime.synopsis &&
        anime.images.webp.image_url
      ) {
        const animeCard = createElement("div", { className: "anime-card" }, [
          createElement("div", { className: "image-container" }, [
            createElement("img", { src: anime.images.webp.image_url }),
          ]),
          createElement("span", { innerHTML: `<strong>Title:</strong> ${anime.title}` }),
          createElement("span", { innerHTML: `<strong>Year:</strong> ${anime.year}` }),
          createElement("a", { href: anime.url, textContent: "Learn More" }),
          createElement("p", { innerHTML: `<strong>Description:</strong> ${anime.synopsis}` }),
        ]);
        libraryCardsContainer.appendChild(animeCard);
      }
    });
  });

  return createElement("div", { className: "library-page" }, [
    aside,
    libraryCardsContainer,
  ]);
}

export default LibraryPage;
