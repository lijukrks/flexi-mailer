import { AmazonSesProvider } from "./providers/AmazonSesProvider";
import { EmailProvider } from "./interfaces/EmailProvider";
import { MailgunProvider } from "./providers/MailgunProvider";
import { PostmarkProvider } from "./providers/PostmarkProvider";
import { SendGridProvider } from "./providers/SendGridProvider";
import { SmtpProvider } from "./providers/SmtpProvider";

export enum ProviderType {
  smtp = "smtp",
  sendGrid = "sendGrid",
  mailGun = "mailGun",
  postmark = "postmark",
  ses = "ses",
}

export class EmailProviderFactory {
  private static providerMap: { [key in ProviderType]: () => EmailProvider } = {
    [ProviderType.smtp]: () => new SmtpProvider(),
    [ProviderType.sendGrid]: () => new SendGridProvider(),
    [ProviderType.mailGun]: () => new MailgunProvider(),
    [ProviderType.ses]: () => new AmazonSesProvider(),
    [ProviderType.postmark]: () => new PostmarkProvider(),
  };

  static createProvider(providerName: ProviderType): EmailProvider {
    const provider = this.providerMap[providerName];
    if (!provider) {
      throw new Error(`Unsupported email provider: ${providerName}`);
    }
    return provider();
  }
}
