import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open(link, name) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popup.querySelector('.popup__caption').textContent = name;
  }
}
