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
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verifica tu cuenta</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
                  
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #1a1a1a; letter-spacing: -0.5px;">ECOMMERCE</h2>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding: 0 20px;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
                        
                        <tr>
                          <td height="6" style="background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);"></td>
                        </tr>

                        <tr>
                          <td style="padding: 48px 40px;">
                            <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 700; color: #111827; text-align: center;">Código de Verificación</h1>
                            
                            <p style="margin: 0 0 24px; font-size: 16px; line-height: 26px; color: #4b5563; text-align: center;">
                              Hemos recibido una solicitud para acceder a tu cuenta. Para continuar, introduce el siguiente código de seguridad:
                            </p>

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                              <tr>
                                <td align="center">
                                  <div style="background-color: #f3f4f6; border-radius: 12px; padding: 24px; display: inline-block; border: 1px solid #e5e7eb;">
                                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #111827; display: block; text-align: center;">${code}</span>
                                  </div>
                                </td>
                              </tr>
                            </table>

                            <p style="margin: 0; font-size: 14px; line-height: 22px; color: #6b7280; text-align: center;">
                              Este código expirará en <span style="color: #ef4444; font-weight: 600;">15 minutos</span>. No compartas este código con nadie.
                            </p>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #f3f4f6;">
                            <p style="margin: 0; font-size: 13px; line-height: 20px; color: #6b7280; text-align: center;">
                              Si no solicitaste este código, puedes ignorar este mensaje de forma segura. Alguien puede haber escrito mal su correo electrónico.
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-top: 24px;">
                      <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af;">
                        &copy; 2025 Ecommerce API. Todos los derechos reservados.
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        Calle Falsa 123, Ciudad de México, CDMX
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
