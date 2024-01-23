let formForStudents = document.querySelector('.form__for__students')
let btnA = document.querySelector('.btnA')
let inputA = document.querySelector('.inputA')
let nameAndSurname = document.querySelector('.name__and__surname')
let subject = document.querySelector('.subject')
let studentList = document.querySelector('#studentList');
const btnDelete = document.querySelector('.btnDelete')

inputA.addEventListener('input', saveLiOnSite);
nameAndSurname.addEventListener('input', saveLiOnSite);
subject.addEventListener('input', saveLiOnSite);

function saveToLocalStorageStudents() {
    let objStudents = {
        name: inputA.value, 
        age: 14, 
        surname: nameAndSurname.value, 
        subject: subject.value,
        subjectFromIt: 'Math'
    }
    let existingData = JSON.parse(localStorage.getItem('students')) || [];
    if (!Array.isArray(existingData)) {
        existingData = [];
      }    

      const isDuplicate = existingData.some(student => 
        student.name === objStudents.name &&
        student.surname === objStudents.surname &&
        student.subject === objStudents.subject
    );

    if (!isDuplicate) {
        existingData.push(objStudents);
        localStorage.setItem('students', JSON.stringify(existingData));
    } else {
        alert('This student is already in the list.');
    }
  
}

// formForStudents.addEventListener('submit', (event) => {
//     event.preventDefault();
//     saveToLocalStorageStudents();
//   });

function deleteStudent(student) {
  let existingDeleteData = JSON.parse(localStorage.getItem('students')) || [];

  const updatedData = existingDeleteData.filter(existingStudent => 
      existingStudent.name !== student.name ||
      existingStudent.surname !== student.surname ||
      existingStudent.subject !== student.subject
  );

  localStorage.setItem('students', JSON.stringify(updatedData));
  saveLiOnSite();
}


function saveLiOnSite() {
    studentList.innerHTML = '';

  let retrievedData = JSON.parse(localStorage.getItem('students')) || [];
  if (!Array.isArray(retrievedData)) {
    retrievedData = [];
  }

  retrievedData.forEach(student => {
    let ulElement = document.createElement('ul');
    let liElement = document.createElement('li');
    let deleteButton = document.createElement('button');

    liElement.classList.add('liEl');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btnDelete');

    liElement.textContent = `${student.name} ${student.surname} - ${student.subject}`;
    ulElement.appendChild(liElement);
    ulElement.appendChild(deleteButton);
    studentList.appendChild(ulElement);

    deleteButton.onclick = function() {
        deleteStudent(student);
    };
  });
}

  btnA.addEventListener('click', function (e) {
    e.preventDefault()
    saveToLocalStorageStudents();
    saveLiOnSite()
  });

window.onload = saveLiOnSite;
