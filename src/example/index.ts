import { EmailService, ProviderType } from '../lib';

const emailService = new EmailService(ProviderType.smtp);

emailService
  .sendEmail('example@example.com', 'Test Subject', 'Test Body')
  .then(() => console.log('Email sent successfully'))
  .catch((err) => console.error('Error sending email:', err));
