export function findError(err) {
  console.log(`Ошибка: ${err}`)
}

//Функция открытия, навешивание слушетелей и включение валидации для форм
export function actionsForm(form, formValidation) {
  form.open();
  form.setEventListeners();
  formValidation.enableValidation();
};
