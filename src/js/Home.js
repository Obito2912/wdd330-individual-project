import { createElement } from "./utils";

function HomePage() {
  // Create landscape for landing page
  const landscapeDiv = createElement(
    "div",
    { className: "landscape-container" },
    [
      createElement("picture", {}, [
        createElement("source", {
          media: "(min-width: 1024px)",
          srcSet: "/images/landscape-atardecer.jpg",
        }),
        createElement("img", {
          src: "/images/landscape-atardecer.jpg",
          alt: "Landscape for Landing Page",
          width: "200",
          height: "200",
        }),
      ]),
    ],
  );
  // Create Title
  const title = createElement("h1", {
    textContent: "Awake your inner otaku",
  });
  
  const cardsContainer = createElement("div", {className: "cards-container"});

  fetch ("/json/anime-info.json")
    .then(response => response.json())
    .then(data => {
     data.forEach(element => {
      const card = createElement("section", {}, [
          createElement("h2", {textContent: element.title}),
          createElement("p", {textContent: element.paragraph})
        ]);
        cardsContainer.appendChild(card);
      });
    })

  return createElement("div", { className: "home-page"}, [landscapeDiv, title, cardsContainer]);
}

export default HomePage;
