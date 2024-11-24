import { html, render } from "./node_modules/lit-html/lit-html.js";
import { addBook } from "./functionalities.js";
import {
  renderLoadBtn,
  renderInitialTable,
  renderAddForm,
  renderditForm,
} from "./renderElements.js";
// const docBody = document.querySelector("body");

// append all elements
render(
  html`${renderLoadBtn()} ${renderInitialTable()} ${renderAddForm()}
  ${renderditForm()}`,
  document.querySelector("body")
);

document.querySelector('#add-form').addEventListener('submit', addBook)
