function attachEvents() {
  //Capture elements
  const phonebookUl = document.getElementById('phonebook');
  const person = document.getElementById('person');
  const phone = document.getElementById('phone');
  const loadBtn = document.getElementById('btnLoad');
  const createBtn = document.getElementById('btnCreate');

  //Attach event listeners
  loadBtn.addEventListener('click', onLoad);
  createBtn.addEventListener('click', onCreate);

  //On load btn functionality
  async function onLoad() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(baseUrl);
    const data = await res.json();

    //Prevent to attach same text
    if (phonebookUl.textContent !== '') {
      phonebookUl.textContent = '';
    }
    Object.values(data).forEach(({ person, phone, _id }) => {
      //Create li and append current values
      const li = document.createElement('li');
      li.textContent = `${person}: ${phone}`;

      //Create deleteButton
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';

      //Attach event listener to deleteBtn and make it's functionality
      deleteBtn.addEventListener('click', async (e) => {
        //Remove current
        await fetch(`http://localhost:3030/jsonstore/phonebook/${_id}`, {
          method: 'delete',
        });

        //Remove li from Ul => Remove in the moment
        e.target.parentElement.remove();
      });

      //Append deleteBtn to li element
      li.appendChild(deleteBtn);

      //Append li element to main phoneBookUl
      phonebookUl.appendChild(li);
    });
    console.log('here', data);
  }

  //On create btn functionality
  async function onCreate() {
    const data = {
      person: person.value,
      phone: phone.value,
    };
    await fetch('http://localhost:3030/jsonstore/phonebook', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    person.value = '';
    phone.value = '';
  }
}

attachEvents();
