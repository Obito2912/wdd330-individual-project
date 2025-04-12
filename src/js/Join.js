import { createElement } from "./utils";

function JoinPage() {
  // This is where I create all my elements for my join page
  const title = createElement("h1", {
    textContent: "Join our awesome community",
  });
  const form = createElement(
    "form",
    { action: "#/thankyou.html", className: "join-form" },
    [
      createElement("fieldset", {}, [
        createElement("legend", { textContent: "Info to Subscribe" }),
        createElement("label", { htmlFor: "name", textContent: "Nickname:" }),
        createElement("input", {
          id: "name",
          name: "name",
          type: "text",
          placeholder: "Peter",
          required: true,
        }),
        createElement("label", { htmlFor: "email", textContent: "Email:" }),
        createElement("input", {
          id: "email",
          name: "email",
          type: "text",
          placeholder: "for@example.com",
          required: true,
        }),
        createElement("label", {
          htmlFor: "favAnime",
          textContent: "What's your favorite anime:",
        }),
        createElement("input", {
          id: "favAnime",
          name: "favAnime",
          type: "text",
          placeholder: "Dragon Ball Z",
          required: true,
        }),
        createElement("label", {
          htmlFor: "feedback",
          textContent: "Feedback on what we can improve:",
        }),
        createElement("input", {
          id: "feedback",
          name: "feedback",
          type: "text",
          placeholder: "Update your list of animes",
          required: true,
        }),
        createElement("label", {
          htmlFor: "animeRec",
          textContent: "Would you like us to recommend you an anime?",
        }),
        createElement("select", { id: "animeRec", name: "animeRec" }, [
          createElement("option", {
            value: "",
            disabled: true,
            selected: true,
            textContent: "Select an option",
            required: true,
          }),
          createElement("option", { value: "Yes", textContent: "Yes" }),
          createElement("option", { value: "No", textContent: "No" }),
        ]),
      ]),
      createElement("button", {
        textContent: "Subscribe",
        type: "submit",
        id: "submit",
      }),
    ],
  );
  // I prevent the default of the form from loading the page. By doing this I can work
  // with the formData and userData and be able to store it in localStorage and be
  // able to use it for the thank you page
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent the 404

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    localStorage.setItem("userSubscription", JSON.stringify(userData));

    window.location.hash = "#/thankyou"; // this will trigger your router
  });
  return createElement("div", { className: "join-page" }, [title, form]);
}

export default JoinPage;
