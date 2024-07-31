import { EmailProvider } from "../interfaces/EmailProvider";
import sgMail from "@sendgrid/mail";

export class SendGridProvider implements EmailProvider {
  private apiKey: string;
  private from: string;
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY!;
    this.from = process.env.SENDGRID_FROM!;

    if (!this.apiKey) {
      throw new Error("Missing SendGrid API key is missing.");
    }
    if (!this.from) {
      throw new Error("SendGrid sender email address is missing.");
    }
    sgMail.setApiKey(this.apiKey);
  }
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await sgMail.send({
        to,
        from: this.from,
        subject,
        text: body,
      });
    } catch (error) {
      throw new Error("Email sending failed.");
    }
  }
}
