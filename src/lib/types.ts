export enum ProviderType {
  smtp = "smtp",
  sendGrid = "sendGrid",
  mailGun = "mailGun",
  postmark = "postmark",
  ses = "ses",
}

export interface EmailProvider {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
