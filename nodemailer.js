const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: 'ecounity.info@gmail.com',
    pass: 'jbmh tiol hzcy scgx',
  },
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Ruta para manejar la solicitud de recuperación de contraseña
app.post("/api/v1/auth/recovery", async (req, res, next) => {
  const { email } = req.body;

  try {
    // Envía el correo de recuperación al correo electrónico proporcionado por el usuario
    const info = await transporter.sendMail({
      from: config.mailUser, // Remitente
      to: email, // Destinatario
      subject: "NUEVO CORREO", // Asunto
      text: "BIENVENID@", // Cuerpo del correo electrónico (texto sin formato)
      html: "<b>Hello world?</b>", // Cuerpo del correo electrónico (HTML)
    });

    console.log("Message sent: %s", info.messageId);
    res.sendStatus(200); // Envío exitoso
  } catch (error) {
    console.error("Error sending email:", error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});

// Inicia el servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
