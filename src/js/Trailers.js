import { createElement } from "./utils";

function TrailersPage() {
  const title = createElement("h2", { textContent: "Here are some of the best anime trailers" });

  return createElement("div", {}, [title]);
}

export default TrailersPage;
