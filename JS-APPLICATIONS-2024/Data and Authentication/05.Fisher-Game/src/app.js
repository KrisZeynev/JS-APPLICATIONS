// const token = sessionStorage.getItem("accessToken");
// const userEmail = sessionStorage.getItem("userEmail");

// const divUser = document.querySelector("#user");
// const divGuest = document.querySelector("#guest");
// const divCathes = document.querySelector("#catches");
// const loadBtn = document.querySelector(".load");
// const addForm = document.querySelector("#addForm");
// const addBtn = document.querySelector(".add");
// addForm.addEventListener("submit", onAddCatch);
// const spanName = document.querySelector("body > header > nav > p > span");
// loadBtn.addEventListener("click", loadAllCathes);
// const logOutBtn = document.querySelector("#logout");
// logOutBtn.addEventListener("click", async () => {
//   await fetch("http://localhost:3030/users/logout", {
//     headers: {
//       "X-Authorization": token,
//     },
//   });
//   sessionStorage.removeItem("accessToken");
//   sessionStorage.removeItem("userEmail");
//   sessionStorage.removeItem("userId");
//   window.location.assign("./index.html");
// });

// divCathes.style.display = "none";

// if (userEmail) {
//   divUser.style.display = "inline";
//   divGuest.style.display = "none";
//   addBtn.disabled = false;
//   spanName.textContent = userEmail;
// } else {
//   divUser.style.display = "none";
//   divGuest.style.display = "inline";
//   spanName.textContent = "guest";
//   addBtn.disabled = true;
// }

// async function loadAllCathes() {
//   let url = "http://localhost:3030/data/catches";
//   let response = await fetch(url);
//   if (!response.ok) {
//     alert(response.statusText);
//     // throw new Error(response.statusText);
//   }
//   const data = await response.json();
//   // Object.values(data).forEach(x => {
//   //   console.log(x);

//   // })

//   divCathes.style.display = "inline";
//   divCathes.replaceChildren();

//   Object.values(data).forEach(
//     ({
//       _ownerId,
//       angler,
//       weight,
//       species,
//       location,
//       bait,
//       captureTime,
//       _id,
//     }) => {
//       divCathes.appendChild(
//         renderSingleCatch(
//           _ownerId,
//           angler,
//           weight,
//           species,
//           location,
//           bait,
//           captureTime,
//           _id
//         )
//       );
//     }
//   );
// }

// function renderSingleCatch(
//   ownerId,
//   angler,
//   weight,
//   species,
//   location,
//   bait,
//   captureTime,
//   id
// ) {
//   const currId = sessionStorage.getItem("userId");

//   const divCatch = document.createElement("div");
//   divCatch.classList.add("catch");
//   divCatch.innerHTML = `<label>Angler</label>
//                         <input type="text" class="angler" ${
//                           currId !== ownerId ? "disabled" : ""
//                         } value="${angler}">
//                         <label>Weight</label>
//                         <input type="text" class="weight" ${
//                           currId !== ownerId ? "disabled" : ""
//                         } value="${weight}">
//                         <label>Species</label>
//                         <input type="text" class="species" ${
//                           currId !== ownerId ? "disabled" : ""
//                         } value="${species}">
//                         <label>Location</label>
//                         <input type="text" class="location" ${
//                           currId !== ownerId ? "disabled" : ""
//                         } value="${location}">
//                         <label>Bait</label>
//                         <input type="text" class="bait" ${
//                           currId !== ownerId ? "disabled" : ""
//                         } value="${bait}">
//                         <label>Capture Time</label>
//                         <input type="number" class="captureTime"${
//                           currId !== ownerId ? "disabled" : ""
//                         }  value="${captureTime}">
//                         <button class="update" data-id="${id}" ${
//     currId !== ownerId ? "disabled" : ""
//   }>Update</button>
//                         <button class="delete" data-id="${id}" ${
//     currId !== ownerId ? "disabled" : ""
//   }>Delete</button>`;

//   const updateButton = divCatch.querySelector(".update");
//   if (currId === ownerId) {
//     updateButton.addEventListener("click", onUpdate);
//   }

//   const deleteButton = divCatch.querySelector(".delete");
//   if (currId === ownerId) {
//     deleteButton.addEventListener("click", onDelete);
//   }
//   return divCatch;
// }

// async function onAddCatch(e) {
//   e.preventDefault();
//   // const data = Object.fromEntries(new FormData(e.target));
//   const { angler, bait, captureTime, location, species, weight } =
//     Object.fromEntries(new FormData(e.target));

//   // const obj = [...data.entries()].reduce(
//   //   (a, [k, v]) => Object.assign(a, { [k]: v }),
//   //   {}
//   // );
//   try {
//     const isAnyEmpty = Object.values(
//       Object.fromEntries(new FormData(e.target))
//     ).some((x) => x == "");
//     if (isAnyEmpty) {
//       alert("All fields must be filled!");
//       // throw new Error("All fields must be filled!");
//       // return
//     }

//     const response = await fetch("http://localhost:3030/data/catches", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Authorization": token,
//       },
//       body: JSON.stringify({
//         angler,
//         bait,
//         captureTime,
//         location,
//         species,
//         weight,
//       }),
//     });
//     if (!response.ok) {
//       const error = await response.json();
//       // throw new Error(error.message);
//       alert(error.message);
//     }
//     const data = await response.json();
//     // console.log('ajde ' + data);

//     e.target.reset();
//     loadAllCathes();
//   } catch (error) {
//     alert(error.message);
//   }
// }

// // async function onUpdate(e) {
// //   const currId = e.target.getAttribute("data-id");
// //   const parentElement = e.target.parentElement;
// //   const anglerInput = parentElement.querySelector(".angler").value;
// //   const weightInput = parentElement.querySelector(".weight").value;
// //   const speciesInput = parentElement.querySelector(".species").value;
// //   const locationInput = parentElement.querySelector(".location").value;
// //   const baitInput = parentElement.querySelector(".bait").value;
// //   const captureTimeInput = parentElement.querySelector(".captureTime").value;

// //   if (
// //     anglerInput == "" ||
// //     weightInput == "" ||
// //     speciesInput == "" ||
// //     locationInput == "" ||
// //     baitInput == "" ||
// //     captureTimeInput == ""
// //   ) {
// //     alert("All fields must be filled!");
// //     throw new Error("All fields must be filled!");
// //   }

// //   console.log(anglerInput, weightInput, speciesInput, locationInput, baitInput, captureTimeInput);
  

// //   await fetch(`http://localhost:3030/data/catches/${currId}`, {
// //     method: "PUT",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "X-Authorization": token
// //     },
// //     body: JSON.stringify({anglerInput, weightInput, speciesInput, locationInput, baitInput, captureTimeInput})
// //   })
// //   loadAllCathes()
// // }

// async function onUpdate(e) {
//   const currId = e.target.getAttribute("data-id");
//   const parentElement = e.target.parentElement;

//   // Get input values
//   const anglerInput = parentElement.querySelector(".angler").value;
//   const weightInput = parentElement.querySelector(".weight").value;
//   const speciesInput = parentElement.querySelector(".species").value;
//   const locationInput = parentElement.querySelector(".location").value;
//   const baitInput = parentElement.querySelector(".bait").value;
//   const captureTimeInput = parentElement.querySelector(".captureTime").value;

//   // Check if any fields are empty
//   if (
//     anglerInput == "" ||
//     weightInput == "" ||
//     speciesInput == "" ||
//     locationInput == "" ||
//     baitInput == "" ||
//     captureTimeInput == ""
//   ) {
//     alert("All fields must be filled!");
//     return; // Stop further execution if fields are empty
//   }

//   // Log the input values (for debugging purposes)
//   // console.log(anglerInput, weightInput, speciesInput, locationInput, baitInput, captureTimeInput);

//   try {
//     // Perform the PUT request
//     const response = await fetch(`http://localhost:3030/data/catches/${currId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Authorization": token, // Ensure `token` is defined
//       },
//       body: JSON.stringify({
//         angler: anglerInput,
//         weight: weightInput,
//         species: speciesInput,
//         location: locationInput,
//         bait: baitInput,
//         captureTime: captureTimeInput
//       })
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       // throw new Error(error.message); // Handle API errors
//       alert(error.message); // Handle API errors
//     }

//     // Reload all catches if successful
//     loadAllCathes();
//   } catch (error) {
//     console.error("Error updating catch:", error);
//     alert(error.message); // Show error message to user
//   }
// }


// async function onDelete(e) {
//   const currId = e.target.getAttribute("data-id");

//   await fetch(`http://localhost:3030/data/catches/${currId}`, {
//     method: "DELETE",
//     headers: {
//       "X-Authorization": token,
//     },
//   });
//   e.target.parentElement.remove();
// }
