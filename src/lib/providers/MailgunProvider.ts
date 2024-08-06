import { EmailProvider } from '../types';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

export class MailgunProvider implements EmailProvider {
  private mg: IMailgunClient;
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

    const mailgun = new Mailgun(formData);
    this.mg = mailgun.client({ username: 'api', key: this.apiKey });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.mg.messages.create(this.domain, {
        from: this.from,
        to,
        subject,
        text: body,
      });
    } catch (_error) {
      throw new Error('Email sending failed.');
    }
  }
}
