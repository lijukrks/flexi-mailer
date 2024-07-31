import AWS from "aws-sdk";
import { EmailProvider } from "../interfaces/EmailProvider";

export class AmazonSesProvider implements EmailProvider {
  private ses: AWS.SES;

  constructor() {
    AWS.config.update({ region: process.env.AWS_REGION });
    this.ses = new AWS.SES({ apiVersion: "2010-12-01" });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params = {
      Source: process.env.AWS_SOURCE_EMAIL!,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },
        Subject: { Data: subject },
      },
    };

    await this.ses.sendEmail(params).promise();
  }
}
