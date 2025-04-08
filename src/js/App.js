import { createElement } from "./utils";
import { initRouter } from "./router";
import logoAsset from "../images/animeptm-logo500.webp";
const logo = logoAsset.default || logoAsset; // Fallback in case it's already a string

// Create some content for the footer.
const footerContent = createElement("div", {}, [
  createElement("p", { textContent: "Copyright ©2025 AnimePTM" }),
]);

// Create a navigation bar for the header.
const headerContent = createElement("div", { className: "navBar-content" }, [
  createElement("nav", {}, [
    createElement("a", { href: "/#/page1", textContent: "Page 1" }),
    createElement("a", { href: "/#/page2", textContent: "Page 2" }),
    createElement("a", { href: "/#/page3", textContent: "Page 3" }),
    createElement("a", { href: "/#/page4", textContent: "Page 4" }),
  ]),
  createElement("picture", { className: "main-logo" }, [
    createElement("source", { media: "(min-width: 1024px)", srcset: logo }),
    createElement("img", {
      src: logo,
      alt: "AnimePTM Logo",
      width: "200",
      height: "200",
    }),
  ]),
]);

document.addEventListener("DOMContentLoaded", () => {
  // Grab the header, main view (root), and footer elements.
  const header = document.getElementById("header");
  const mainView = document.getElementById("root");
  const footer = document.getElementById("footer");

  // Append the nav bar to the header.
  header.appendChild(headerContent);

  footer.appendChild(footerContent);

  // Initialize your router so that it updates only the main view (#root).
  initRouter(mainView);
});
