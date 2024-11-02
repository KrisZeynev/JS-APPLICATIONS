async function lockedProfile() {
  let url = "http://localhost:3030/jsonstore/advanced/profiles";
  let allData = await fetch(url).then(data => data.json());
  Object.entries(allData).forEach(person => {
    let [currId, username, email, age] = [person[1]._id, person[1].username, person[1].email, person[1].age] 
    let newPr = createProfile(username, email, age)
    document.querySelector('#main').appendChild(newPr)
    

  })

  function createProfile(currUsername, currEmail, currAge) {
    let divProfile = document.createElement('div');
    divProfile.classList.add('profile')

    let img1 = document.createElement('img');
    img1.classList.add('userIcon');
    img1.src = './iconProfile2.png';

    let label1 = document.createElement('label');
    label1.innerHTML = 'Lock';

    let input1 = document.createElement('input');
    input1.type = 'radio';
    input1.name = 'user1Locked';
    input1.value = 'lock';
    input1.checked = true;

    let label2 = document.createElement('label');
    label2.innerHTML = 'Unlock';

    let input2 = document.createElement('input');
    input2.type = 'radio';
    input2.name = 'user1Locked';
    input2.value = 'unlock';

    let hr1 = document.createElement('hr');

    let label3 = document.createElement('label');
    label3.innerHTML = 'Username';

    let input3 = document.createElement('input');
    input3.type = 'text';
    input3.name = 'user1Username';
    input3.value = currUsername;
    input3.disabled = true;
    input3.readOnly = true;

    let divUsername = document.createElement('div');
    divUsername.classList.add('user1Username');

    let hr2 = document.createElement('hr');

    let label4 = document.createElement('label');
    label4.innerHTML = 'Email:';

    let input4 = document.createElement('input');
    input4.type = 'email';
    input4.name = 'user1Email';
    input4.value = currEmail;
    input4.disabled = true;
    input4.readOnly = true;

    let label5 = document.createElement('label');
    label5.innerHTML = 'Age:';

    let input5 = document.createElement('input');
    input5.type = 'number';
    input5.name = 'user1Age';
    input5.value = currAge;
    input5.disabled = true;
    input5.readOnly = true;

    let btn = document.createElement('button')
    btn.innerHTML = 'Show more';
    btn.addEventListener('click', () => {
        
        if (input1.checked == true) {
            input1.checked = false
            input2.checked = true
            divUsername.style.display = 'none'
        } else {
            input2.checked = false
            input1.checked = true
            divUsername.style.display = 'block'
        }
        
    })

    divUsername.appendChild(hr2)
    divUsername.appendChild(label4)
    divUsername.appendChild(input4)
    divUsername.appendChild(label5)
    divUsername.appendChild(input5)
    

    divProfile.appendChild(img1)
    divProfile.appendChild(label1)
    divProfile.appendChild(input1)
    divProfile.appendChild(label2)
    divProfile.appendChild(input2)
    divProfile.appendChild(hr1)
    divProfile.appendChild(label3)
    divProfile.appendChild(input3)
    divProfile.appendChild(divUsername)
    divProfile.appendChild(btn)

    return divProfile
  }


//   function showNotShow(e) {
//     console.log(e.currentTarget)
//     document.querySelector('.user1Username').style.display = 'none'
//   }
}

{/* <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="" disabled readonly />
				<div class="user1Username">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="" disabled readonly />
					<label>Age:</label>
					<input type="number" name="user1Age" value="" disabled readonly />
				</div>
				
				<button>Show more</button>
			</div> */}