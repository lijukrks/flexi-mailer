import { EmailProvider } from '../types';
import mailgun from 'mailgun-js';

export class MailgunProvider implements EmailProvider {
  private mg: mailgun.Mailgun;
  private apiKey: string;
  private domain: string;
  private from: string;

  constructor() {
    this.apiKey = process.env.MAILGUN_API_KEY!;
    this.domain = process.env.MAILGUN_DOMAIN!;
    this.from = process.env.MAILGUN_FROM!;

    if (!this.apiKey) {
      throw new Error('Mailgun API key is missing.');
    }

    if (!this.domain) {
      throw new Error('Mailgun domain is missing.');
    }

    if (!this.from) {
      throw new Error('Mailgun sender email address is missing.');
    }

    this.mg = mailgun({ apiKey: this.apiKey, domain: this.domain });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.mg.messages().send({
        from: this.from,
        to,
        subject,
        text: body,
      });
    } catch (error) {
      throw new Error('Email sending failed.');
    }
  }
}
