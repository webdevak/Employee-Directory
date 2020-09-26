//Global variables
let employees = displayEmployees;
const urlApi = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");

const modalClose = document.querySelector(".modal-close");


/*---------------------
    Fetch Functions
-----------------------*/
fetch(urlApi)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch((err) => Error(err.responseText));



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


function displayModal(index) {
  const modalContainer = document.querySelector(".modal-content");
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postalCode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  let modalHTML = `
        <img class="avatar" src="${employee.picture.large}"/>
        <div class="text-container">
            <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
            <p class="email">${employee.email}</p>
            <p class="address">${employee.city}</p>
            <hr/>
            <p>${employee.phone}</p>
            <p class="address">${employee.street}, ${employee.state} ${employee.postalCode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

  modalContainer.innerHTML = modalHTML;
  overlay.classList.remove("hidden");
}

/*--------------------------
Event Listeners
---------------------------*/

// gridContainer.querySelectorAll('.card').forEach((card,index) => {
  

// });

gridContainer.addEventListener('click', (e) => {
  let element = e.target;
if (element !== gridContainer) {
 console.log(displayModal(displayEmployees));
}
})


modalClose.addEventListener("click", (e) => {
  overlay.classList.add("hidden");
});
