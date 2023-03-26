export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error-active',
};

export const showInputError = (form, input, errorMessage, settings) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

export const hideInputError = (form, input, settings) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

export const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const checkInputValidity = (form, input, settings) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
} else {
    input.setCustomValidity("");
}
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings)
  };
};

const setEventListeners = (form, settings) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, settings)
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputList, buttonElement, settings)
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, settings);
  });
};
