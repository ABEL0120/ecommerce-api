const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationCode = async (to, code) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Ecommerce API" <no-reply@ecommerce.com>',
      // to: to,
      to: "lujanlom0120@gmail.com",
      subject: "Tu código de verificación",
      text: `Tu código de verificación es: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verificación de Login</h2>
          <p>Usa el siguiente código para completar tu inicio de sesión:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${code}</h1>
          <p>Este código expirará pronto.</p>
        </div>
      `,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
  }
};

module.exports = {
  sendVerificationCode,
};
