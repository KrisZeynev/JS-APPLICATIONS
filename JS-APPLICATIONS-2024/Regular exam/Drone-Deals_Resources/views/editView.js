import { edit, getOne } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";
import page from "../lib/page.js";
import { showError } from "../showNotification.js";

const template = (item, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Offer</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input type="text" value=${item.model} name="model" id="model" placeholder="Drone Model" />
        <input type="text" value=${item.imageUrl} name="imageUrl" id="imageUrl" placeholder="Image URL" />
        <input type="number" value=${item.price} name="price" id="price" placeholder="Price" />
        <input type="number" value=${item.weight} name="weight" id="weight" placeholder="Weight" />
        <input type="number" value=${item.phone} name="phone" id="phone" placeholder="Phone Number for Contact" />
        <input type="text" value=${item.condition} name="condition" id="condition" placeholder="Condition" />
        <textarea name="description" id="description" placeholder="Description">${item.description}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export default async function editView(ctx) {
  const itemId = ctx.params.itemId;
  const item = await getOne(itemId);
  // bind for access itemId below
  render(template(item, editFormSubmitHandler.bind(ctx)));
}

async function editFormSubmitHandler(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const itemId = this.params.itemId;

  if (!Object.values(data).every((value) => !!value)) {
    // return alert("All fields are required!");
    return showError("All fields are required!")
  }

  try {
    await edit(itemId, data);

    page.redirect(`/dashboard/${itemId}/details`);
  } catch (error) {
    alert(error.message);
  }
}
