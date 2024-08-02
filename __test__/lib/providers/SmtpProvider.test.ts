import { SmtpProvider } from "../../../src/lib/providers/SmtpProvider";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

describe("SmtpProvider", () => {
  let smtpProvider: SmtpProvider;
  let sendMailMock: jest.Mock;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };

    sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "user";
    process.env.SMTP_PASS = "pass";
    process.env.SMTP_FROM = "sender@example.com";

    smtpProvider = new SmtpProvider();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  test("should throw error if SMTP_HOST is missing", () => {
    delete process.env.SMTP_HOST;
    expect(() => new SmtpProvider()).toThrow("SMTP host is missing.");
  });

  test("should throw error if SMTP_PORT is missing", () => {
    delete process.env.SMTP_PORT;
    expect(() => new SmtpProvider()).toThrow("SMTP port is missing.");
  });

  test("should throw error if SMTP_USER is missing", () => {
    delete process.env.SMTP_USER;
    expect(() => new SmtpProvider()).toThrow("SMTP user is missing.");
  });

  test("should throw error if SMTP_PASS is missing", () => {
    delete process.env.SMTP_PASS;
    expect(() => new SmtpProvider()).toThrow("SMTP password is missing.");
  });

  test("should throw error if SMTP_FROM is missing", () => {
    delete process.env.SMTP_FROM;
    expect(() => new SmtpProvider()).toThrow("SMTP sender email address is missing.");
  });

  test("should send an email successfully", async () => {
    sendMailMock.mockResolvedValueOnce({});
    await smtpProvider.sendEmail("recipient@example.com", "Test Subject", "Test Body");

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith({
      from: "sender@example.com",
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test Body",
    });
  });

  test("should throw an error when email sending fails", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("SMTP Error"));
    await expect(
      smtpProvider.sendEmail("recipient@example.com", "Test Subject", "Test Body")
    ).rejects.toThrow("Email sending failed.");
  });
});
