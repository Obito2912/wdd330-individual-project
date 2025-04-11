import { createElement } from "./utils";
import ExternalServices from "./ExternalServices";

const externalServices = new ExternalServices();

function TrailersPage(params = new URLSearchParams()) {
  let currentPage = parseInt(params.get("page")) || 1;

  const title = createElement("h1", {
    textContent: "Here are some of the best anime trailers",
  });

  const trailersContainer = createElement("div", {
    className: "trailers-container",
  });

  externalServices.getData(currentPage).then((animeArray) => {
    console.log(animeArray);
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

  function updatePageURL(page) {
    window.location.hash = `#/trailers?page=${page}`;
  }

  backBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePageURL(currentPage);
    }
  });
  nextBtn.addEventListener("click", () => {
    currentPage++;
    updatePageURL(currentPage);
  })

  return createElement("div", { className: "trailers-page" }, [
    title,
    backBtn,
    nextBtn,
    trailersContainer,
  ]);
}

export default TrailersPage;
