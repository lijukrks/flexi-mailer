import { EmailProvider } from "./interfaces/EmailProvider";
import { SendGridProvider } from "./providers/SendGridProvider";
import { SmtpProvider } from "./providers/SmtpProvider";

export class EmailProviderFactory {
  static createProvider(providerName: string): EmailProvider {
    switch (providerName) {
      case "smtp":
        return new SmtpProvider();
      case "sendgrid":
        return new SendGridProvider();
      default:
        throw new Error(`Unsupported email provider: ${providerName}`);
    }
  }
}
