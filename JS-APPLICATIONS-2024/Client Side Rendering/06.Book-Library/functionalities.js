const url = "http://localhost:3030/jsonstore/collections/books";
import { render } from "./node_modules/lit-html/lit-html.js";
import { renderSingleBooks } from "./renderElements.js";

export const loadAllBooks = async (е) => {
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  render(renderSingleBooks(data), document.querySelector("tbody"));
};

export const addBook = async (e) => {
    e.preventDefault();
    const {title, author} = Object.fromEntries(new FormData(e.target));
    if (title == '' || author == '') {
        return
    }
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title, author})
    })
    e.target.reset();
    loadAllBooks();
}