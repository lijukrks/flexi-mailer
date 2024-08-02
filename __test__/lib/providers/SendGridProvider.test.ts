import { SendGridProvider } from '../../../src/lib/providers/SendGridProvider';
import sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail');

describe('SendGridProvider', () => {
  let sendGridProvider: SendGridProvider;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };

    process.env.SENDGRID_API_KEY = 'fake-api-key';
    process.env.SENDGRID_FROM = 'sender@example.com';

    sendGridProvider = new SendGridProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  test('should throw error if SENDGRID_API_KEY is missing', () => {
    delete process.env.SENDGRID_API_KEY;
    expect(() => new SendGridProvider()).toThrow(
      'Missing SendGrid API key is missing.',
    );
  });

  test('should throw error if SENDGRID_FROM is missing', () => {
    delete process.env.SENDGRID_FROM;
    expect(() => new SendGridProvider()).toThrow(
      'SendGrid sender email address is missing.',
    );
  });

  test('should send an email successfully', async () => {
    (sgMail.send as jest.Mock).mockResolvedValueOnce([{}, {}]);

    await sendGridProvider.sendEmail(
      'recipient@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: 'recipient@example.com',
      from: 'sender@example.com',
      subject: 'Test Subject',
      text: 'Test Body',
    });
  });

  test('should throw an error when email sending fails', async () => {
    (sgMail.send as jest.Mock).mockRejectedValueOnce(
      new Error('SendGrid Error'),
    );

    await expect(
      sendGridProvider.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
      ),
    ).rejects.toThrow('Email sending failed.');
  });
});
