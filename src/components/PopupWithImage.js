import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(image, text, selector) {
    super(selector)
    this.image = image
    this.text = text
  }

  open() {
    super.open();
    const popupImage = this._popup.querySelector('.popup__image')
    popupImage.src = this.image;
    popupImage.alt = this.text;
    this._popup.querySelector('.popup__caption').textContent = this.text;
  }
}
