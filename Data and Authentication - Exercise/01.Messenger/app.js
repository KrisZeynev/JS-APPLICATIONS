function attachEvents() {
  //Capture elements
  const textArea = document.querySelector('#messages');
  const name = document.querySelector(
    '#controls > input[type=text]:nth-child(2)'
  );
  const messages = document.querySelector(
    '#controls > input[type=text]:nth-child(5)'
  );
  const sendBtn = document.querySelector('#submit');
  const refreshBtn = document.querySelector('#refresh');

  //Attach event listeners to the buttons
  sendBtn.addEventListener('click', onSend);
  refreshBtn.addEventListener('click', onRefresh);

  //Send btn functionality
  async function onSend() {
    const data = {
      author: name.value,
      content: messages.value,
    };
    await fetch('http://localhost:3030/jsonstore/messenger', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    name.value = '';
    messages.value = '';
  }

  //Refresh btn functionality
  async function onRefresh() {
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(baseUrl);
    const data = await res.json();

    //Clear the textarea => prevent error
    if (textArea.innerHTML !== '') {
      textArea.innerHTML = '';
    }
    const arrData = [];
    Object.values(data).forEach(({ author, content, _id }) => {
      console.log(author);
      arrData.push(`${author}: ${content}`);
    });
    textArea.innerHTML = `${arrData.join('\n')}`;
  }
}

attachEvents();
