import luhnCheck from '../card/validator';
import CardManager from '../card/CardManager';
import Modal from '../modal/modal';

export default class CardValidatorWidget {
  constructor() {
    this.container = null;
    this.input = null;
    this.cardManager = new CardManager(); // делегируем работу с картами
    this.modalContainer = null;
  }

  /**
   * Привязывает виджет к DOM-контейнеру.
   * @param {HTMLElement} container - Корневой контейнер для виджета.
   */
  bindToDOM(container) {
    this.container = container;
    this.render();
    this.subscribe();
    this.ensureModalContainer();
  }

  /**
   * Создаёт DOM-структуру виджета.
   * @private
   */
  render() {
    const widget = document.createElement('div');
    widget.classList.add('validator-widget');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Введите номер карты';
    widget.append(this.input);

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards');
    this.cardManager.renderCards(cardsContainer); // используем CardManager
    widget.append(cardsContainer);

    const button = document.createElement('button');
    button.textContent = 'Проверить';
    widget.append(button);

    this.container.append(widget);
  }

  /**
   * Убеждается, что контейнер для модального окна существует.
   * @private
   */
  ensureModalContainer() {
    const existing = document.getElementById('modal-container');
    if (existing) {
      this.modalContainer = existing;
    } else {
      this.modalContainer = document.createElement('div');
      this.modalContainer.id = 'modal-container';
      document.body.append(this.modalContainer);
    }
  }

  /**
   * Подписывается на события ввода и клика.
   * @private
   */
  subscribe() {
    const button = this.container.querySelector('button');
    button.addEventListener('click', () => this.validate());
    this.input.addEventListener('input', () => this.onInput());
  }

  /**
   * Обработчик ввода – обновляет подсветку логотипа.
   * @private
   */
  onInput() {
    const cardNumber = this.input.value.trim();
    const cardsContainer = this.container.querySelector('.cards');
    this.cardManager.updateActiveCard(cardNumber, cardsContainer);
  }

  /**
   * Валидирует номер карты и показывает результат в модальном окне.
   * @private
   */
  validate() {
    const rawNumber = this.input.value.trim();
    const digits = rawNumber.replace(/\D/g, '');
    const title = 'Результат проверки';
    let text;

    if (digits.length < 13 || digits.length > 19) {
      text = 'Номер должен содержать от 13 до 19 цифр';
    } else {
      const isValid = luhnCheck(digits);
      text = isValid ? 'Номер карты валидный' : 'Номер карты невалидный';
    }

    const modal = new Modal(this.modalContainer, title, text);
    modal.bindToDOM();
    modal.show();
  }
}
