import { createElement } from "./utils";

import HomePage from "./Home";
import TrailersPage from "./Trailers";
import LibraryPage from "./Library";
import JoinPage from "./Join";
import thankYouPage from "./ThankYou";

// I did all my imports on top to be able to use them in this initRoute function
// This is what allows me to change the view of my root element in the html by
// calling updateView and the hashToRoute sees which function I'm trying to call
// and according to that, the view will change
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
  // When the landing page loads it will have a default hash to display the HomePage view
  const defaultHash = window.location.hash || "#/home";
  hashToRoute(defaultHash);

  window.addEventListener("hashchange", (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
  });
}
