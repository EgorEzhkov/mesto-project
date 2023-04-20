export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.getElementById(this.selector)
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
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
    this._popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    })
  }
}

