async function getInfo() {
  let stopID = document.querySelector("#stopId").value;
  let url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

  let stopName = document.querySelector("#stopName");
  let buses = document.querySelector("#buses");

  try {
    buses.replaceChildren();
    let res = await fetch(url);

    if (res.status !== 200) {
      throw new Error("Stop ID is not correct!");
    }

    let data = await res.json();

    stopName.textContent = data.name;

    Object.entries(data.buses).forEach((x) => {
      let infoToShowForEach = `Bus ${x[0]} arrives in ${x[1]} minutes`;
      let currLi = document.createElement("li");
      currLi.textContent = infoToShowForEach;
      buses.appendChild(currLi);
    });
  } catch (error) {
    stopName.textContent = "Error";
  }
}
