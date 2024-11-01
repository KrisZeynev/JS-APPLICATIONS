function solve() {
  // buttons
  const departBtn = document.querySelector("#depart");
  const arriveBtn = document.querySelector("#arrive");

  let spanShow = document.querySelector(".info");
  let url = "http://localhost:3030/jsonstore/bus/schedule";
  let currStop = "depot";

  async function depart() {
    arriveBtn.disabled = false;
    departBtn.disabled = true;

    let initialData = await fetch(`${url}/${currStop}`);
    let data = await initialData.json();
    spanShow.textContent = `Next stop ${data.name}`;
    currStop = data.next;
  }

  async function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;

    let initialData = await fetch(`${url}/${currStop}`);
    let data = await initialData.json();
    spanShow.textContent = `Next stop ${data.name}`;
    spanShow.textContent = `Arriving at ${data.name}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
