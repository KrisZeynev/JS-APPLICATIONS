import { html, render } from "./node_modules/lit-html/lit-html.js";
async function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);
  const tBodyEl = document.querySelector("body > table > tbody");
  const url = "http://localhost:3030/jsonstore/advanced/table";

  const showTr = (data) => {
    return html`
      ${Object.values(data).map(
        ({ firstName, lastName, email, course, _id }) => html`<tr>
          <td>${firstName} ${lastName}</td>
          <td>${email}</td>
          <td>${course}</td>
        </tr>`
      )}
    `;
  };

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    render(showTr(data), tBodyEl);
  }

  function onClick() {
    const searchText = document
      .querySelector("#searchField")
      .value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      row.classList.remove("select");
      const rowText = row.textContent.toLowerCase();

      if (searchText && rowText.includes(searchText)) {
        row.classList.add("select");
      } else {
        row.classList.remove("select");
      }
    });

    //  searchField.value = "";
    document.querySelector("#searchField").value = "";
  }
}
solve();
