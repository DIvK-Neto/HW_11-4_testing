import '../../css/modal.css';

/**
 * Класс модального окна.
 * Управляет отображением, скрытием и содержимым модального окна.
 */
export default class Modal {
  /**
   * Создаёт экземпляр модального окна.
   * @param {HTMLElement} container - DOM-элемент, в который будет вставлено модальное окно.
   * @param {string} title - Заголовок модального окна.
   * @param {string} text - Текст сообщения.
   */
  constructor(container, title, text) {
    this.container = container;
    this.title = title;
    this.text = text;
    this.modalElement = null;
  }

  /**
   * Создаёт DOM-структуру модального окна и добавляет её в контейнер.
   * Также добавляет обработчики закрытия (на крестик и на клик вне окна).
   */
  bindToDOM() {
    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('modal');
    this.modalElement.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>${this.title}</h2>
        <p>${this.text}</p>
      </div>
    `;
    this.container.append(this.modalElement);
    this.modalElement
      .querySelector('.close')
      .addEventListener('click', () => this.hide());
    this.modalElement.addEventListener('click', (e) => {
      if (e.target === this.modalElement) this.hide();
    });
  }

  /** Показывает модальное окно (устанавливает display: flex). */
  show() {
    if (this.modalElement) {
      this.modalElement.style.display = 'flex';
    }
  }

  /** Скрывает модальное окно (устанавливает display: none). */
  hide() {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }
}
