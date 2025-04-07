import App from "./app.js";
import ExternalServices from "./ExternalServices.js";

document.getElementById("root").appendChild(App());

const services = new ExternalServices();

// services.getSeasons().then((seasons) => {
//   console.log("NBA Seasons:", seasons);
// });
