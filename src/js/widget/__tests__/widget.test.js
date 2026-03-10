/**
 * @jest-environment jsdom
 */
import CardValidatorWidget from '../app';

// Мокаем импорты изображений, чтобы не было ошибок при тестировании
jest.mock('../../../img/visa.png', () => 'visa.png');
jest.mock('../../../img/mastercard.png', () => 'mastercard.png');
jest.mock('../../../img/amex.png', () => 'amex.png');
jest.mock('../../../img/discover.png', () => 'discover.png');
jest.mock('../../../img/jcb.png', () => 'jcb.png');
jest.mock('../../../img/diners.png', () => 'diners.png');
jest.mock('../../../img/mir.png', () => 'mir.png');

describe('CardValidatorWidget DOM interaction', () => {
  let widget;
  let container;

  // Перед каждым тестом создаём чистый DOM и монтируем виджет
  beforeEach(() => {
    document.body.innerHTML = '<div id="widget-container"></div>';
    container = document.getElementById('widget-container');
    widget = new CardValidatorWidget();
    widget.bindToDOM(container);
  });


  test.each([
    ['4111111111111111', 'visa'],
    ['5555555555554444', 'mastercard'],
    ['378282246310005', 'amex'],
    ['6011111111111117', 'discover'],
    ['3530111333300000', 'jcb'],
    ['30569309025904', 'diners'],
    ['2201382000000013', 'mir'],
  ])(
    'при вводе номера %s подсвечивается логотип %s',
    (cardNumber, expectedClass) => {
      const input = container.querySelector('input');
      // Устанавливаем значение и вызываем событие input
      input.value = cardNumber;
      input.dispatchEvent(new Event('input'));

      const activeLogo = container.querySelector('.card-logo.active');
      expect(activeLogo).not.toBeNull();
      expect(activeLogo.classList.contains(expectedClass)).toBe(true);
    }
  );

  test('при вводе неизвестного номера ни один логотип не подсвечивается', () => {
    const input = container.querySelector('input');
    input.value = '9999999999999999';
    input.dispatchEvent(new Event('input'));

    const activeLogo = container.querySelector('.card-logo.active');
    expect(activeLogo).toBeNull();
  });

  describe('проверка кнопки и модального окна', () => {
    // Вспомогательная функция для получения модального окна
    const getModal = () => document.querySelector('.modal');

    test('при клике на кнопку с валидным номером появляется модальное окно с текстом "Номер карты валидный"', () => {
      const input = container.querySelector('input');
      const button = container.querySelector('button');
      input.value = '4111111111111111';
      button.click();

      const modal = getModal();
      expect(modal).not.toBeNull();
      expect(modal.style.display).not.toBe('none');
      const messageElement = modal.querySelector('p');
      expect(messageElement.textContent).toBe('Номер карты валидный');
    });

    test('при клике на кнопку с невалидным номером появляется модальное окно с текстом "Номер карты невалидный"', () => {
      const input = container.querySelector('input');
      const button = container.querySelector('button');
      input.value = '1234567890123456';
      button.click();

      const modal = getModal();
      expect(modal).not.toBeNull();
      expect(modal.style.display).not.toBe('none');
      const messageElement = modal.querySelector('p');
      expect(messageElement.textContent).toBe('Номер карты невалидный');
    });

    test('модальное окно закрывается при клике на крестик', () => {
      const input = container.querySelector('input');
      const button = container.querySelector('button');
      input.value = '4111111111111111';
      button.click();

      const modal = getModal();
      const closeBtn = modal.querySelector('.close');
      closeBtn.click();

      expect(modal.style.display).toBe('none');
    });
  });
});
