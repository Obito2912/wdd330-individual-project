import { createElement } from "./utils";
import ExternalServices from "./ExternalServices";

const externalServices = new ExternalServices();

function thankYouPage() {
  // I use the userData variable to get the object from localStorage
  // and then use it for example on wantsRec to see if the user answered yes
  const userData = JSON.parse(localStorage.getItem("userSubscription"));
  const wantsRec = userData?.animeRec;

  const thankYouContainer = createElement("div", {className: "thank-you_container"}, [
    createElement("h1", {
      textContent: `Thanks for joining, ${userData.name}!`,
    }),
  ]);
  // If the user answered yes, I will do this
  if (wantsRec == 'Yes') {
    externalServices.getRandomAnime().then((anime) => {
      if (
        anime.title &&
        anime.url &&
        anime.synopsis &&
        anime.images.webp.image_url &&
        anime.rating !== "R+ - Mild Nudity"
      ) {
        const meantimeMsg = createElement("p", {
          textContent:
            "In the meantime, we would love to ask you to take a look at one of our random displays of the day. Hope you like it!",
        });
        const recAnime = createElement("div", { className: "anime-rec" }, [
          createElement("div", { className: "anime-rec_card" }, [
            createElement("h2", { textContent: anime.title }),
            createElement("img", {
              src: anime.images.webp.image_url,
              alt: `${anime.title} Image`,
            }),
            createElement("p", { textContent: anime.synopsis }),
            createElement("a", { href: anime.url, textContent: "Learn More" }),
          ]),
        ]);
        thankYouContainer.appendChild(meantimeMsg);
        thankYouContainer.appendChild(recAnime);
      }
    })
  } else {
    // Otherwise I will only show this
    const recAnime = createElement("div", { className: "anime-rec" }, [
      createElement("p", {className: "first-p", textContent: "We also want to thank you for the feedback. We are striving to improve every day!"}),
      createElement("p", {className: "second-p", textContent: `By the way, ${userData.favAnime} is amazing!`})
    ]);

    thankYouContainer.appendChild(recAnime);
  }

  return createElement("div", { className: "thankyou-page" }, [
    thankYouContainer,
  ]);
}
export default thankYouPage;
