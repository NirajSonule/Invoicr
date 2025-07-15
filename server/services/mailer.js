import transporter from "../utils/emailTransporter.js";

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `Invoicr <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: "🎉 Welcome to Invoicr, " + userName + "!",
    text: `Hello ${userName}, welcome to Invoicr.`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333;">Welcome to <span style="color: #4CAF50;">Invoicr</span>, ${userName} 🎉</h2>
          <p style="font-size: 16px; color: #555;">
            We're excited to have you on board! With Invoicr, you can easily manage your clients, create beautiful invoices, and stay organized.
          </p>
          <p style="font-size: 16px; color: #555;">
            If you have any questions or need help getting started, we're just an email away.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 14px; color: #999;">Happy invoicing,<br>The Invoicr Team</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendResetPassEmail = async (userEmail, userName, otp) => {
  const mailOptions = {
    from: `Invoicr <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: "Password Reset for Invoicr Account",
    html: `
        <div style="font-family: Arial, sans-serif;">
            <h2>Password Reset Request</h2>
            <p>Hi ${userName},</p>
            <p>Use the following OTP to reset your Invoicr password:</p>
            <h3 style="color: #4CAF50;">${otp}</h3>
            <p>If you did not request this, please ignore this email.</p>
            <p>— The Invoicr Team</p>
        </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

const invoiceEmailer = async (
  clientEmail,
  clientName,
  userName,
  pdfBuffer,
  subject,
  footer
) => {
  const mailOptions = {
    from: `"${userName}" <${process.env.GMAIL_USER}>`,
    to: clientEmail,
    subject: subject,
    html: `
      <p>Hi ${clientName},</p>
      <p>Please find attached your invoice.</p>
      <p>${footer}</p>
    `,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

export { sendWelcomeEmail, sendResetPassEmail, invoiceEmailer };
