import Mailgun from 'mailgun.js';
import { MailgunProvider } from '../../../src/lib/providers/MailgunProvider';

interface MockMailgunClient {
  messages: {
    create: jest.Mock<
      Promise<{ id: string; message: string }>,
      [string, { from: string; to: string; subject: string; text: string }]
    >;
  };
}

jest.mock('mailgun.js');

describe('MailgunProvider', () => {
  let mailgunProvider: MailgunProvider;
  const originalEnv = process.env;
  let mockMailgunClient: MockMailgunClient;

  beforeEach(() => {
    process.env = { ...originalEnv };

    process.env.MAILGUN_API_KEY = 'test-api-key';
    process.env.MAILGUN_DOMAIN = 'test-domain';
    process.env.MAILGUN_FROM = 'test@example.com';

    mockMailgunClient = {
      messages: {
        create: jest.fn(),
      },
    };

    (Mailgun as unknown as jest.Mock).mockImplementation(() => ({
      client: () => mockMailgunClient,
    }));

    mailgunProvider = new MailgunProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  it('should initialize correctly with environment variables', () => {
    expect(() => new MailgunProvider()).not.toThrow();
  });

  it('should throw an error if MAILGUN_API_KEY is missing', () => {
    delete process.env.MAILGUN_API_KEY;
    expect(() => new MailgunProvider()).toThrow('Mailgun API key is missing.');
  });

  it('should throw an error if MAILGUN_DOMAIN is missing', () => {
    delete process.env.MAILGUN_DOMAIN;
    expect(() => new MailgunProvider()).toThrow('Mailgun domain is missing.');
  });

  it('should throw an error if MAILGUN_FROM is missing', () => {
    delete process.env.MAILGUN_FROM;
    expect(() => new MailgunProvider()).toThrow(
      'Mailgun sender email address is missing.',
    );
  });

  it('should call the Mailgun API to send an email', async () => {
    mockMailgunClient.messages.create.mockResolvedValue({
      id: '1234',
      message: 'Queued. Thank you.',
    });

    const to = 'recipient@example.com';
    const subject = 'Test Subject';
    const body = 'Test Body';

    await mailgunProvider.sendEmail(to, subject, body);

    expect(mockMailgunClient.messages.create).toHaveBeenCalledWith(
      'test-domain',
      {
        from: 'test@example.com',
        to,
        subject,
        text: body,
      },
    );
  });

  it('should throw an error if sending email fails', async () => {
    mockMailgunClient.messages.create.mockRejectedValue(
      new Error('Failed to send email'),
    );

    await expect(
      mailgunProvider.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
      ),
    ).rejects.toThrow('Email sending failed.');
  });
});
