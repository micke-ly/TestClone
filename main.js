'use strict';

// ==============================
// VARIABLES AND SELECTORS
// ==============================

// SELECTORS
const registerToggle = document.getElementById('register-toggle');
const loginToggle = document.getElementById('login-toggle');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// VARIABLES

// ==============================
// FUNCTIONS
// ==============================

// FORM TOGGLE FUNCTIONS
function changeToRegister() {
  if (
    registerForm.classList.contains('inactive-form') &&
    registerToggle.classList.contains('form-toggle-inactive')
  ) {
    registerForm.classList.remove('inactive-form');
    loginForm.classList.add('inactive-form');

    loginToggle.classList.remove('form-toggle-active');
    registerToggle.classList.add('form-toggle-active');
    loginToggle.classList.add('form-toggle-inactive');
    registerToggle.classList.remove('form-toggle-inactive');
  }
}
function changeToLogin() {
  if (
    loginForm.classList.contains('inactive-form') &&
    loginToggle.classList.contains('form-toggle-inactive')
  ) {
    loginForm.classList.remove('inactive-form');
    registerForm.classList.add('inactive-form');

    registerToggle.classList.remove('form-toggle-active');
    loginToggle.classList.remove('form-toggle-inactive');
    loginToggle.classList.add('form-toggle-active');
    registerToggle.classList.add('form-toggle-inactive');
  }
}

function setupLocalStorage() {
  const users = localStorage.getItem('users');
  if (users === null) {
    const existingUsers = [];
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }
}

function clearInputs(form) {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = '';
  });
}

// ==============================
// INITIALIZATION
// ==============================

// SETUP LOCAL STORAGE
setupLocalStorage();

// ==============================
// EVENT LISTENERS
// ==============================

// FORM TOGGLE
registerToggle.addEventListener('click', changeToRegister);
loginToggle.addEventListener('click', changeToLogin);

// REGISTER FORM - COLLECT USER DATA
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //Get input values
  const firstName = event.target.elements.firstname.value;
  const lastName = event.target.elements.lastname.value;
  const userName = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  const email = event.target.elements.email.value;

  // Validate input values and store the result
  const isValidFirstName = /^[A-Z][a-z]+$/.test(firstName);
  const isValidLastName = /^[A-Z][a-z]+$/.test(lastName);
  const isValidUserName = /^[a-zA-Z0-9_-]{3,15}$/.test(userName);
  const isValidPassword =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(
      password
    );
  const isValidEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
  const users = JSON.parse(localStorage.getItem('users'));
  const hasUserName = users.some((user) => user.userName === userName);
  const hasEmail = users.some((user) => user.email === email);

  if (
    isValidFirstName &&
    isValidLastName &&
    isValidUserName &&
    isValidPassword &&
    isValidEmail &&
    !hasUserName &&
    !hasEmail
  ) {
    const userData = {
      firstName,
      lastName,
      userName,
      password,
      email,
    };

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    clearInputs(registerForm);
  } else {
    console.log('invalid input');
  }
});

registerForm.addEventListener('input', (event) => {
  if (event.target.name === 'firstname') {
    let x = event.target.value;
    console.log(x);
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userName = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  const users = JSON.parse(localStorage.getItem('users'));
  const hasUserName = users.some((user) => user.userName == userName);
  const hasPassword = users.some((user) => user.password == password);

  if (hasUserName && hasPassword) {
    window.location.href = 'rps.html';
  } else {
    console.log('no user exists');
  }
});
