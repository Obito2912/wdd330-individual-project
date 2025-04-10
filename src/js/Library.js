import { createElement } from "./utils";

function LibraryPage() {
    const title = createElement("h2", { textContent: "Enjoy our huge library" });
    
      return createElement("div", {}, [title]);
}

export default LibraryPage;
