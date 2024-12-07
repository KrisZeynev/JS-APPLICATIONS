import page from "../lib/page.js";
import { create } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";
// import { request } from "../lib/request.js";

const template = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Add Solution</h2>
      <form @submit=${onSubmit} class="create-form">
        <input type="text" name="type" id="type" placeholder="Solution Type" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
        <textarea id="description" name="description" placeholder="Description" rows="2" cols="10" ></textarea>
        <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10" ></textarea>
        <button type="submit">Add Solution</button>
      </form>
    </div>
  </section>
`;

export default async function createView(ctx) {
  render(template(createFormSubmitHandler));
}

async function createFormSubmitHandler(e) {
  e.preventDefault();
  // const {item, imageUrl, price, availability,type,description } = Object.fromEntries(new FormData(e.target))
  const data = Object.fromEntries(new FormData(e.target));

  if (!Object.values(data).every((value) => !!value)) {
    return alert("All fields are required!");
  }

  try {

    const dataToSend = {
      'type': data.type,
      'imageUrl': data['image-url'],
      'description': data.description,
      'learnMore': data['more-info'],
    }

    await create(dataToSend);

    page.redirect("/dashboard");
  } catch (error) {
    alert(error.message);
  }
}
