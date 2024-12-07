import { baseRender, html } from "../lib/lit-html.js";

const template = (userEmail) => html`
  <!-- Navigation -->
  <a id="logo" href="/"
    ><img id="logo-img" src="./images/logo2.png" alt="logo" />
  </a>
  <nav>
    <div>
      <a href="/dashboard">Solutions</a>
    </div>

    ${userEmail
      ? html`
          <!-- Logged-in users -->
          <div class="user">
            <a href="/create">Add Solution</a>
            <a href="/logout">Logout</a>
          </div>
        `
      : html`
          <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        `}
  </nav>
`;

export default function navigationView(ctx) {
  const headerEl = document.querySelector("#wrapper > header");
  const userEmail = localStorage.getItem("email");

  baseRender(template(userEmail), headerEl);
}
