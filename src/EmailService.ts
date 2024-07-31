import { EmailProvider } from "./interfaces/EmailProvider";
import { EmailProviderFactory } from "./EmailProviderFactory";

export class EmailService {
  private provider: EmailProvider;

  constructor(providerName: string) {
    this.provider = EmailProviderFactory.createProvider(providerName);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.provider.sendEmail(to, subject, body);
  }
}
