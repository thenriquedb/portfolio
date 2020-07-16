module.exports = (data) => {
  const { name, email, service, message } = data;
  console.log(data);
  return `
    <html>
      <h1>Contato</h1>
      <strong>Name </strong>
      <span>${name}</span> <br>

      <strong>Email: </strong> <span>${email}</span> <br> 

      <strong>Serviço: </strong>
      <span>${service}</span> <br>
      <br>

      ${message}
    </html>
  `;
};
