import { register } from "../api/usersApi.js";
import { saveUserData } from "../utils/userUtils.js";
import { render, html } from "../lib/lit-html.js";
import page from "../lib/page.js";
import { showError } from "../showNotification.js";
// import { updateNavigation } from "../updateNavigation.js";

const template = (registerFormSubmitHandler) => html`
  <!-- Register Page (Only for Guest users) -->
  <section @submit=${registerFormSubmitHandler} id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export default async function registerView(ctx) {
  render(template(registerFormSubmitHandler));
}

//
async function registerFormSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("re-password");

  if (password === "" || email === "" || repeatPassword === "") {
    // return alert("Fields are required!");
    return showError('Fields are required!')
  }

  if (password !== repeatPassword) {
    // return alert("Passwords don't match");
    return showError("Passwords don't match")
  }

  try {
    const userData = await register(email, password);
    saveUserData(userData);
    page.redirect("/");
  } catch (error) {
    alert(error.message);
  }
}
