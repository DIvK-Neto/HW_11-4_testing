import { detectCardTypeFromConfig } from './cardData';

/**
 * Определяет платёжную систему по номеру карты.
 * @param {string} cardNumber - Номер карты (может содержать пробелы).
 * @returns {string|null} Название системы ('visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners', 'mir') или null, если не удалось определить.
 */
export default function detectCardType(cardNumber) {
  return detectCardTypeFromConfig(cardNumber);
}
