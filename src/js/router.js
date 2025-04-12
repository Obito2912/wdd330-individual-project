import { createElement } from "./utils";

import HomePage from "./Home";
import TrailersPage from "./Trailers";
import LibraryPage from "./Library";
import JoinPage from "./Join";
import thankYouPage from "./ThankYou";

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = "";
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
    const [route, queryString] = hash.split("?");
    const params = new URLSearchParams(queryString);

    switch (route) {
      case "#/home":
        updateView(HomePage());
        break;

      case "#/trailers":
        updateView(TrailersPage(params));
        break;

      case "#/library":
        updateView(LibraryPage(params));
        break;

      case "#/join":
        updateView(JoinPage());
        break;

      case "#/thankyou":
        updateView(thankYouPage());
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
