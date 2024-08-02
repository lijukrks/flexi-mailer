import AWS from 'aws-sdk';
import { AmazonSesProvider } from '../../../src/lib/providers/AmazonSesProvider';

jest.mock('aws-sdk');

describe('AmazonSesProvider', () => {
  let amazonSesProvider: AmazonSesProvider;
  const originalEnv = process.env;
  let sendEmailMock: jest.Mock;

  beforeEach(() => {
    process.env = { ...originalEnv };

    sendEmailMock = jest.fn();
    (AWS.SES as unknown as jest.Mock).mockImplementation(() => ({
      sendEmail: sendEmailMock,
    }));

    process.env.AWS_REGION = 'us-east-1';
    process.env.AWS_SOURCE_EMAIL = 'sender@example.com';

    amazonSesProvider = new AmazonSesProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  test('should throw error if AWS_REGION is missing', () => {
    delete process.env.AWS_REGION;
    expect(() => new AmazonSesProvider()).toThrow('AWS region is missing.');
  });

  test('should throw error if AWS_SOURCE_EMAIL is missing', () => {
    delete process.env.AWS_SOURCE_EMAIL;
    expect(() => new AmazonSesProvider()).toThrow(
      'AWS source email address is missing.',
    );
  });

  test('should send an email successfully', async () => {
    sendEmailMock.mockReturnValue({
      promise: jest.fn().mockResolvedValueOnce({}),
    });

    await amazonSesProvider.sendEmail(
      'recipient@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith({
      Source: 'sender@example.com',
      Destination: {
        ToAddresses: ['recipient@example.com'],
      },
      Message: {
        Body: {
          Text: { Data: 'Test Body' },
        },
        Subject: { Data: 'Test Subject' },
      },
    });
  });

  test('should throw an error when email sending fails', async () => {
    sendEmailMock.mockReturnValue({
      promise: jest.fn().mockRejectedValueOnce(new Error('SES Error')),
    });

    await expect(
      amazonSesProvider.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
      ),
    ).rejects.toThrow('Email sending failed.');
  });
});
