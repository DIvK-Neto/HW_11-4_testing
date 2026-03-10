/**
 * @jest-environment jsdom
 */
import Modal from '../modal';

// Мокаем импорт CSS, так как он не нужен в тестах
jest.mock('../../css/modal.css', () => ({}));

describe('Modal class', () => {
  let container;
  let modal;

  beforeEach(() => {
    // Создаём чистый контейнер перед каждым тестом
    document.body.innerHTML = '<div id="modal-container"></div>';
    container = document.getElementById('modal-container');
    modal = new Modal(container, 'Test Title', 'Test Message');
  });

  test('constructor saves properties', () => {
    expect(modal.container).toBe(container);
    expect(modal.title).toBe('Test Title');
    expect(modal.text).toBe('Test Message');
    expect(modal.modalElement).toBeNull();
  });

  describe('bindToDOM', () => {
    beforeEach(() => {
      modal.bindToDOM();
    });

    test('creates modal element in container', () => {
      const modalElement = container.querySelector('.modal');
      expect(modalElement).not.toBeNull();
      expect(modal.modalElement).toBe(modalElement);
    });

    test('sets correct content', () => {
      const titleEl = container.querySelector('h2');
      const textEl = container.querySelector('p');
      expect(titleEl.textContent).toBe('Test Title');
      expect(textEl.textContent).toBe('Test Message');
    });

    test('adds close button', () => {
      const closeBtn = container.querySelector('.close');
      expect(closeBtn).not.toBeNull();
      expect(closeBtn.textContent).toBe('×');
    });
  });

  describe('show/hide', () => {
    beforeEach(() => {
      modal.bindToDOM();
    });

    test('show() sets display: flex', () => {
      modal.show();
      expect(modal.modalElement.style.display).toBe('flex');
    });

    test('hide() sets display: none', () => {
      modal.show(); // сначала показываем
      modal.hide();
      expect(modal.modalElement.style.display).toBe('none');
    });
  });

  describe('closing behavior', () => {
    beforeEach(() => {
      modal.bindToDOM();
      modal.show(); // показываем, чтобы можно было кликать
    });

    test('click on close button hides modal', () => {
      const closeBtn = container.querySelector('.close');
      closeBtn.click();
      expect(modal.modalElement.style.display).toBe('none');
    });

    test('click on overlay (modal background) hides modal', () => {
      const modalElement = container.querySelector('.modal');
      // Кликаем непосредственно по модальному фону (не по .modal-content)
      modalElement.click();
      expect(modal.modalElement.style.display).toBe('none');
    });

    test('click on modal content does not hide modal', () => {
      const content = container.querySelector('.modal-content');
      content.click();
      // Модалка должна остаться видимой
      expect(modal.modalElement.style.display).toBe('flex');
    });
  });

  describe('multiple modals', () => {
    test('creates independent instances', () => {
      const modal1 = new Modal(container, 'Title 1', 'Text 1');
      const modal2 = new Modal(container, 'Title 2', 'Text 2');
      modal1.bindToDOM();
      modal2.bindToDOM();

      const modals = container.querySelectorAll('.modal');
      expect(modals.length).toBe(2);
      expect(modals[0].querySelector('h2').textContent).toBe('Title 1');
      expect(modals[1].querySelector('h2').textContent).toBe('Title 2');
    });
  });
});
