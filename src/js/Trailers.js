import { createElement } from "./utils";

function TrailersPage() {
  const title = createElement("h2", { textContent: "Awake your inner otaku by watching" });
  const landscape = createElement('picture', {className: 'landscape-container'}, [
    createElement("picture", { className: "main-logo" }, [
      createElement("source", {
        media: "(min-width: 1024px)",
        srcSet: '/images/landscape.webp',
      }),
      createElement("img", {
        src: '/images/landscape.webp',
        alt: "Landscape for Landing Page",
        width: "200",
        height: "200",
      })
    ]),
  ]);
  
  

  return createElement("div", {}, [title, landscape]);
}

export default TrailersPage;
