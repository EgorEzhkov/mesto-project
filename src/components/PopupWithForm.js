import Popup from "./popup.js";
export default class PopupWithForm extends Popup {
  constructor({submitCallBack}, selector) {
    super(selector);
    this.submitCallBack = submitCallBack;
    this._popup = document.getElementById(selector);
    this._form = this.popup.querySelector('.popup__form');
    this._inputList =  this.popup.querySelectorAll('.popup__input')
    this._formSubmitButton = this.popup.querySelector('.popup__submit')
    this._currentText = this._formSubmitButton.textContent;
  }
  _getInputValues() {
    this.values = {}
    this._inputList.forEach((input) => {
      this.values[input.name] = input.value;
    })

    return this.values
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._formSubmitButton.textContent = loadingText;
    } else {
      this._formSubmitButton.textContent = this._currentText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitCallBack(this._getInputValues())
      this.close()
    })
  }
}
