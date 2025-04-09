import { createElement } from "./utils";

import HomePage from "./Home";
import TrailersPage from "./Trailers";
import LibraryPage from "./Library";
import JoinPage from "./Join";

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = "";
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
    switch (hash) {
      case "#/home":
        updateView(HomePage());
        break;

      case "#/trailers":
        updateView(TrailersPage());
        break;

      case "#/library":
        updateView(LibraryPage());
        break;

      case "#/join":
        updateView(JoinPage());
        break;

      default:
        updateView(createElement("h3", { textContent: "404 Page Not Found" }));
        break;
    }
  }

  const defaultHash = window.location.hash || "#/home";
  hashToRoute(defaultHash);

  window.addEventListener("hashchange", (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
  });
}
