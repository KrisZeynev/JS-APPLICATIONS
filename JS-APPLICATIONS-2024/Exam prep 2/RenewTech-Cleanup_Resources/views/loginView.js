import { render, html } from "../lib/lit-html.js";
// import { updateNavigation } from "../updateNavigation.js";
import { saveUserData } from "../utils/userUtils.js";
import page from "../lib/page.js";
// import { login } from "../lib/request.js";
import { login } from "../api/usersApi.js";

const template = (loginFormSubmitHandler) => html`
  <!-- Login Page (Only for Guest users) -->
  <section @submit=${loginFormSubmitHandler} id="login">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="/register">Create an account</a></p>
      </form>
    </div>
  </section>
`;

export default async function loginView(ctx) {
  render(template(loginFormSubmitHandler));
}

async function loginFormSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

    try {
      if (password == "" || email == "") {
        return alert("All fields must be filled!");
      }
      const userData = await login(email, password)
      saveUserData(userData);

      page.redirect("/");
    } catch (error) {
      alert(error.message);
    }
  
}
