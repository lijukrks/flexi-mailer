import AWS from "aws-sdk";
import { EmailProvider } from "../types";

export class AmazonSesProvider implements EmailProvider {
  private ses: AWS.SES;
  private region: string;
  private sourceEmail: string;

  constructor() {
    this.region = process.env.AWS_REGION!;
    this.sourceEmail = process.env.AWS_SOURCE_EMAIL!;

    if (!this.region) {
      throw new Error("AWS region is missing.");
    }

    if (!this.sourceEmail) {
      throw new Error("AWS source email address is missing.");
    }

    AWS.config.update({ region: this.region });
    this.ses = new AWS.SES({ apiVersion: "2010-12-01" });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.ses
        .sendEmail({
          Source: this.sourceEmail,
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Body: {
              Text: { Data: body },
            },
            Subject: { Data: subject },
          },
        })
        .promise();
    } catch (error) {
      throw new Error("Email sending failed.");
    }
  }
}
