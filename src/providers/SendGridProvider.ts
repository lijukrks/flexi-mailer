import { EmailProvider } from "../interfaces/EmailProvider";
import sgMail from "@sendgrid/mail";

export class SendGridProvider implements EmailProvider {
  private apiKey: string;
  private from: string;
    constructor() {
        this.apiKey = process.env.SENDGRID_API_KEY!;
        this.from = process.env.SENDGRID_FROM!;
    
        if (!this.apiKey || !this.from) {
          throw new Error('Missing SendGrid environment variables');
        }
        sgMail.setApiKey(this.apiKey);
      }
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const msg = {
      to,
      from: this.from,
      subject,
      text: body,
    };
    await sgMail.send(msg);
  }
}
