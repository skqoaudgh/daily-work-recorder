const list = document.getElementsByClassName('list')[0];
const reset = document.getElementById('resetButton');
const mail = document.getElementById('mailButton');

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const m = date.getMonth() + 1;
  const month = m >= 10 ? m : '0' + m;
  const d = date.getDate();
  const day = d >= 10 ? d : '0' + d;
  return `${year}-${month}-${day}`;
};

list &&
  list.addEventListener('click', (e) => {
    const id = e.target.id ? e.target.id : e.target.parentElement.id;
    if (id) {
      window.location.href = `/work/${id}`;
    }
  });

reset &&
  reset.addEventListener('click', (e) => {
    window.location.href = '/reset';
  });

mail &&
  mail.addEventListener('click', (e) => {
    html2canvas(list).then((canvas) => {
      const url = canvas.toDataURL();
      const form = document.createElement('form');
      form.action = '/mail';
      form.method = 'post';

      const input = document.createElement('input');
      input.type = 'text';
      input.name = 'url';
      input.value = url;

      const submit = document.createElement('button');
      submit.type = 'submit';

      document.body.appendChild(form);
      form.appendChild(input);
      form.appendChild(submit);

      submit.click();

      document.body.removeChild(form);
    });
  });
