import { EmailProvider } from "../interfaces/EmailProvider";
import mailgun from "mailgun-js";

export class MailgunProvider implements EmailProvider {
  private mg: mailgun.Mailgun;

  constructor() {
    this.mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY!,
      domain: process.env.MAILGUN_DOMAIN!,
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const data = {
      from: process.env.MAILGUN_FROM!,
      to,
      subject,
      text: body,
    };

    await this.mg.messages().send(data);
  }
}
