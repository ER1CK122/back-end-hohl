import nodemailer from "nodemailer";
import { logger } from './logger';

// const account = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    logger.debug({ to, subject }, 'Iniciando envio de email');

    const mailOptions = { 
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    }
    
    await transporter.sendMail(mailOptions);

    logger.info({ to, subject }, 'Email enviado com sucesso');
  } catch (error) {
    logger.error({ 
      error,
      to,
      subject 
    }, 'Erro ao enviar email');
    throw error;
  }
}