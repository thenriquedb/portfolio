require("dotenv/config");

const express = require("express");
const cors = require("cors");
const generateEmail = require("./generateEmail");

const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

console.log("process.env.EMAIL_USER", process.env.EMAIL_USER);
console.log("process.env.EMAIL_PASS", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "Hotmail",
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
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "Contato - Portfólio",
      html,
      replyTo: email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Erro ao enviar o email" });
  }

  return res.json({ message: "Email enviado com sucesso!" });
}

app.post("/send", sendEmail);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
