import { createElement } from "./utils";

function JoinPage() {
  const title = createElement("h2", { textContent: "Join our awesome community" });

  return createElement("div", {}, [title]);
}

export default JoinPage;
