import nodemailer, { Transporter } from "nodemailer";

import { EmailProvider } from "../interfaces/EmailProvider";

export class SmtpProvider implements EmailProvider {
  private transporter: Transporter;
  private port: number;
  private user: string;
  private pass: string;
  private from: string;
  private host: string;

  constructor() {
    this.host = process.env.SMTP_HOST!;
    this.port = Number(process.env.SMTP_PORT);
    this.user = process.env.SMTP_USER!;
    this.pass = process.env.SMTP_PASS!;
    this.from = process.env.SMTP_FROM!;

    if (!this.host) {
      throw new Error("SMTP host is missing.");
    }
    if (!this.port) {
      throw new Error("SMTP port is missing.");
    }
    if (!this.user) {
      throw new Error("SMTP user is missing.");
    }
    if (!this.pass) {
      throw new Error("SMTP password is missing.");
    }
    if (!this.from) {
      throw new Error("SMTP sender email address is missing.");
    }

    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: { user: this.user, pass: this.pass },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        text: body,
      });
    } catch (error) {
      throw new Error("Email sending failed.");
    }
  }
}
