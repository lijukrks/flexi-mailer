import { EmailProvider } from "../../../src/lib/types";
import { EmailProviderFactory } from "../../../src/lib/services/EmailProviderFactory";
import { EmailService } from "../../../src/lib/services/EmailService";
import { ProviderType } from "../../../src/lib";

jest.mock('../../../src/lib/services/EmailProviderFactory');
jest.mock('../../../src/lib/providers/SmtpProvider');
jest.mock('../../../src/lib/providers/SendGridProvider');
jest.mock('../../../src/lib/providers/MailgunProvider');
jest.mock('../../../src/lib/providers/AmazonSesProvider');
jest.mock('../../../src/lib/providers/PostmarkProvider');

describe('EmailService', () => {
  let mockProvider: jest.Mocked<EmailProvider>;

  beforeEach(() => {
    mockProvider = {
      sendEmail: jest.fn(),
    };

    (EmailProviderFactory.createProvider as jest.Mock).mockReturnValue(mockProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const providerTypes = [
    ProviderType.smtp,
    ProviderType.sendGrid,
    ProviderType.mailGun,
    ProviderType.ses,
    ProviderType.postmark,
  ];

  providerTypes.forEach((providerType) => {
    test(`should create an instance of EmailService with ${providerType} provider`, () => {
      const emailService = new EmailService(providerType);
      expect(EmailProviderFactory.createProvider).toHaveBeenCalledWith(providerType);
      expect(emailService).toBeInstanceOf(EmailService);
    });

    test(`should call sendEmail method on the ${providerType} provider`, async () => {
      const emailService = new EmailService(providerType);
      const to = 'test@example.com';
      const subject = 'Test Subject';
      const body = 'Test Body';

      await emailService.sendEmail(to, subject, body);

      expect(mockProvider.sendEmail).toHaveBeenCalledWith(to, subject, body);
    });

    test(`should throw an error if sending email fails for ${providerType}`, async () => {
      mockProvider.sendEmail.mockRejectedValueOnce(new Error('Email sending failed'));

      const emailService = new EmailService(providerType);

      await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).rejects.toThrow('Email sending failed');
    });
  });
});
