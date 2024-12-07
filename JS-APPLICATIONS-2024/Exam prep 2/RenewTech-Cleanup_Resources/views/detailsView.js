import { getOne } from "../api/itemsApi.js";
import { render, html } from "../lib/lit-html.js";
import { getUserData } from "../utils/userUtils.js";

const template = (item, isCreator, isLoggedIn) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt=${item.item} />
      <div>
        <p id="details-type">${item.type}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${item.description}</p>
            <p id="more-info">${item.learnMore}</p>
          </div>
        </div>
        <h3>Like Solution:<span id="like">0</span></h3>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${isCreator
            ? html`
                <a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
                <a href="/dashboard/${item._id}/delete" id="delete-btn"
                  >Delete</a
                >
              `
            : ""}
          ${isLoggedIn ? html`<a href="#" id="like-btn">Like</a>` : ""}
        </div>
      </div>
    </div>
  </section>
`;

export default async function detailsView(ctx) {
  const itemId = ctx.params.itemId;
  const item = await getOne(itemId);

  const userData = getUserData();
  const isLoggedIn = userData._id;
  const isCreator = userData._id == item._ownerId;

  render(template(item, isCreator, isLoggedIn));
}
