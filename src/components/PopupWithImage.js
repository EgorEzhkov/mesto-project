import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(image, text, selector) {
    super(selector)
    this.image = image
    this.text = text
    this._popupImage = this._popup.querySelector('.popup__image')
  }

  open() {
    super.open();
    this._popupImage.src = this.image;
    this._popupImage.alt = this.text;
    this._popup.querySelector('.popup__caption').textContent = this.text;
  }
}
