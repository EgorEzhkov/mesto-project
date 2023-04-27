import './styles/index.css';

import {api, userInfo, cardsContainer, nameInput, aboutInput, buttonEdit, buttonAdd, buttonAvatar, updateProfileAvatarPopup, updateProfileAvatarValidator, updateProfileInfoPopup, updateProfileInfoValidator, addCardPopup, addCardValidator} from './utils/constants.js';
import { findError } from './utils/utils.js';

Promise.all([api.getProfileInfo(), api.getCardsForServer()])
.then(([userData, data]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  cardsContainer.items = data;
  cardsContainer.renderItems(userData._id);
})
.catch((err) => findError(err));

// Валидация слушатели и работа попапа на обновление автара
updateProfileAvatarValidator.enableValidation();
updateProfileAvatarPopup.setEventListeners();
buttonAvatar.addEventListener('click', () => {
  updateProfileAvatarPopup.open();
  updateProfileAvatarValidator.toggleButtonState(updateProfileAvatarValidator.inputList, updateProfileAvatarValidator.buttonElement);
})

// Валидация слушатели и работа попапа на обновление информации о пользователе
updateProfileInfoValidator.enableValidation();
updateProfileInfoPopup.setEventListeners();
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  updateProfileInfoPopup.open();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  updateProfileInfoValidator.toggleButtonState(updateProfileInfoValidator.inputList, updateProfileInfoValidator.buttonElement);
})

// Валидация слушатели и работа попапа на добавление карточки
addCardValidator.enableValidation();
addCardPopup.setEventListeners();
buttonAdd.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidator.toggleButtonState(addCardValidator.inputList, addCardValidator.buttonElement);
})