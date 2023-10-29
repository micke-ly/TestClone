// SELECTORS
const registerToggle = document.getElementById('register-toggle');
const loginToggle = document.getElementById('login-toggle');
const registerForm = document.getElementById('register-form');
// const formToggleButton = document.querySelectorAll('.form-toggle-style');
const loginForm = document.getElementById('login-form');

function changeToLogin() {
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

function changeToRegister() {
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

// formToggleButton.forEach((button) => {
//   button.addEventListener('click', toggleForm);
// });

registerToggle.addEventListener('click', changeToLogin);
loginToggle.addEventListener('click', changeToRegister);
