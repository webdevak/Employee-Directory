//Global variables
let employees = [];
const urlApi = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");

/*---------------------
    Fetch Functions
-----------------------*/
fetch(urlApi)
  .then(response => response.json())
  .then(employeeData => displayEmployees(employeeData.results))
  .catch((err) => Error(err.responseText))

  fetch(urlApi)
    .then(response => response.json())
    .then(index => displayModal(index.results))
    
  

/*---------------------
    Helper functions
-----------------------*/
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = "";
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    
    employeeHTML += `
            <div class="card" data-index"${index}">
                <img class="avatar" src="${picture.large}"/>
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
         `;
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postalCode },
    picture
  } = employees[index];

  let date = new Date(dob.date);

  let modalHTML = `
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr/>
            <p>${phone}</p>
            <p class="address">${street}, ${state} ${postalCode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}



/*--------------------------
Event Listeners
---------------------------*/
gridContainer.addEventListener('click', e => {
    let element = e.target;
    if (element !== gridContainer) {
        const card = element.closest('.card');
        const index = card.getAttribute('data-index');

        // displayModal(index);
        console.log(displayModal(index));
    }
});

modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
});