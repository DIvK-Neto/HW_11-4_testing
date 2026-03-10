/**
 * @typedef {Object} CardDefinition
 * @property {string} type - Название платёжной системы ('visa', 'mastercard', ...)
 * @property {Array<number|string>} patterns - Массив префиксов или диапазонов (строки или числа)
 */

/**
 * Массив конфигураций карт.
 * Каждый элемент содержит тип и паттерны (префиксы или диапазоны).
 * @type {CardDefinition[]}
 */
export const cardDefinitions = [
  {
    type: 'visa',
    patterns: ['4'], // также может быть ['4', '44'] если нужно
  },
  {
    type: 'mastercard',
    patterns: [
      '51',
      '52',
      '53',
      '54',
      '55',
      ...Array.from({ length: 272099 - 222100 + 1 }, (_, i) =>
        (222100 + i).toString()
      ),
    ], // диапазон 222100-272099
  },
  {
    type: 'amex',
    patterns: ['34', '37'],
  },
  {
    type: 'discover',
    patterns: [
      '6011',
      '644',
      '645',
      '646',
      '647',
      '648',
      '649',
      '65',
      ...Array.from({ length: 622925 - 622126 + 1 }, (_, i) =>
        (622126 + i).toString()
      ),
    ], // диапазон 622126-622925
  },
  {
    type: 'jcb',
    patterns: Array.from({ length: 3589 - 3528 + 1 }, (_, i) =>
      (3528 + i).toString()
    ),
  },
  {
    type: 'diners',
    patterns: ['300', '301', '302', '303', '304', '305', '36', '38', '39'],
  },
  {
    type: 'mir',
    patterns: ['22'],
  },
];

/**
 * Проверяет, соответствует ли номер карты одному из паттернов.
 * @param {string} digits - Только цифры номера карты.
 * @param {CardDefinition} cardDef - Объект определения карты.
 * @returns {boolean} true, если номер начинается с одного из паттернов.
 */
function matchesCard(digits, cardDef) {
  return cardDef.patterns.some((pattern) => digits.startsWith(pattern));
}

/**
 * Определяет платёжную систему по номеру карты.
 * @param {string} cardNumber - Номер карты (может содержать пробелы).
 * @returns {string|null} Название системы или null, если не удалось определить.
 */
export function detectCardTypeFromConfig(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (!digits) return null;

  const found = cardDefinitions.find((def) => matchesCard(digits, def));
  return found ? found.type : null;
}
