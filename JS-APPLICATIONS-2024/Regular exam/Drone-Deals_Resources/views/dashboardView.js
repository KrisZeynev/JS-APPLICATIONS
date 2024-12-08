import { getAll } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";

const template = (items) => html`
  <!-- Dashboard page -->
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${items.map(
      (item) => html` <div class="drone">
        <img src=${item.imageUrl} alt=${item.item} />
        <h3 class="model">${item.model}</h3>
        <div class="drone-info">
          <p class="price">Price: €${item.price}</p>
          <p class="condition">Condition: ${item.condition}</p>
          <p class="weight">Weight: ${item.weight}g</p>
        </div>
        <a class="details-btn" href="/dashboard/${item._id}/details">Details</a>
      </div>`
    )}
  </section>
  <!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html`<h3 class="no-drones">No Drones Available</h3>` : ""}
`;

export default async function dashboardView(ctx) {
  const items = await getAll();
  render(template(items));
}
