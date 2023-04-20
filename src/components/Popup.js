export default class Popup {
  constructor(selector) {
    this.selector = selector;
    this.popup = document.getElementById(this.selector)
  }
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }
  close() {
    this.popup.classList.remove('popup_opened');
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
    this.popupCloseButton = this.popup.querySelector('.popup__close');
    this.popupCloseButton.addEventListener('click', () => {
      this.close();
    })
    this.popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    })
  }
}

