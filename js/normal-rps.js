const modalToggleBtns = document.querySelectorAll('.modal-toggle');
const modal = document.getElementById('modal');

modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.toggle('modal-inactive');
  });
});
