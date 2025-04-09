import { createElement } from "./utils";
import { initRouter } from "./router";

const logo = "/images/animeptm-logo500.webp";

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
