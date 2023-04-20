import Popup from "./popup.js";
export default class PopupWithForm extends Popup {
  constructor({submitCallBack}, selector) {
    super(selector);
    this.submitCallBack = submitCallBack;
    this.popup = document.getElementById(selector);
    this.form = this.popup.querySelector('.popup__form');
    this.inputList =  this.popup.querySelectorAll('.popup__input');
    this.formSubmitButton = this.popup.querySelector('.popup__submit');
    this.currentText = this.formSubmitButton.textContent;
  }
  _getInputValues() {
    this.values = {}
    this.inputList.forEach((input) => {
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
      this.formSubmitButton.textContent = this.currentText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitCallBack(this._getInputValues())
      this.close()
    })
  }
}
