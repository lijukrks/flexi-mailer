import { EmailProvider } from "../interfaces/EmailProvider";
import postmark from "postmark";

export class PostmarkProvider implements EmailProvider {
  private client: postmark.ServerClient;

  constructor() {
    this.client = new postmark.ServerClient(process.env.POSTMARK_API_KEY!);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.client.sendEmail({
      From: process.env.POSTMARK_FROM!,
      To: to,
      Subject: subject,
      TextBody: body,
    });
  }
}
