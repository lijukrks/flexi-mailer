import nodemailer, { Transporter } from "nodemailer";

import { EmailProvider } from "../interfaces/EmailProvider";

export class SmtpProvider implements EmailProvider {
  private transporter: Transporter;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;

    if (!host || !port || !user || !pass || !from) {
      throw new Error("SMTP configuration is incomplete.");
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM!,
        to,
        subject,
        text: body,
      });
    } catch (error) {
      console.error("Failed to send email via SMTP:", error);
      throw new Error("Email sending failed.");
    }
  }
}
