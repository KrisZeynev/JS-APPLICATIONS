async function getInfo() {
  const input = document.querySelector('#stopId').value;
  const stopNames = document.querySelector('#stopName');
  const busesUl = document.querySelector('#buses');
  const url = `http://localhost:3030/jsonstore/bus/businfo/${input}`;

  busesUl.innerHTML = '';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    stopNames.textContent = data.name;

    Object.entries(data.buses).forEach(([busId, time]) => {
      const li = document.createElement('li');
      li.textContent = `Bus ${busId} arrives in ${time} minutes`;
      busesUl.appendChild(li);
    });
  } catch (error) {
    stopNames.textContent = 'Error';
  }
}
