import { initRouter } from "./router";
import { loadHeaderFooter } from "./utils";

loadHeaderFooter();

const mainView = document.getElementById("root");
initRouter(mainView);
