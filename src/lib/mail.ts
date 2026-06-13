import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailProps {
  to: string;
  subject: string;
  data: unknown;
}

export async function sendEmail({
  to,
  subject,
  data,
}: SendEmailProps) {
  console.log(data);

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
  <h2>${subject} </h2>
  <pre>${JSON.stringify(data, null, 2)}</pre>
`
  });
}