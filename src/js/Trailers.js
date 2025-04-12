import { createElement } from "./utils";
import ExternalServices from "./ExternalServices";

// This is an instance of my ExternalServices class
const externalServices = new ExternalServices();

function TrailersPage(params = new URLSearchParams()) {
  let currentPage = parseInt(params.get("page")) || 1;

  const title = createElement("h1", {
    textContent: "Here are some of the best anime trailers",
  });

  const trailersContainer = createElement("div", {
    className: "trailers-container",
  });
  // I call the class here to get the data I need and be able to create
  // all the cards for each of the array objects if they have the
  // requirements from the if statements
  externalServices.getData(currentPage).then((animeArray) => {
    animeArray.forEach((anime) => {
      if (anime.trailer && anime.trailer.embed_url) {
        const trailerCard = createElement(
          "div",
          { className: "trailer-card" },
          [
            createElement("h2", { textContent: anime.title }),
            createElement("iframe", {
              src: anime.trailer.embed_url,
              width: "560",
              height: "315",
              allowFullscreen: true,
            }),
          ],
        );
        trailersContainer.appendChild(trailerCard);
      }
    });
  });

  const backBtn = createElement("button", {
    className: "back-button",
    textContent: "Back",
  });
  const nextBtn = createElement("button", {
    className: "next-button",
    textContent: "Next",
  });
  // This function allows me to work with the buttons above in order to change
  // the page and be able to display different content
  function updatePageURL(page) {
    window.location.hash = `#/trailers?page=${page}`;
  }
  // Here I have eventListeners for both of my buttons, to increment the pagination
  // number or decrease it at will
  backBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePageURL(currentPage);
    }
  });
  nextBtn.addEventListener("click", () => {
    currentPage++;
    updatePageURL(currentPage);
  });
  // Here I create the view of all I want to display in my trailers-page
  return createElement("div", { className: "trailers-page" }, [
    title,
    backBtn,
    nextBtn,
    trailersContainer,
  ]);
}

export default TrailersPage;
