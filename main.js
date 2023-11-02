'use strict';

// ==============================
// VARIABLES AND SELECTORS
// ==============================

// SELECTORS
const registerToggle = document.getElementById('register-toggle');
const loginToggle = document.getElementById('login-toggle');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const toggleButtons = document.querySelectorAll('.form-toggle-style');
const registerSubmitBtn = document.getElementById('registerSubmit');
const registerInputsList = registerForm.querySelectorAll('input');
const userExist = JSON.parse(localStorage.getItem('users'));
// VARIABLES

// ==============================
// FUNCTIONS
// ==============================

// FORM TOGGLE FUNCTIONS
// function changeToRegister() {
//   if (
//     // registerForm.classList.contains('inactive-form') &&
//     registerToggle.classList.contains('form-toggle-inactive')
//   ) {
//     registerForm.classList.remove('inactive-form');
//     loginForm.classList.add('inactive-form');

//     loginToggle.classList.remove('form-toggle-active');
//     registerToggle.classList.add('form-toggle-active');
//     loginToggle.classList.add('form-toggle-inactive');
//     registerToggle.classList.remove('form-toggle-inactive');
//   }
// }
// function changeToLogin() {
//   if (
//     // loginForm.classList.contains('inactive-form') &&
//     loginToggle.classList.contains('form-toggle-inactive')
//   ) {
//     loginForm.classList.remove('inactive-form');
//     registerForm.classList.add('inactive-form');

//     registerToggle.classList.remove('form-toggle-active');
//     loginToggle.classList.remove('form-toggle-inactive');
//     loginToggle.classList.add('form-toggle-active');
//     registerToggle.classList.add('form-toggle-inactive');
//   }
// }

function formClassToggle() {
  loginForm.classList.toggle('inactive-form');
  registerForm.classList.toggle('inactive-form');

  registerToggle.classList.toggle('form-toggle-active');
  loginToggle.classList.toggle('form-toggle-inactive');
  loginToggle.classList.toggle('form-toggle-active');
  registerToggle.classList.toggle('form-toggle-inactive');
}

function changeForm(button) {
  if (
    loginToggle.classList.contains('form-toggle-inactive') &&
    button.textContent.trim() == 'Login'
  ) {
    formClassToggle();
  } else if (
    registerToggle.classList.contains('form-toggle-inactive') &&
    button.textContent.trim() == 'Register'
  ) {
    formClassToggle();
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

// VALIDATION METHODS
const validationMethods = {
  firstname: function (value) {
    return /^[A-Z][a-z]+$/.test(value);
  },
  lastname: function (value) {
    return /^[A-Z][a-z]+$/.test(value);
  },
  username: function (value) {
    let isValid = /^[a-zA-Z0-9_-]{3,15}$/.test(value);
    const errorUsername = document.getElementById('error-username');
    if (!isValid) {
      errorUsername.textContent = 'Invalid Input';
      return false;
    } else if (isValid) {
      if (userExist.some((user) => user.userName == value)) {
        errorUsername.textContent = 'Username already exists';
        return false;
      } else {
        return isValid;
      }
    }
  },
  password: function (value) {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(
      value
    );
  },
  email: function (value) {
    let isValid = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value);
    const errorEmail = document.getElementById('error-email');
    if (!isValid) {
      errorEmail.textContent = 'Invalid Input';
      return false;
    } else if (isValid) {
      if (userExist.some((user) => user.email == value)) {
        errorEmail.textContent = 'Email already exists';
        return false;
      } else {
        return isValid;
      }
    }
  },
};

// ==============================
// INITIALIZATION
// ==============================

// SETUP LOCAL STORAGE
setupLocalStorage();

// ==============================
// EVENT LISTENERS
// ==============================

// FORM TOGGLE
toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    changeForm(button);
  });
});
// registerToggle.addEventListener('click', changeToRegister);
// loginToggle.addEventListener('click', changeToLogin);

// REGISTER FORM - COLLECT USER DATA
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get input values
  const firstName = event.target.elements.firstname.value;
  const lastName = event.target.elements.lastname.value;
  const userName = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  const email = event.target.elements.email.value;

  // const users = JSON.parse(localStorage.getItem('users'));
  // const userData = {
  //   firstName,
  //   lastName,
  //   userName,
  //   password,
  //   email,
  // };

  // users.push(userData);
  // localStorage.setItem('users', JSON.stringify(users));

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
    const registerInputs = registerForm.querySelectorAll('input');
    registerInputs.forEach((input) => {
      input.style.borderColor = 'black';
    });
    const success = document.getElementById('account-created');
    success.classList.remove('message-inactive');
    setTimeout(() => {
      success.classList.add('message-inactive');
    }, 3000);
  } else {
    console.log('invalid input');
  }
});

registerForm.addEventListener(
  'blur',
  (event) => {
    const errorMessage = document.getElementById('error-' + event.target.name);
    const validationFunction = validationMethods[event.target.name];
    if (validationFunction(event.target.value)) {
      event.target.style.borderColor = 'green';
      errorMessage.classList.add('message-inactive');
    } else {
      event.target.style.borderColor = 'red';
      errorMessage.classList.remove('message-inactive');
    }

    const registerFormArray = [...registerInputsList];

    let isInputsValid = registerFormArray.every(
      (a) => window.getComputedStyle(a).borderColor === 'rgb(0, 128, 0)'
    );

    if (isInputsValid) {
      registerSubmitBtn.disabled = false;
    } else {
      registerSubmitBtn.disabled = true;
    }

    // console.log(registerFormArray);
    // console.log(window.getComputedStyle(registerFormArray[0]).borderColor);
  },
  true
);

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
