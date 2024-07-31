import { AmazonSesProvider } from "./providers/AmazonSesProvider";
import { EmailProvider } from "./interfaces/EmailProvider";
import { MailgunProvider } from "./providers/MailgunProvider";
import { PostmarkProvider } from "./providers/PostmarkProvider";
import { SendGridProvider } from "./providers/SendGridProvider";
import { SmtpProvider } from "./providers/SmtpProvider";

export class EmailProviderFactory {
  private static providerMap: { [key: string]: () => EmailProvider } = {
    smtp: () => new SmtpProvider(),
    sendgrid: () => new SendGridProvider(),
    mailgun: () => new MailgunProvider(),
    ses: () => new AmazonSesProvider(),
    postmark: () => new PostmarkProvider(),
  };

  static createProvider(providerName: string): EmailProvider {
    const provider = this.providerMap[providerName.toLowerCase()];
    if (!provider) {
      throw new Error(`Unsupported email provider: ${providerName}`);
    }
    return provider();
  }
}
