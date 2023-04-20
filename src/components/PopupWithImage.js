import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(image, text, selector) {
    super(selector)
    this.popup = document.getElementById(this.selector)
    this.image = image
    this.text = text
  }

  open() {
    this.popup.querySelector('.popup__image').src = this.image;
    this.popup.querySelector('.popup__image').alt = this.text;
    this.popup.querySelector('.popup__caption').textContent = this.text;
    super.open();
  }
}
