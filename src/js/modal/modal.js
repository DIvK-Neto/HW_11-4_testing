import '../../css/modal.css';

export default class Modal {
  constructor(container, title, text) {
    this.container = container;
    this.title = title;
    this.text = text;
    this.modalElement = null;
  }

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
    // Можно добавить закрытие по клику вне модалки
    this.modalElement.addEventListener('click', (e) => {
      if (e.target === this.modalElement) this.hide();
    });
  }

  show() {
    if (this.modalElement) {
      this.modalElement.style.display = 'flex';
    }
  }

  hide() {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }
}
