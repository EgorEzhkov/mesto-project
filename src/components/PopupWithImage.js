import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(image, text, selector) {
    super(selector)
    this._popup = document.getElementById(this._selector)
    this._image = image
    this._text = text
  }

  open() {
    this._popup.querySelector('.popup__image').src = this._image;
    this._popup.querySelector('.popup__image').alt = this._text;
    this._popup.querySelector('.popup__caption').textContent = this._text;
    super.open();
  }
}
