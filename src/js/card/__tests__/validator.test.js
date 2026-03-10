import luhnCheck from '../validator';

describe('Luhn algorithm validation', () => {
  test('valid Visa card', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });

  test('valid Mastercard', () => {
    expect(luhnCheck('5555555555554444')).toBe(true);
  });

  test('valid Amex', () => {
    expect(luhnCheck('378282246310005')).toBe(true);
  });

  test('invalid card number', () => {
    expect(luhnCheck('1234567890123456')).toBe(false);
  });

  test('handles spaces', () => {
    expect(luhnCheck('4111 1111 1111 1111')).toBe(true);
  });

  test('empty string', () => {
    expect(luhnCheck('')).toBe(false);
  });
});
