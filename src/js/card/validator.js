/**
 * Проверяет номер карты по алгоритму Луна.
 * @param {string} cardNumber - Номер карты (может содержать пробелы и нецифровые символы).
 * @returns {boolean} true, если номер валиден по алгоритму Луна, иначе false.
 */
export default function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length === 0) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}
