export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.getElementById(this._selector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton = this._popup.querySelector('.popup__close');
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    })
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    })

  }
}

