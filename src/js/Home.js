import { createElement } from "./utils";

function HomePage() {
    const title = createElement("h2", {
        textContent: "Awake your inner otaku by watching",
      });
      const source = createElement("source", {
        media: "(min-width: 1024px)",
        srcSet:
        "https://raw.githubusercontent.com/Obito2912/wdd330-individual-project/main/src/public/images/landscape.webp",
      });
      const img = createElement("img", {
        src: "https://raw.githubusercontent.com/Obito2912/wdd330-individual-project/main/src/public/images/landscape.webp",
        alt: "Landscape for Landing Page",
        width: "200",
        height: "200",
      });
      const landscape = createElement("picture", {
        className: "landscape-container",
      }, [source, img]);
      
      return createElement("div", {}, [landscape, title]);
}

export default HomePage;