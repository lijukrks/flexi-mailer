import { ProviderType } from '../src/lib';

describe('ProviderType Enum', () => {
  test('should have correct enum values', () => {
    expect(ProviderType.smtp).toBe('smtp');
    expect(ProviderType.sendGrid).toBe('sendGrid');
    expect(ProviderType.mailGun).toBe('mailGun');
    expect(ProviderType.postmark).toBe('postmark');
    expect(ProviderType.ses).toBe('ses');
  });

  test('should not have unexpected values', () => {
    const values = Object.values(ProviderType);
    expect(values).toContain('smtp');
    expect(values).toContain('sendGrid');
    expect(values).toContain('mailGun');
    expect(values).toContain('postmark');
    expect(values).toContain('ses');
    expect(values.length).toBe(5); // Ensure the enum has exactly 5 values
  });
});
