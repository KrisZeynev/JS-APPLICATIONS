import { getAll } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";

const template = (items) => html`
  <!-- Dashboard page -->
  <h2>Solutions</h2>
  <section id="solutions">
    <!-- Display a div with information about every post (if any)-->
    ${items.map(
      (item) => html`
        <div class="solution">
          <img src=${item.imageUrl} alt=${item.item} />
          <div class="solution-info">
            <h3 class="type">${item.type}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/dashboard/${item._id}/details">Learn More</a>
          </div>
        </div>
      `
    )}
  </section>
  ${items.length === 0 ? html `<h2 id="no-solution">No Solutions Added.</h2>` : ''}
`;

export default async function solutionsView(ctx) {
  const items = await getAll();
  render(template(items));
}
