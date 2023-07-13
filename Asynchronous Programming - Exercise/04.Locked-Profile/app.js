async function lockedProfile() {
  const mainSection = document.querySelector('#main');

  //Get the data
  const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
  const data = await res.json();
  // console.log(data);
  Object.values(data).forEach(({ _id, username, email, age }) =>
    createProfile(_id, username, email, age)
  );

  function createProfile(id, username, email, age) {
    //Create profile div
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    const img = document.createElement('img');
    img.src = './iconProfile2.png';
    img.classList.add('userIcon');

    const lock = document.createElement('label');
    lock.textContent = 'Lock';

    const inputLock = document.createElement('input');
    inputLock.type = 'radio';
    inputLock.name = 'user1Locked';
    inputLock.value = 'lock';
    inputLock.checked = true;

    const unlock = document.createElement('label');
    unlock.textContent = 'Unlock';

    const inputUnlock = document.createElement('input');
    inputUnlock.type = 'radio';
    inputUnlock.name = 'user1Locked';
    inputUnlock.value = 'unlock';

    const br = document.createElement('br');
    const hr = document.createElement('hr');

    const usernamel = document.createElement('label');
    usernamel.textContent = 'Username';
    // usernamel.style.display = 'none';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = 'user1Username';
    usernameInput.value = username;
    usernameInput.disabled = true;
    usernameInput.readOnly = true;
    // usernameInput.style.display = 'none';

    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = id;

    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email:';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'user1Email';
    inputEmail.value = email;
    inputEmail.disabled = true;
    inputEmail.readOnly = true;

    const labelAge = document.createElement('label');
    labelAge.textContent = 'Age:';

    const inputAge = document.createElement('input');
    inputAge.type = 'email';
    inputAge.name = 'user1Age';
    inputAge.value = age;
    inputAge.disabled = true;
    inputAge.readOnly = true;

    //append elemtns to hidden div
    hiddenDiv.appendChild(hr);
    hiddenDiv.appendChild(labelEmail);
    hiddenDiv.appendChild(inputEmail);
    hiddenDiv.appendChild(labelAge);
    hiddenDiv.appendChild(inputAge);

    //Make style display none of hidden div
    hiddenDiv.style.display = 'none';

    //Create the btn
    const btn = document.createElement('button');
    btn.textContent = 'Show more';
    btn.addEventListener('click', (e) => {
      if (e.target.textContent === 'Show more' && inputUnlock.checked) {
        // usernamel.style.display = 'block';
        // usernameInput.style.display = 'block';
        e.target.textContent = 'Hide it';
        hiddenDiv.style.display = 'block';
      } else if (e.target.textContent === 'Hide it' && inputUnlock.checked) {
        // usernamel.style.display = 'none';
        // usernameInput.style.display = 'none';
        e.target.textContent = 'Show more';
        hiddenDiv.style.display = 'none';
      }
    });

    //Append elements to profileDiv
    profileDiv.appendChild(img);
    profileDiv.appendChild(lock);
    profileDiv.appendChild(inputLock);
    profileDiv.appendChild(unlock);
    profileDiv.appendChild(inputUnlock);
    profileDiv.appendChild(br);
    profileDiv.appendChild(hr);
    profileDiv.appendChild(usernamel);
    profileDiv.appendChild(usernameInput);
    profileDiv.appendChild(hiddenDiv);
    profileDiv.appendChild(btn);

    //Append to main section
    mainSection.appendChild(profileDiv);
  }

  // function disable() {

  //   // console.log(document.querySelectorAll('.profile'));
  //   // document.querySelectorAll('.profile');
  // }
  // disable();
  const profiles = Array.from(document.querySelectorAll('.profile'));
  profiles[0].remove();
}
