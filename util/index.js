exports.getFormattedDate = (date) => {
  const year = date.getFullYear();
  const m = date.getMonth() + 1;
  const month = m >= 10 ? m : '0' + m;
  const d = date.getDate();
  const day = d >= 10 ? d : '0' + d;
  return `${year}-${month}-${day}`;
};
