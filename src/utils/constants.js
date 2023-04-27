import Api from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { createCard, renderLoading } from "./utils.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const config = {
  server: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: 'd49dae7b-52fd-4787-ad1c-63454d12ebd1',
    'Content-Type': 'application/json'
  }
};
const api = new Api(config);
const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const cardsContainer = new Section({
  items: {},
  render: (cardInfo, userId) => {
    cardsContainer.addItem(createCard(cardInfo, userId));
  }
}, '.cards');
const popupImage = new PopupWithImage('', '', 'image_popup');
const updateProfileInfoPopup = new PopupWithForm({
  submitCallBack: (value) => {
    const button = document.querySelector('#popup__submit_profile');
    renderLoading(true, button, "Сохранение...", "Сохранить");
    api.editProfileInfo(value.name, value.about)
      .then(() => {
        userInfo.setUserInfo(value);
        updateProfileInfoPopup.close()
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Сохранить");
      })}
}, 'edit_popup');
const updateProfileAvatarPopup = new PopupWithForm({
  submitCallBack: (value) => {
    const button = document.querySelector('#popup__submit_avatar');
    renderLoading(true, button, "Сохранение...", "Сохранить");
    api.editProfileAvatar(value.avatarLink)
      .then((res) => {
        userInfo.setUserAvatar(res);
        updateProfileAvatarPopup.close();
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Сохранить");
      })}
}, 'avatar_popup');
const addCardPopup = new PopupWithForm({
  submitCallBack: (value) => {
    const button = document.querySelector('#popup__submit_add');
    renderLoading(true, button, "Создание...", "Создать");
    api.addCard(value.mesto, value.link)
      .then((data) => {
        cardsContainer.addItemFirst(createCard(data, data.owner._id));
        addCardPopup.close();
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Создать");
      })}
}, 'add_popup');
const nameInput = document.getElementById('name');
const aboutInput = document.getElementById('profession');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-edit');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error-active',
};
const updateProfileInfoValidator = new FormValidator(settings, document.forms.nameAndProfession);
const updateProfileAvatarValidator = new FormValidator(settings, document.forms.avatar);
const addCardValidator = new FormValidator(settings, document.forms.mesto_and_link);

export {api, userInfo, cardsContainer, nameInput, aboutInput, buttonEdit, buttonAdd, buttonAvatar, settings, popupImage, updateProfileAvatarPopup, updateProfileAvatarValidator, updateProfileInfoPopup, updateProfileInfoValidator, addCardPopup, addCardValidator};
