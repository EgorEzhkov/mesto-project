import Popup from "./popup.js";
export default class PopupWithForm extends Popup {
  constructor({submitCallBack}, selector) {
    super(selector);
    this._submitCallBack = submitCallBack;
    this._popup = document.getElementById(selector);
    this.form = this._popup.querySelector('.popup__form');
    this._inputList =  this._popup.querySelectorAll('.popup__input');
    this.formSubmitButton = this._popup.querySelector('.popup__submit');
    this._currentText = this.formSubmitButton.textContent;
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
    this.form.reset();
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this.formSubmitButton.textContent = loadingText;
    } else {
      this.formSubmitButton.textContent = this._currentText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallBack(this._getInputValues())
      this.close()
    })
  }
}
