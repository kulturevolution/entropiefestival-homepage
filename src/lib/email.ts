import nodemailer from 'nodemailer';
import { SupporterData } from './validation';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendSupporterEmail(data: SupporterData) {
  const { firstName, lastName, pronoun, email } = data;

  const textContent = `
    Neue Supporter:innen-Anmeldung:
    Pronomen: ${pronoun}
    Rufname: ${firstName}
    Nachname: ${lastName}
    E-Mail: ${email}
  `;

  const htmlContent = `
    <h2>Neue Supporter:innen-Anmeldung</h2>
    <p><strong>Pronomen:</strong> ${escapeHtml(pronoun)}</p>
    <p><strong>Rufname:</strong> ${escapeHtml(firstName)}</p>
    <p><strong>Nachname:</strong> ${escapeHtml(lastName)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'entropiefestival - Neue Supporter:innen-Anmeldung',
    text: textContent,
    html: htmlContent,
  });
}

// Prevent XSS in email HTML
function escapeHtml(unsafe: string | undefined) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
