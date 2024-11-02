const submitBtn = document.querySelector("#submit");
const url = "http://localhost:3030/jsonstore/collections/students";
const tBody = document.querySelector("#results > tbody");

// on load page

async function onLoad(e) {
  let students = await fetch(url).then((res) => res.json());
  Object.values(students).forEach(
    ({ firstName, lastName, facultyNumber, grade, _id }) => {
      tBody.appendChild(createTR(firstName, lastName, facultyNumber, grade));
    }
  );
}
onLoad();

// create a new student
document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log('here');
  const formData = new FormData(e.target);
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const facultyNumber = formData.get('facultyNumber');
  const grade = formData.get('grade');

  if (
    typeof firstName === String ||
    firstName.length !== 0 ||
    typeof lastName === String ||
    lastName.length !== 0 ||
    typeof facultyNumber === Number ||
    facultyNumber.length !== 0 ||
    typeof grade === Number ||
    grade.length !== 0
  ) {
    const student = {
      firstName,
      lastName,
      facultyNumber,
      grade,
    };
    await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    //
    if (tBody.textContent !== '') {
      tBody.textContent = '';
    }
    onLoad();
    clearData(firstName, lastName, facultyNumber, grade);
  }
});

function createTR(fName, lName, FacNum, Gr) {
  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  td1.textContent = fName;
  let td2 = document.createElement("td");
  td2.textContent = lName;
  let td3 = document.createElement("td");
  td3.textContent = FacNum;
  let td4 = document.createElement("td");
  td4.textContent = Gr;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  return tr;
}

function clearData(fName, lName, FacNum, Gr) {
  fName.textContent = "";
  lName.textContent = "";
  FacNum.textContent = "";
  Gr.textContent = "";
}
