import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";


const renderTemplate = (data) => html`
  <ul>
    ${data.map(({ id, statusCode, statusMessage, imageLocation }) => html`
      <li>
        <img
          src='./images/${imageLocation}.jpg'
          width="250"
          height="250"
          alt="Card image cap"
        />
        <div class="info">
          <button class="showBtn" @click=${(e) => showNotShow(id, e)}>Show status code</button>
          <div class="status" style="display: none" id=${id}>
            <h4>Status Code: ${statusCode}</h4>
            <p>${statusMessage}</p>
          </div>
        </div>
      </li>
    `)}
  </ul>
`;

const showNotShow = (id, e) => {
    const statusDiv = document.getElementById(id);
    const button = e.target;
    if (statusDiv.style.display === "none") {
      statusDiv.style.display = "block";
      button.innerText = "Hide status code";
    } else {
      statusDiv.style.display = "none";
      button.innerText = "Show status code";
    }
  };

const catsContainer = document.querySelector("#allCats");

render(renderTemplate(cats), catsContainer);