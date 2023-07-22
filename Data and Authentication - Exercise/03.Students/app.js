//On page load
const tbody = document.querySelector('#results > tbody');

async function onLoadPage(e) {
  //Fetch students
  const res = await fetch(
    'http://localhost:3030/jsonstore/collections/students'
  );
  const data = await res.json();
  Object.values(data).forEach(
    ({ firstName, lastName, facultyNumber, grade, _id }) => {
      const tr = document.createElement('tr');

      const firstNameTd = document.createElement('td');
      firstNameTd.textContent = firstName;

      const lastNameTd = document.createElement('td');
      lastNameTd.textContent = lastName;

      const facultyNumberTd = document.createElement('td');
      facultyNumberTd.textContent = facultyNumber;

      const gradeTd = document.createElement('td');
      gradeTd.textContent = grade;
      // gradeTd.textContent = `${grade.toFixed(2)}`;

      tr.appendChild(firstNameTd);
      tr.appendChild(lastNameTd);
      tr.appendChild(facultyNumberTd);
      tr.appendChild(gradeTd);

      tbody.appendChild(tr);
    }
  );
}
onLoadPage();

// Creating new student
document.getElementById('form').addEventListener('submit', createStudent);

async function createStudent(e) {
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
    await fetch('http://localhost:3030/jsonstore/collections/students', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    //
    if (tbody.textContent !== '') {
      tbody.textContent = '';
    }
    clearData(firstName, lastName, facultyNumber, grade);
    onLoadPage();
  }
}

//Clear functionality
function clearData(fName, lName, fNumber, grade) {
  fName.textContent = '';
  lName.textContent = '';
  fNumber.textContent = '';
  grade.textContent = '';
}
