import { html, render } from "./node_modules/lit-html/lit-html.js";
import { loadAllBooks } from "./functionalities.js";
const url = "http://localhost:3030/jsonstore/collections/books";

export const renderLoadBtn = () => {
  return html`<button id="loadBooks" @click=${(е) => loadAllBooks()}>
    LOAD ALL BOOKS
  </button>`;
};

export const renderInitialTable = () => {
  return html`<table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table> `;
};

export const renderAddForm = () => {
  return html`
    <form id="add-form">
      <h3>Add book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Submit"} />
    </form>
  `;
};

export const renderditForm = () => {
  return html`
    <form id="edit-form" style="display: none">
      <input type="hidden" name="id" />
      <h3>Edit book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Save" />
    </form>
  `;
};

export const renderSingleBooks = (data) => {
  return html`
    ${Object.entries(data).map(
      ([id, info]) => html`
        <tr>
          <td>${info.title}</td>
          <td>${info.author}</td>
          <td>
            <button id=${id}>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      `
    )}
  `;
};
