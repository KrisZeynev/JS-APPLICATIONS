import { html, render } from "./node_modules/lit-html/lit-html.js";
const createTownLi = (data) => {
  return html` ${data.map((town) => html`<li>${town}</li>`)} `;
};

function renderAllLi(data, el) {
  render(data, el);
}

const formEl = document.querySelector(".content");
const rootEl = document.querySelector("#root");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  let towns = data.towns.split(", ");

  const ulElement = document.createElement("ul");
  rootEl.appendChild(ulElement);

  renderAllLi(createTownLi(towns), ulElement);

  e.target.reset();
});
