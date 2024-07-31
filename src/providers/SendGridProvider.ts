import { EmailProvider } from "../interfaces/EmailProvider";
import sgMail from "@sendgrid/mail";

export class SendGridProvider implements EmailProvider {
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY;
        const from = process.env.SENDGRID_FROM;
        const templateId = process.env.SENDGRID_TEMPLATE_ID;
    
        if (!apiKey || !from || !templateId) {
          throw new Error('Missing SendGrid environment variables');
        }
        sgMail.setApiKey(apiKey);
      }
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
    };
    // await sgMail.send(msg);
  }
}
