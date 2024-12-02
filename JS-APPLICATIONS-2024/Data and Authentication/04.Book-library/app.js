document.addEventListener("DOMContentLoaded", () => {
  const loadBooks = document.querySelector("#loadBooks");
  const url = "http://localhost:3030/jsonstore/collections/books";
  const tBody = document.querySelector("body > table > tbody");
  const formEl = document.querySelector("body > form");

  loadBooks.addEventListener("click", loadAll);

  async function loadAll() {
    document.querySelector("body > table > tbody").replaceChildren();
    let allEntries = await fetch(url).then((res) => res.json());
    Object.entries(allEntries).forEach((el) => {
      let id = el[0];
      let author = el[1].author;
      let title = el[1].title;
      // console.log(el[1].title)
      tBody.appendChild(createTR(author, title, id));
    });
  }

  function createTR(author, title, id) {
    let tr = document.createElement("tr");
    tr.value = id;

    let titleTr = document.createElement("td");
    titleTr.textContent = title;

    let authorTr = document.createElement("td");
    authorTr.textContent = author;

    let actionTd = document.createElement("td");

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("id", id);
    editBtn.addEventListener("click", editFunc);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("id", id);
    deleteBtn.addEventListener("click", delFunc);

    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    tr.appendChild(titleTr);
    tr.appendChild(authorTr);
    tr.appendChild(actionTd);

    return tr;
  }

  //
  formEl.addEventListener("submit", createFunc);
  async function createFunc(e) {
    e.preventDefault();
    let form = new FormData(formEl);
    let title = form.get("title").trim();
    let author = form.get("author").trim();
    let bookId = formEl.getAttribute("id");

    // let entry = { author: author, title: title };
    // console.log({ ...entry });

    if (author === "" || title === "") {
        return;
      }

    

    if (bookId) {
      await fetch(`${url}/${bookId}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({author, title}),
        // body: JSON.stringify({title, author}),
      });
      formEl.removeAttribute("id");
    
    } else {
      await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({author, title}),
      });
      
    }

    document.querySelector("body > form > h3").innerHTML = "FORM";
    document.querySelector("body > form > button").innerHTML = "Submit";
      formEl.reset();
    loadAll();
  }

  async function editFunc(e) {
    document.querySelector("body > form > h3").innerHTML = "Edit FORM";
    document.querySelector("body > form > button").innerHTML = "Save";

    const bookId = e.target.getAttribute("id");
    const row = e.target.closest("tr");
    // const row = e.target.parentElement.parentElement;
    
    const bookTitle = row.querySelector("td:nth-child(1)").textContent;
    const bookAuthor = row.querySelector("td:nth-child(2)").textContent;

    // let currId = e.target.parentElement.parentElement.value;
    // let title =
    //   e.target.parentElement.previousSibling.previousSibling.innerHTML;
    // let author = e.target.parentElement.previousSibling.innerHTML;

    //   console.log(title, author)

    formEl.setAttribute("id", bookId);
    formEl.querySelector('input[name="title"]').value = bookTitle;
    formEl.querySelector('input[name="author"]').value = bookAuthor; 
  }

  async function delFunc(e) {
    await fetch(`${url}/${e.target.id}`, {
      method: "DELETE",
    });
    e.target.parentElement.parentElement.remove();
  }
});
