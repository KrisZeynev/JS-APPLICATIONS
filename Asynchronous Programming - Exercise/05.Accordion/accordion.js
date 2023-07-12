async function solution() {
  const mainSection = document.getElementById('main');
  const response = await fetch(
    `http://localhost:3030/jsonstore/advanced/articles/list`
  );
  const data = await response.json();
  //   console.log(data);
  Object.values(data).forEach(async ({ _id, title }) => {
    console.log(_id);
    console.log(title);

    //Create main div Accordion
    const divAccordion = document.createElement('div');
    divAccordion.classList.add('accordion');

    //Create div head
    const divHead = document.createElement('div');
    divHead.classList.add('head');

    //Create a span
    const span = document.createElement('span');
    span.textContent = title;

    //Create button
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.id = _id;
    btn.textContent = 'More';
    btn.addEventListener('click', onClick);

    //Functionality for btn
    function onClick(e) {
      if (e.target.textContent === 'More') {
        e.target.textContent = 'Hide';
        divExtra.style.display = 'block';
      } else {
        e.target.textContent = 'More';
        divExtra.style.display = 'none';
      }
    }

    //Append to head
    divHead.appendChild(span);
    divHead.appendChild(btn);

    //Create div extra
    const divExtra = document.createElement('div');
    divExtra.classList.add('extra');

    //Get info for each accordion
    const res = await fetch(
      `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
    );
    const info = await res.json();
    // console.log(info);

    //Create p for info
    const p = document.createElement('p');
    p.textContent = info.content;

    //Append to extra
    divExtra.appendChild(p);

    //Append to Accordion div
    divAccordion.appendChild(divHead);
    divAccordion.appendChild(divExtra);

    //Append to the section
    mainSection.appendChild(divAccordion);
  });
  //   console.log(main);
}
solution();
