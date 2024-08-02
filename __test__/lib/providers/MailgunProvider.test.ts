import { MailgunProvider } from '../../../src/lib/providers/MailgunProvider';
import mailgun from 'mailgun-js';

jest.mock('mailgun-js');

describe('MailgunProvider', () => {
  let mailgunProvider: MailgunProvider;
  const originalEnv = process.env;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    process.env = { ...originalEnv };

    sendMailMock = jest.fn();
    (mailgun as jest.Mock).mockImplementation(() => ({
      messages: () => ({
        send: sendMailMock,
      }),
    }));

    process.env.MAILGUN_API_KEY = 'fake-api-key';
    process.env.MAILGUN_DOMAIN = 'fake-domain.com';
    process.env.MAILGUN_FROM = 'sender@example.com';

    mailgunProvider = new MailgunProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  test('should throw error if MAILGUN_API_KEY is missing', () => {
    delete process.env.MAILGUN_API_KEY;
    expect(() => new MailgunProvider()).toThrow('Mailgun API key is missing.');
  });

  test('should throw error if MAILGUN_DOMAIN is missing', () => {
    delete process.env.MAILGUN_DOMAIN;
    expect(() => new MailgunProvider()).toThrow('Mailgun domain is missing.');
  });

  test('should throw error if MAILGUN_FROM is missing', () => {
    delete process.env.MAILGUN_FROM;
    expect(() => new MailgunProvider()).toThrow(
      'Mailgun sender email address is missing.',
    );
  });

  test('should send an email successfully', async () => {
    sendMailMock.mockResolvedValueOnce({});
    await mailgunProvider.sendEmail(
      'recipient@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Test Subject',
      text: 'Test Body',
    });
  });

  test('should throw an error when email sending fails', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('Mailgun Error'));
    await expect(
      mailgunProvider.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
      ),
    ).rejects.toThrow('Email sending failed.');
  });
});
