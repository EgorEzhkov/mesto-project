import Popup from './components/popup';
import './styles/index.css';

import {api, userInfo, section, nameInput, aboutInput, buttonEdit, buttonAdd, buttonAvatar} from './utils/constants.js';
import { createCard, findError, renderLoading, createForm } from './utils/utils.js';

Promise.all([api.getProfileInfo(), api.getCardsForServer()])
.then(([userData, data]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  section.items = data;
  section.renderItems(userData._id);
})
.catch((err) => findError(err));


// Создание формы и попапа для данных пользователя
createForm({
  api: (value, popup) => {
    const button = document.querySelector('#popup__submit_profile');
    renderLoading(true, button, "Сохранение...", "Сохранить");
    api.editProfileInfo(value.name, value.about)
      .then(() => {
        userInfo.setUserInfo(value);
        popup.close()
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Сохранить");
      })},
  clickEvent: (popup) => {
    const data = userInfo.getUserInfo()
    popup.open();
    nameInput.value = data.name;
    aboutInput.value = data.about}},
  buttonEdit,
  'edit_popup');


// Создание формы и попапа для добавления карточки
createForm({
  api: (value, popup) => {
    const button = document.querySelector('#popup__submit_add');
    renderLoading(true, button, "Создание...", "Создать");
    api.addCard(value.mesto, value.link)
      .then((data) => {
        section.addItemFirst(createCard(data, data.owner._id));
        popup.close()
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Создать");
      })},
  clickEvent: (popup) => {
    popup.open();
  }},
  buttonAdd,
  'add_popup');


// Создание формы и попапа для обновления аватара
createForm({
  api: (value, popup) => {
    const button = document.querySelector('#popup__submit_avatar');
    renderLoading(true, button, "Сохранение...", "Сохранить");
    api.editProfileAvatar(value.avatarLink)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popup.close();
      })
      .catch((err) => findError(err))
      .finally(() => {
        renderLoading(false, button, "", "Сохранить");
      })},
  clickEvent: (popup) => {
    popup.open();
  }},
  buttonAvatar,
  'avatar_popup');
