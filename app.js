

//Global variables
let employees = displayEmployees;
const urlApi = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const urlNat = 'https://randomuser.me/api/?nat=us';

const modalClose = document.querySelector(".modal-close");



/*---------------------
    Fetch Functions
-----------------------*/


fetch(urlApi)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch((err) => Error(err.responseText));

  fetch(urlNat)
    .then(res => res.json())
    .then(res => res.results)
    // .then(searchEmployees)



/*---------------------
    Helper functions
-----------------------*/

// Displays the employee data content on the page

function displayEmployees(employeeData) {
   employees = employeeData;
   // using object literals to interpolate employee data into html
  let employeeHTML = "";

  // using a forEach loop to loop through employee data
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
            <div class="card" data-index="${index}">
            <div class="card-img-container">
                <img class="card-avatar" src="${picture.large}" alt="${name.first}'s profile picture"/>
              </div>
                <div class="card-text-container">
                    <h2 class="card-name">${name.first} ${name.last}</h2>
                    <p class="card-text">${email}</p>
                    <p class="card-text">${city}</p>
                </div>
            </div>
         `;
  });
  gridContainer.innerHTML = employeeHTML;
}

// Displays the Modal info on the page

function displayModal(index) {
  const modalContainer = document.querySelector(".modal-content");
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
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
            <p class="address">${city}, ${state} ${postcode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

  modalContainer.innerHTML = modalHTML;
  overlay.classList.remove("hidden");
}

/*--------------------------
Event Listeners
---------------------------*/

//When cards on the page are clicked the modal on the page appears
gridContainer.addEventListener('click', (e) => {
  let element = e.target;
if (element !== gridContainer) {
  const card = element.closest('.card');
  const index = card.getAttribute('data-index')
    
    displayModal(index);
    };
 
})

// When the X is clicked the modal closes

modalClose.addEventListener("click", (e) => {
  overlay.classList.add("hidden");
});

//=====================================================
    //Search bar functionality

const searchBar = document.querySelector(".search");


searchBar.addEventListener("keyup", function (e) {
  const term = e.target.value.toLowerCase();
  const card = document.querySelectorAll(".card-avatar");
  const cardText = document.getElementsByTagName('card-text-container');
  // const index = document.getAttribute('data-index')

  for (i = 0; i < card.length; i++) {
    const text = cardText[i].getAttribute('data-index').toLowerCase();
    const imageSearch = text.indexOf(term)
    if (imageSearch > -1) {
      cardText[i].style.display = 'block';
    } else {
        cardText[i].style.display = 'none';
    }
  }
});