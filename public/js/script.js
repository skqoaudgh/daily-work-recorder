const list = document.getElementsByClassName('list')[0];
const reset = document.getElementById('resetButton');
const download = document.getElementById('downloadButton');

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

download &&
  download.addEventListener('click', (e) => {
    html2canvas(list).then((canvas) => {
      const image = canvas.toDataURL();
      const fileName = getFormattedDate(new Date());
      const link = document.createElement('a');
      link.download = fileName;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
