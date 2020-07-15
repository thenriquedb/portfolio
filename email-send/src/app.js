const express = require("express");
const cors = require("cors");
const generateEmail = require("./generateEmail");

const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(req, res) {
  const html = generateEmail(req.body);

  const { email } = req.body;

  try {
    await transporter.sendMail({
      from: "thenriquedb@gmail.com",
      to: "thenrique2012@gmail.com",
      subject: "Contato - Portfólio",
      html,
      replyTo: email,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Erro ao enviar o email" });
  }

  return res.json({ message: "Email enviado com sucesso!" });
}

app.post("/send", sendEmail);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(3000);
