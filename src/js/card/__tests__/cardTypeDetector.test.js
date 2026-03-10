import detectCardType from '../cardTypeDetector';

describe('Card type detection', () => {
  // Группируем тесты по платёжным системам с параметризацией
  describe.each([
    [
      'Visa',
      'visa',
      [
        '4111111111111111',
        '4012888888881881',
        '4222222222222', // 13 цифр
      ],
    ],
    [
      'Mastercard (51-55)',
      'mastercard',
      ['5555555555554444', '5105105105105100', '5252525252525252'],
    ],
    [
      'Mastercard (2221-2720)',
      'mastercard',
      [
        '2221000000000000',
        '2720990000000000',
        '2223000000000000', // внутри диапазона
      ],
    ],
    [
      'American Express',
      'amex',
      ['378282246310005', '371449635398431', '340000000000000'],
    ],
    [
      'Discover',
      'discover',
      [
        '6011111111111117',
        '6011000000000004',
        '6440000000000000',
        '6500000000000000',
      ],
    ],
    [
      'JCB',
      'jcb',
      [
        '3530111333300000',
        '3566002020360505',
        '3528000000000000', // 3528-3589
      ],
    ],
    [
      'Diners Club',
      'diners',
      ['30569309025904', '38520000023237', '36700102000000'],
    ],
    [
      'Mir',
      'mir',
      ['2201382000000013', '2200000000000000', '2204999999999999'],
    ],
  ])('%s', (_, expectedType, numbers) => {
    test.each(numbers)('detects %s as %s', (number) => {
      expect(detectCardType(number)).toBe(expectedType);
    });
  });

  describe('unknown or invalid numbers', () => {
    test.each([
      '1234567890123456',
      '0000000000000000',
      '9999999999999999',
      '1234', // слишком короткий
      'abc', // не цифры
    ])('returns null for %s', (number) => {
      expect(detectCardType(number)).toBeNull();
    });
  });
});
