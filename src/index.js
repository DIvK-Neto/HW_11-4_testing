import './css/style.css';
import CardValidatorWidget from './js/widget/app';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body;
  const widget = new CardValidatorWidget();
  widget.bindToDOM(container);
});
