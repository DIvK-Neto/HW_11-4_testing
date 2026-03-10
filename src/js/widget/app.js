import luhnCheck from '../card/validator';
import detectCardType from '../card/cardTypeDetector';
import visaImg from '../../img/visa.png';
import mastercardImg from '../../img/mastercard.png';
import amexImg from '../../img/amex.png';
import discoverImg from '../../img/discover.png';
import jcbImg from '../../img/jcb.png';
import dinersImg from '../../img/diners.png';
import mirImg from '../../img/mir.png';
import Modal from '../modal/modal';

export default class CardValidatorWidget {
  constructor() {
    this.container = null;
    this.input = null;
    this.cards = [
      { type: 'visa', img: visaImg },
      { type: 'mastercard', img: mastercardImg },
      { type: 'amex', img: amexImg },
      { type: 'discover', img: discoverImg },
      { type: 'jcb', img: jcbImg },
      { type: 'diners', img: dinersImg },
      { type: 'mir', img: mirImg },
    ];
    this.modalContainer = null;
  }

  bindToDOM(container) {
    this.container = container;
    this.render();
    this.subscribe();
    if (!document.getElementById('modal-container')) {
      this.modalContainer = document.createElement('div');
      this.modalContainer.id = 'modal-container';
      document.body.append(this.modalContainer);
    } else {
      this.modalContainer = document.getElementById('modal-container');
    }
  }

  render() {
    const widget = document.createElement('div');
    widget.classList.add('validator-widget');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Введите номер карты';
    widget.append(this.input);

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards');

    this.cards.forEach((card) => {
      const img = document.createElement('img');
      img.src = card.img;
      img.alt = card.type;
      img.classList.add('card-logo', card.type);
      cardsContainer.append(img);
    });

    widget.append(cardsContainer);

    const button = document.createElement('button');
    button.textContent = 'Проверить';
    widget.append(button);


    this.container.append(widget);
  }

  subscribe() {
    const button = this.container.querySelector('button');
    button.addEventListener('click', () => this.validate());
    this.input.addEventListener('input', () => this.onInput());
  }

  onInput() {
    const cardNumber = this.input.value.trim();
    const cardType = detectCardType(cardNumber);
    this.container
      .querySelectorAll('.card-logo')
      .forEach((img) => img.classList.remove('active'));
    if (cardType) {
      const activeImg = this.container.querySelector(`.card-logo.${cardType}`);
      if (activeImg) activeImg.classList.add('active');
    }
  }

  validate() {
    const cardNumber = this.input.value.trim();
    const isValid = luhnCheck(cardNumber);
    const title = 'Результат проверки';
    const text = isValid ? 'Номер карты валидный' : 'Номер карты невалидный';
    const modal = new Modal(this.modalContainer, title, text);
    modal.bindToDOM();
    modal.show();
  }
}
