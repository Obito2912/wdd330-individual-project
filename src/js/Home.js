import { createElement } from "./utils";

// The createElement function will be used across all my files. I know maybe it's not the best approach
// because I'm basically writing my html in my JS files but this is the way I found I could do what I wanted.
// I wouldn't do this in a real project

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

  // Bringing the data from my json file so I can use it to create my cards, for each object, a card is created
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
