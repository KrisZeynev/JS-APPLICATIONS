import { showCatches } from "./app.js";
export function showSingleCatch(data) {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let isUser = user && data._ownerId === user.id;
  const div = document.createElement("div");
  div.className = "catch";
  div.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${data.angler}" ${
    !isUser ? "disabled" : ""
  }>
    <label>Weight</label>
    <input type="number" class="weight" value="${data.weight}" ${
    !isUser ? "disabled" : ""
  }>
    <label>Species</label>
    <input type="text" class="species" value="${data.species}" ${
    !isUser ? "disabled" : ""
  }>
    <label>Location</label>
    <input type="text" class="location" value="${data.location}" ${
    !isUser ? "disabled" : ""
  }>
    <label>Bait</label>
    <input type="text" class="bait" value="${data.bait}" ${
    !isUser ? "disabled" : ""
  }>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${data.captureTime}" ${
    !isUser ? "disabled" : ""
  }>
    <button class="update" id="${data._id}" ${
    !isUser ? "disabled" : ""
  }>Update</button>
    <button class="delete" id="${data._id}" ${
    !isUser ? "disabled" : ""
  }>Delete</button>`;

  const updateButton = div.querySelector(".update");
  updateButton.addEventListener("click", updateCatch);

  const deleteButton = div.querySelector(".delete");
  deleteButton.addEventListener("click", deleteCatch);

  return div;
}

export async function addNewCatch(e) {
  e.preventDefault();
  const formEl = document.querySelector("#addForm");
  const user = JSON.parse(sessionStorage.getItem("user"));

  try {
    const { angler, weight, species, location, bait, captureTime } =
      Object.fromEntries(new FormData(formEl));

    if (angler == '') {
        alert('Angler must be filled!')
        return
    }

    if (weight == '') {
        alert('Weight must be filled!')
        return
    }

    if (species == '') {
        alert('Species must be filled!')
        return
    }

    if (location == '') {
        alert('Location must be filled!')
        return
    }
    if (captureTime == '') {
        alert('Capture Time must be filled!')
        return
    }
    const res = await fetch("http://localhost:3030/data/catches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": user.token,
      },
      body: JSON.stringify({
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
      }),
    });

    const data = await res.json();
    // append it to the cathes div
    formEl.reset()
    showCatches()
    // console.log(data);
  } catch (error) {
    alert(error.message);
  }

  
}


async function updateCatch(e) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const parentEl = e.target.parentElement;
    const angler = parentEl.querySelector('.angler').value;
    const weight = parentEl.querySelector('.weight').value;
    const species = parentEl.querySelector('.species').value;
    const location = parentEl.querySelector('.location').value;
    const bait = parentEl.querySelector('.bait').value;
    const captureTime = parentEl.querySelector('.captureTime').value;

    try {
        if (angler == '') {
            alert('Angler must be filled!')
            return
        }
    
        if (weight == '') {
            alert('Weight must be filled!')
            return
        }
    
        if (species == '') {
            alert('Species must be filled!')
            return
        }
    
        if (location == '') {
            alert('Location must be filled!')
            return
        }
        if (bait == '') {
            alert('Bait must be filled!')
            return
        }
        if (captureTime == '') {
            alert('Capture Time must be filled!')
            return
        }
    
        const res = await fetch(`http://localhost:3030/data/catches/${e.target.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.token
            },
            body: JSON.stringify({angler, weight, species, location, bait, captureTime})
        })
        showCatches()
    } catch (error) {
        alert(error.message)
    }
    
    //
}

async function deleteCatch(e) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    await fetch(`http://localhost:3030/data/catches/${e.target.id}`, {
        method: 'DELETE',
        headers: {
            "X-Authorization": user.token
        }
    });
    e.target.parentElement.remove()
    showCatches()
}

function createLabel(name) {
  const label = document.createElement("label");
  label.textContent = name;
  return label;
}

function createInput(type, cls, val, id) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const input = document.createElement("input");
  input.type = type;
  input.classList.add(cls);
  input.value = val;
}
