import detectCardType from './cardTypeDetector';
import visaImg from '../../img/visa.png';
import mastercardImg from '../../img/mastercard.png';
import amexImg from '../../img/amex.png';
import discoverImg from '../../img/discover.png';
import jcbImg from '../../img/jcb.png';
import dinersImg from '../../img/diners.png';
import mirImg from '../../img/mir.png';

/**
 * Класс для управления картами: рендеринг логотипов и подсветка активной карты.
 */
export default class CardManager {
  /**
   * Создаёт экземпляр CardManager.
   */
  constructor() {
    /**
     * Массив конфигураций карт.
     * @type {Array<{type: string, img: string}>}
     */
    this.cards = [
      { type: 'visa', img: visaImg },
      { type: 'mastercard', img: mastercardImg },
      { type: 'amex', img: amexImg },
      { type: 'discover', img: discoverImg },
      { type: 'jcb', img: jcbImg },
      { type: 'diners', img: dinersImg },
      { type: 'mir', img: mirImg },
    ];
  }

  /**
   * Рендерит логотипы карт в указанный контейнер.
   * @param {HTMLElement} container - Контейнер, в который будут добавлены логотипы.
   */
  renderCards(container) {
    this.cards.forEach((card) => {
      const img = document.createElement('img');
      img.src = card.img;
      img.alt = card.type;
      img.classList.add('card-logo', card.type);
      container.append(img);
    });
  }

  /**
   * Обновляет активный логотип на основе номера карты.
   * Убирает класс 'active' у всех логотипов и добавляет его логотипу,
   * соответствующему определённой платёжной системе.
   * @param {string} cardNumber - Номер карты (может содержать пробелы).
   * @param {HTMLElement} container - Контейнер, в котором находятся логотипы.
   */
  updateActiveCard(cardNumber, container) {
    const cardType = detectCardType(cardNumber);
    container
      .querySelectorAll('.card-logo')
      .forEach((img) => img.classList.remove('active'));
    if (cardType) {
      const activeImg = container.querySelector(`.card-logo.${cardType}`);
      if (activeImg) activeImg.classList.add('active');
    }
  }
}
