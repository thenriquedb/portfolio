module.exports = (data) => {
  const { name, email, hasLayout, message } = data;
  console.log(data);
  return `
    <html>
      <h1>Contato</h1>
      <strong>Name </strong>
      <span>${name}</span> <br>

      <strong>Email: </strong> <span>${email}</span> <br> 

      <strong>Possui layout: </strong>
      <span>${hasLayout ? "Sim" : "Não"}</span> <br>
      <br>

      ${message}
    </html>
  `;
};
