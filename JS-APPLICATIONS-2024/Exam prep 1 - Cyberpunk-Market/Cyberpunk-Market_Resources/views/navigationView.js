import { baseRender, html } from "../lib/lit-html.js";

const template = (userEmail) => html`
  <!-- Navigation -->
  <a id="logo" href="/"><img id="logo" src="./images/logo.png" alt="img" /></a>
  <nav>
    <div>
      <a href="/dashboard">Market</a>
    </div>

    ${userEmail
      ? html`
          <!-- Logged-in users -->
          <div class="user">
            <a href="/create">Sell</a>
            <a href="/logout">Logout</a>
          </div>
        `
      : html`<!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div> `}
  </nav>
`;

export default function navigationView(ctx) {
  const headerEl = document.querySelector("#wrapper > header");
  const userEmail = localStorage.getItem("email");

  baseRender(template(userEmail), headerEl);
}

// if (localStorage.getItem("email")) {
//   document.querySelector("div.user").style.display = "inline-block";
//   document.querySelector("div.guest").style.display = "none";
// } else {
//   document.querySelector("div.user").style.display = "none";
//   document.querySelector("div.guest").style.display = "inline-block";
// }
