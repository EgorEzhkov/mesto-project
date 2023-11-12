import './styles/index.css';
import Api from "./components/Api.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import { createCard, renderLoading } from "./utils/utils.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";
import {nameInput, aboutInput, buttonEdit, buttonAdd, buttonAvatar, settings, config} from './utils/constants.js';
import { findError } from './utils/utils.js';


const api = new Api(config);
const popupImage = new PopupWithImage('image_popup');
const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const cardsContainer = new Section({
  items: {},
  render: (cardInfo, userId) => {
    cardsContainer.addItem(createCard(cardInfo, userId));
  }
}, '.cards');
const popupProfileInfo = new PopupWithForm({
  submitCallBack: (value) => {
    popupProfileInfo.renderLoading(true, "Сохранение...");
    api.editProfileInfo(value.name, value.about)
      .then(() => {
        userInfo.setUserInfo(value);
        popupProfileInfo.close()
      })
      .catch((err) => findError(err))
      .finally(() => {
        popupProfileInfo.renderLoading(false, "Сохранение...");
      })}
}, 'edit_popup');
const popupProfileAvatar = new PopupWithForm({
  submitCallBack: (value) => {
    popupProfileAvatar.renderLoading(true, "Сохранение...");
    api.editProfileAvatar(value.avatarLink)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupProfileAvatar.close();
      })
      .catch((err) => findError(err))
      .finally(() => {
        popupProfileAvatar.renderLoading(false, "Сохранение...");
      })}
}, 'avatar_popup');
const popupAddCard = new PopupWithForm({
  submitCallBack: (value) => {
    popupAddCard.renderLoading(true, "Создание...");
    api.addCard(value.mesto, value.link)
      .then((data) => {
        cardsContainer.addItemFirst(createCard(data, data.owner._id));
        popupAddCard.close();
      })
      .catch((err) => findError(err))
      .finally(() => {
        popupAddCard.renderLoading(false, "Создание...");
      })}
}, 'add_popup');

const updateProfileInfoValidator = new FormValidator(settings, document.forms.nameAndProfession);
const updateProfileAvatarValidator = new FormValidator(settings, document.forms.avatar);
const addCardValidator = new FormValidator(settings, document.forms.mesto_and_link);


Promise.all([api.getProfileInfo(), api.getCardsForServer()])
.then(([userData, data]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  cardsContainer.items = data;
  cardsContainer.renderItems(userData._id);
})
.catch((err) => findError(err));

popupImage.setEventListeners();

// Валидация слушатели и работа попапа на обновление автара
updateProfileAvatarValidator.enableValidation();
popupProfileAvatar.setEventListeners();
buttonAvatar.addEventListener('click', () => {
  popupProfileAvatar.open();
  updateProfileAvatarValidator.toggleButtonState();
})

// Валидация слушатели и работа попапа на обновление информации о пользователе
updateProfileInfoValidator.enableValidation();
popupProfileInfo.setEventListeners();
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  popupProfileInfo.open();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  updateProfileInfoValidator.toggleButtonState();
})

// Валидация слушатели и работа попапа на добавление карточки
addCardValidator.enableValidation();
popupAddCard.setEventListeners();
buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  addCardValidator.toggleButtonState();
})

export {api, popupImage}
