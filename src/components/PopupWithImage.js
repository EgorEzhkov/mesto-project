import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(image, text, selector) {
    super(selector)
    this._image = image
    this._text = text
  }

  open() {
    super.open();
    const popupImage = this._popup.querySelector('.popup__image')
    popupImage.src = this._image;
    popupImage.alt = this._text;
    this._popup.querySelector('.popup__caption').textContent = this._text;
  }
}
