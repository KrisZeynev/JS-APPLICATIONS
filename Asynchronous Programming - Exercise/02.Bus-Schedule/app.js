function solve() {
  let nextStop = 'depot';
  let stopName = '';

  async function depart() {
    try {
      const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;
      const response = await fetch(url);
      const data = await response.json();

      nextStop = data.next;
      stopName = data.name;
      document.querySelector('.info').textContent = `Next stop ${stopName}`;
      document.querySelector('#depart').disabled = true;
      document.querySelector('#arrive').disabled = false;
    } catch (error) {
      document.querySelector('.info').textContent = 'Error';
      document.querySelector('#depart').disabled = true;
      document.querySelector('#arrive').disabled = true;
    }
  }

  function arrive() {
    document.querySelector('.info').textContent = `Arriving at ${stopName}`;
    document.querySelector('#depart').disabled = false;
    document.querySelector('#arrive').disabled = true;
    console.log('Arrive TODO...');
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
