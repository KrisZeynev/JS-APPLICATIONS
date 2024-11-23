import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

function search() {
  const showTowns = (data) => {
    return html`
      <ul>
        ${data.map((town) => html`<li>${town}</li>`)}
      </ul>
    `;
  };

  const townsEl = document.querySelector("#towns");
  render(showTowns(towns), townsEl);

  const searchBtn = document.querySelector("body > article > button");
  console.log(towns);

  searchBtn.addEventListener("click", (e) => {
    const input = document.querySelector("#searchText").value;
    let count = 0;
    Array.from(document.querySelectorAll("li")).forEach((li) => {
      li.classList.remove("active");
      if (li.textContent.includes(input)) {
        li.classList.add("active");
        count += 1;
      }
    });
    document.querySelector('#result').textContent = `${count} matches found`
  });
}
search();
