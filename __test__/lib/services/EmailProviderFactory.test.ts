import { AmazonSesProvider } from "../../../src/lib/providers/AmazonSesProvider";
import { EmailProviderFactory } from "../../../src/lib/services/EmailProviderFactory";
import { MailgunProvider } from "../../../src/lib/providers/MailgunProvider";
import { PostmarkProvider } from "../../../src/lib/providers/PostmarkProvider";
import { ProviderType } from "../../../src/lib";
import { SendGridProvider } from "../../../src/lib/providers/SendGridProvider";
import { SmtpProvider } from "../../../src/lib/providers/SmtpProvider";

describe('EmailProviderFactory', () => {
  test('should create an instance of SmtpProvider', () => {
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "user";
    process.env.SMTP_PASS = "pass";
    process.env.SMTP_FROM = "sender@example.com";
    const provider = EmailProviderFactory.createProvider(ProviderType.smtp);
    expect(provider).toBeInstanceOf(SmtpProvider);
  });

  test('should create an instance of SendGridProvider', () => {
    process.env.SENDGRID_API_KEY = "SG.fake-api-key";
    process.env.SENDGRID_FROM = "sender@example.com";
    const provider = EmailProviderFactory.createProvider(ProviderType.sendGrid);
    expect(provider).toBeInstanceOf(SendGridProvider);
  });

  test('should create an instance of MailgunProvider', () => {
    process.env.MAILGUN_API_KEY = "fake-api-key";
    process.env.MAILGUN_DOMAIN = "fake-domain.com";
    process.env.MAILGUN_FROM = "sender@example.com";
    const provider = EmailProviderFactory.createProvider(ProviderType.mailGun);
    expect(provider).toBeInstanceOf(MailgunProvider);
  });

  test('should create an instance of AmazonSesProvider', () => {
    process.env.AWS_REGION = "us-east-1";
    process.env.AWS_SOURCE_EMAIL = "sender@example.com";
    const provider = EmailProviderFactory.createProvider(ProviderType.ses);
    expect(provider).toBeInstanceOf(AmazonSesProvider);
  });

  test('should create an instance of PostmarkProvider', () => {
    process.env.POSTMARK_API_KEY = "fake-api-key";
    process.env.POSTMARK_FROM = "sender@example.com";
    const provider = EmailProviderFactory.createProvider(ProviderType.postmark);
    expect(provider).toBeInstanceOf(PostmarkProvider);
  });

  test('should throw an error for unsupported provider type', () => {
    expect(() => {
      EmailProviderFactory.createProvider('unsupportedProvider' as ProviderType);
    }).toThrowError('Unsupported email provider: unsupportedProvider');
  });
});
