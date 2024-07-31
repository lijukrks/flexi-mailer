import { AmazonSesProvider } from "./providers/AmazonSesProvider";
import { EmailProvider } from "./interfaces/EmailProvider";
import { MailgunProvider } from "./providers/MailgunProvider";
import { PostmarkProvider } from "./providers/PostmarkProvider";
import { SendGridProvider } from "./providers/SendGridProvider";
import { SmtpProvider } from "./providers/SmtpProvider";

export class EmailProviderFactory {
  static createProvider(providerName: string): EmailProvider {
    switch (providerName) {
      case "smtp":
        return new SmtpProvider();
      case "sendgrid":
        return new SendGridProvider();
      case "mailgun":
        return new MailgunProvider();
      case "ses":
        return new AmazonSesProvider();
      case "postmark":
        return new PostmarkProvider();
      default:
        throw new Error(`Unsupported email provider: ${providerName}`);
    }  }
}
