const list = document.getElementsByClassName('list')[0];
const reset = document.getElementById('resetButton');

list.addEventListener('click', (e) => {
  const id = e.target.id ? e.target.id : e.target.parentElement.id;
  if (id) {
    window.location.href = `/work/${id}`;
  }
});

resetButton.addEventListener('click', (e) => {
  window.location.href = '/reset';
});
