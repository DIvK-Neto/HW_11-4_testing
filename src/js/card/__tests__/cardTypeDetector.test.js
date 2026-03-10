import detectCardType from '../cardTypeDetector';

describe('Card type detection', () => {
  test('detects Visa', () => {
    expect(detectCardType('4111111111111111')).toBe('visa');
  });

  test('detects Mastercard (51-55)', () => {
    expect(detectCardType('5555555555554444')).toBe('mastercard');
  });

  test('detects Mastercard (2221-2720)', () => {
    expect(detectCardType('2221000000000000')).toBe('mastercard');
  });

  test('detects American Express', () => {
    expect(detectCardType('378282246310005')).toBe('amex');
  });

  test('detects Discover', () => {
    expect(detectCardType('6011111111111117')).toBe('discover');
  });

  test('detects JCB', () => {
    expect(detectCardType('3530111333300000')).toBe('jcb');
  });

  test('detects Diners Club', () => {
    expect(detectCardType('30569309025904')).toBe('diners');
  });

  test('detects Mir', () => {
    expect(detectCardType('2201382000000013')).toBe('mir');
  });

  test('returns null for unknown', () => {
    expect(detectCardType('9999999999999999')).toBeNull();
  });
});
