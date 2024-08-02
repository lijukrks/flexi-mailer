import * as dotenv from 'dotenv';

import { EmailProvider, ProviderType } from '../types';

import { EmailProviderFactory } from './EmailProviderFactory';

dotenv.config();

export class EmailService {
  private provider: EmailProvider;

  constructor(providerName: ProviderType) {
    this.provider = EmailProviderFactory.createProvider(providerName);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.provider.sendEmail(to, subject, body);
  }
}
