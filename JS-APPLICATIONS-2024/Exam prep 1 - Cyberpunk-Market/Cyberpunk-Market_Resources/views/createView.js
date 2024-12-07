import page from "../lib/page.js";
import { create } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";
// import { request } from "../lib/request.js";

const template = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form form-item">
      <h2>Share Your item</h2>
      <form @submit=${onSubmit} class="create-form" method="POST">
        <input type="text" name="item" id="item" placeholder="Item" />
        <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
        <input type="text" name="price" id="price" placeholder="Price in Euro" />
        <input type="text" name="availability" id="availability" placeholder="Availability Information"
        />
        <input type="text" name="type" id="type" placeholder="Item Type" />
        <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"></textarea>
        <button type="submit">Add</button>
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
  const data = Object.fromEntries(new FormData(e.target))
  if (!Object.values(data).every(value => !!value)) {
    return alert('All fields are required!')
  }

  try {
    await create(data)

    page.redirect('/dashboard')

  } catch (error) {
    alert(error.message)
  }
  // console.log(formData);
}