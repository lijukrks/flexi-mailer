import { EmailService } from "../src/lib";
import { ProviderType } from "../src/lib";

describe('Module Exports', () => {
  test('should export EmailService', () => {
    expect(EmailService).toBeDefined();
  });

  test('should export ProviderType enum', () => {
    expect(ProviderType).toBeDefined();
    expect(ProviderType.smtp).toBe('smtp');
    expect(ProviderType.sendGrid).toBe('sendGrid');
    expect(ProviderType.mailGun).toBe('mailGun');
    expect(ProviderType.postmark).toBe('postmark');
    expect(ProviderType.ses).toBe('ses');
  });
});
