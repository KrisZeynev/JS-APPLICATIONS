import { html, render } from "./node_modules/lit-html/lit-html.js";
const url = "http://localhost:3030/jsonstore/advanced/dropdown";

function addItem() {
  const showDropDown = (data) => {
    // return html` ${data.map((item) => <option>${item.text}</option>)}`;
    return html`
      ${Object.values(data).map(
        ({ text, _id }) => html`<option value=${_id}>${text}</option>`
      )}
    `;
  };
  async function initialRender() {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const menuEl = document.querySelector("#menu");
      render(showDropDown(data), menuEl);
    }
  }
  initialRender();

  const addBtn = document.querySelector(
    "body > article > form > input[type=submit]:nth-child(3)"
  );
  addBtn.addEventListener("click", addNewOption);

  async function addNewOption(e) {
    e.preventDefault();
    const input = document.querySelector("#itemText");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input.value }),
    });
    initialRender();
    input.value = ''
  }
}
addItem();
