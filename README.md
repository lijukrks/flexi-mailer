# flexi-mailer
[![codecov](https://codecov.io/github/lijukrks/flexi-mailer/branch/main/graph/badge.svg?token=AOO9ICAYFH)](https://codecov.io/github/lijukrks/flexi-mailer)
A versatile email service supporting multiple providers, including SMTP, AWS SES, Mailgun, Postmark, and SendGrid.

## Features

- Supports multiple email providers
- Easy to configure with environment variables
- Modular and extensible design
- TypeScript support

## Installation

To install the package, use npm:

```bash
npm install flexi-mailer
```

## Usage

First, set up your environment variables for the providers you plan to use. You can do this by creating a `.env` file in your project root:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SMTP_FROM=no-reply@example.com

AWS_REGION=us-east-1
AWS_SOURCE_EMAIL=no-reply@example.com

MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
MAILGUN_FROM=no-reply@example.com

POSTMARK_API_KEY=your_postmark_api_key
POSTMARK_FROM=no-reply@example.com

SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM=no-reply@example.com
```

### Example

```typescript
import { EmailService, ProviderType } from 'flexi-mailer';

// Create an instance of EmailService with the desired provider
const emailService = new EmailService(ProviderType.smtp);

// Send an email
emailService
  .sendEmail('recipient@example.com', 'Test Subject', 'Test Body')
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.error('Failed to send email:', error));
```

## Supported Providers

- **SMTP**: `ProviderType.smtp`
- **AWS SES**: `ProviderType.ses`
- **Mailgun**: `ProviderType.mailGun`
- **Postmark**: `ProviderType.postmark`
- **SendGrid**: `ProviderType.sendGrid`

## Environment Variables

### SMTP

- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port.
- `SMTP_USER`: SMTP server username.
- `SMTP_PASS`: SMTP server password.
- `SMTP_FROM`: Sender email address.

### AWS SES

- `AWS_REGION`: AWS region.
- `AWS_SOURCE_EMAIL`: Source email address for sending emails.

### Mailgun

- `MAILGUN_API_KEY`: Mailgun API key.
- `MAILGUN_DOMAIN`: Mailgun domain.
- `MAILGUN_FROM`: Sender email address.

### Postmark

- `POSTMARK_API_KEY`: Postmark API key.
- `POSTMARK_FROM`: Sender email address.

### SendGrid

- `SENDGRID_API_KEY`: SendGrid API key.
- `SENDGRID_FROM`: Sender email address.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/lijukrks/flexi-mailer/blob/main/LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Issues

If you encounter any issues, please [open an issue](https://github.com/lijukrks/flexi-mailer/issues) on GitHub.

## Maintainers

- [Liju Kuriakose](https://github.com/lijukrks)
