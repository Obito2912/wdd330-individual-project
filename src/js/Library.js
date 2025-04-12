import { createElement } from "./utils";
import ExternalServices from "./ExternalServices";

const externalServices = new ExternalServices();

function LibraryPage(params = new URLSearchParams()) {
  let currentPage = parseInt(params.get("page")) || 1;
// Here I use the same strategy with the buttons to be able to change
// pagination and be able to get more content with every 'next' click
  const backBtn = createElement("button", {
    className: "back-page",
    textContent: "Back",
  });
  const nextBtn = createElement("button", {
    className: "next-page",
    textContent: "Next",
  });

  const title = createElement("h1", { textContent: "Enjoy our huge library" });
  const yearFilter = createElement("select", { className: "filter-year" });
  const genreFilter = createElement("select", { className: "filter-genre" });
  const scoreFilter = createElement("select", { className: "filter-score" });
  const statusFilter = createElement("select", { className: "filter-status" });
// I give a default value for each of the filter elements and I will change it later
  [yearFilter, genreFilter, scoreFilter, statusFilter].forEach((filter) => {
    const defaultOption = createElement("option", {
      value: "",
      textContent: "All",
    });
    filter.appendChild(defaultOption);
  });

  let animeArray = [];
  let filterOptions = {
    year: "",
    genre: "",
    score: "",
    status: "",
  };
  // This is the eventListener on every button of the filters and
  // I use my renderFilteredCards to display content according to
  // the user's choice
  [yearFilter, genreFilter, scoreFilter, statusFilter].forEach(
    (filter, index) => {
      const keys = ["year", "genre", "score", "status"];
      filter.addEventListener("change", (e) => {
        filterOptions[keys[index]] = e.target.value;
        renderFilteredCards();
      });
    },
  );

  const aside = createElement("aside", { className: "aside" }, [
    createElement("span", { textContent: "Filters", className: "filter-span" }),
    backBtn,
    nextBtn,
    createElement("div", { className: "yearFilterContainer" }, [
      createElement("span", { textContent: "FilterYear" }),
      yearFilter,
    ]),
    createElement("div", { className: "genreFilterContainer" }, [
      createElement("span", { textContent: "FilterYear" }),
      genreFilter,
    ]),
    createElement("div", { className: "scoreFilterContainer" }, [
      createElement("span", { textContent: "FilterYear" }),
      scoreFilter,
    ]),
    createElement("div", { className: "statusFilterContainer" }, [
      createElement("span", { textContent: "FilterYear" }),
      statusFilter,
    ])
  ]);

  const libraryCardsContainer = createElement(
    "div",
    { className: "library-cards_container" },
    [title],
  );
  // Once the user changes the filters, this is what is going to be displayed
  externalServices.getData(currentPage).then((data) => {
    animeArray = data.filter(
      (anime) =>
        anime.year &&
        anime.title &&
        anime.url &&
        anime.synopsis &&
        anime.images.webp.image_url &&
        anime.rating !== "R+ - Mild Nudity",
    );
    populateFilterOptions(animeArray);
    renderFilteredCards();
  });

  function renderFilteredCards() {
    libraryCardsContainer.innerHTML = "";
    libraryCardsContainer.appendChild(title);

    const filtered = animeArray.filter((anime) => {
      return (
        (!filterOptions.year || anime.year == filterOptions.year) &&
        (!filterOptions.genre ||
          anime.genres.some((g) => g.name === filterOptions.genre)) &&
        (!filterOptions.score ||
          Math.floor(anime.score) == filterOptions.score) &&
        (!filterOptions.status || anime.status === filterOptions.status)
      );
    });

    filtered.forEach((anime) => {
      const animeCard = createElement("div", { className: "anime-card" }, [
        createElement("div", { className: "image-container" }, [
          createElement("img", { src: anime.images.webp.image_url }),
        ]),
        createElement("span", {
          innerHTML: `<strong>Title:</strong> ${anime.title}`,
        }),
        createElement("span", {
          innerHTML: `<strong>Year:</strong> ${anime.year}`,
        }),
        createElement("span", {
          innerHTML: `<strong>Description:</strong> ${anime.synopsis}`,
        }),
        createElement("a", {
          href: anime.url,
          innerHTML: `<strong>Learn More</strong>`,
        }),
      ]);
      libraryCardsContainer.appendChild(animeCard);
    });
  }
  // Here is how I extract the values and add them to the options in my side bar
  function populateFilterOptions(animeArray) {
    const years = new Set();
    const genres = new Set();
    const scores = new Set();
    const statuses = new Set();

    animeArray.forEach((anime) => {
      if (anime.year) years.add(anime.year);
      if (anime.genres) anime.genres.forEach((g) => genres.add(g.name));
      if (anime.score) scores.add(Math.floor(anime.score));
      if (anime.status) statuses.add(anime.status);
    });

    [yearFilter, genreFilter, scoreFilter, statusFilter].forEach(
      (filter) => (filter.innerHTML = '<option value="">All</option>'),
    );

    years.forEach((y) =>
      yearFilter.appendChild(
        createElement("option", { value: y, textContent: y }),
      ),
    );
    genres.forEach((g) =>
      genreFilter.appendChild(
        createElement("option", { value: g, textContent: g }),
      ),
    );
    scores.forEach((s) =>
      scoreFilter.appendChild(
        createElement("option", { value: s, textContent: s }),
      ),
    );
    statuses.forEach((s) =>
      statusFilter.appendChild(
        createElement("option", { value: s, textContent: s }),
      ),
    );
  }

  function updatePageURL(page) {
    window.location.hash = `#/library?page=${page}`;
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
  });

  return createElement("div", { className: "library-page" }, [
    aside,
    libraryCardsContainer,
  ]);
}

export default LibraryPage;
