import Api from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { createCard } from "./utils.js";
import PopupWithImage from "../components/PopupWithImage.js";

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

export {api, userInfo, cardsContainer, nameInput, aboutInput, buttonEdit, buttonAdd, buttonAvatar, settings, popupImage};
