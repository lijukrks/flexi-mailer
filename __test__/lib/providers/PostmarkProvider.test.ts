import { PostmarkProvider } from '../../../src/lib/providers/PostmarkProvider';
import { ServerClient } from 'postmark';

jest.mock('postmark');

describe('PostmarkProvider', () => {
  let postmarkProvider: PostmarkProvider;
  const originalEnv = process.env;
  let sendEmailMock: jest.Mock;

  beforeEach(() => {
    process.env = { ...originalEnv };

    sendEmailMock = jest.fn();
    (ServerClient as jest.Mock).mockImplementation(() => ({
      sendEmail: sendEmailMock,
    }));

    process.env.POSTMARK_API_KEY = 'fake-api-key';
    process.env.POSTMARK_FROM = 'sender@example.com';

    postmarkProvider = new PostmarkProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  test('should throw error if POSTMARK_API_KEY is missing', () => {
    delete process.env.POSTMARK_API_KEY;
    expect(() => new PostmarkProvider()).toThrow(
      'Postmark API key is missing.',
    );
  });

  test('should throw error if POSTMARK_FROM is missing', () => {
    delete process.env.POSTMARK_FROM;
    expect(() => new PostmarkProvider()).toThrow(
      'Postmark sender email address is missing.',
    );
  });

  test('should send an email successfully', async () => {
    sendEmailMock.mockResolvedValueOnce({});
    await postmarkProvider.sendEmail(
      'recipient@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith({
      From: 'sender@example.com',
      To: 'recipient@example.com',
      Subject: 'Test Subject',
      TextBody: 'Test Body',
    });
  });

  test('should throw an error when email sending fails', async () => {
    sendEmailMock.mockRejectedValueOnce(new Error('Postmark Error'));
    await expect(
      postmarkProvider.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
      ),
    ).rejects.toThrow('Email sending failed.');
  });
});
