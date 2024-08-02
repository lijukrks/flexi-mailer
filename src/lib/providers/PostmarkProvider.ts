import { EmailProvider } from '../types';
import { ServerClient } from 'postmark';

export class PostmarkProvider implements EmailProvider {
  private client: ServerClient;
  private apiKey: string;
  private from: string;

  constructor() {
    this.apiKey = process.env.POSTMARK_API_KEY!;
    this.from = process.env.POSTMARK_FROM!;
    if (!this.apiKey) {
      throw new Error('Postmark API key is missing.');
    }
    if (!this.from) {
      throw new Error('Postmark sender email address is missing.');
    }
    this.client = new ServerClient(this.apiKey);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.client.sendEmail({
        From: this.from,
        To: to,
        Subject: subject,
        TextBody: body,
      });
    } catch (error) {
      throw new Error('Email sending failed.');
    }
  }
}
