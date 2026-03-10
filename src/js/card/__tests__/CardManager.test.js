/**
 * @jest-environment jsdom
 */
import CardManager from '../CardManager';

// Мокаем импорты изображений
jest.mock('../../../img/visa.png', () => 'visa.png');
jest.mock('../../../img/mastercard.png', () => 'mastercard.png');
jest.mock('../../../img/amex.png', () => 'amex.png');
jest.mock('../../../img/discover.png', () => 'discover.png');
jest.mock('../../../img/jcb.png', () => 'jcb.png');
jest.mock('../../../img/diners.png', () => 'diners.png');
jest.mock('../../../img/mir.png', () => 'mir.png');

describe('CardManager', () => {
  let cardManager;
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div class="cards"></div>';
    container = document.querySelector('.cards');
    cardManager = new CardManager();
  });

  test('renderCards создаёт изображения для всех карт', () => {
    cardManager.renderCards(container);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(7); // 7 карт
    expect(images[0].alt).toBe('visa');
    expect(images[1].alt).toBe('mastercard');
    expect(images[2].alt).toBe('amex');
    expect(images[3].alt).toBe('discover');
    expect(images[4].alt).toBe('jcb');
    expect(images[5].alt).toBe('diners');
    expect(images[6].alt).toBe('mir');
  });

  test('updateActiveCard добавляет класс active правильному логотипу', () => {
    cardManager.renderCards(container);
    cardManager.updateActiveCard('4111111111111111', container);
    const activeImg = container.querySelector('.card-logo.active');
    expect(activeImg).not.toBeNull();
    expect(activeImg.alt).toBe('visa');
  });

  test('updateActiveCard убирает класс active у всех логотипов', () => {
    cardManager.renderCards(container);
    cardManager.updateActiveCard('4111111111111111', container);
    let activeImg = container.querySelector('.card-logo.active');
    expect(activeImg).not.toBeNull();

    cardManager.updateActiveCard('5555555555554444', container);
    activeImg = container.querySelector('.card-logo.active');
    expect(activeImg).not.toBeNull();
    expect(activeImg.alt).toBe('mastercard');
    // Проверим, что у visa класс удалён
    const visaImg = container.querySelector('.card-logo.visa');
    expect(visaImg.classList.contains('active')).toBe(false);
  });

  test('updateActiveCard не падает, если тип не определён', () => {
    cardManager.renderCards(container);
    expect(() => {
      cardManager.updateActiveCard('123456', container);
    }).not.toThrow();
    const activeImg = container.querySelector('.card-logo.active');
    expect(activeImg).toBeNull();
  });
});
