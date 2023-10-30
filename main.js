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
registerForm.addEventListener('submit', () => {});
