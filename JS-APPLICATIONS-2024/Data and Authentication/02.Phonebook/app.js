function attachEvents() {
  const btnLoad = document.querySelector("#btnLoad");
  const btnCreate = document.querySelector("#btnCreate");
  const phonebook = document.querySelector("#phonebook");
  const url = "http://localhost:3030/jsonstore/phonebook";

  btnLoad.addEventListener("click", async () => {
    document.querySelector("#phonebook").replaceChildren();
    let allEntries = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    Object.values(allEntries).forEach(({ person, phone, _id }) => {
      let li = document.createElement("li");
      li.innerHTML = `${person}: ${phone}`;

      let delBtn = document.createElement("button");
      delBtn.innerHTML = "Delete";
      delBtn.addEventListener("click", async (e) => {
        console.log(li)
        await fetch(`${url}/${_id}`, {
          method: "DELETE",
        });
        e.target.parentElement.remove()
      });

      li.appendChild(delBtn)
      phonebook.appendChild(li);
    });
  });

  btnCreate.addEventListener("click", async () => {
    let person = document.querySelector("#person").value;
    let phone = document.querySelector("#phone").value;
    let data = {
      person: person,
      phone: phone,
    };
    document.querySelector("#person").value = ''
    document.querySelector("#phone").value = ''

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    btnLoad.click()
  });
}

attachEvents();
