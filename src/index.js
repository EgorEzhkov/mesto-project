import './styles/index.css';

import PopupWithForm from './components/PopupWithForm.js';
import FormValidator from './components/FormValidator.js'
import {api, userInfo, section, nameInput, aboutInput, avatarProfile, buttonEdit, buttonAdd, buttonAvatar, settings} from './utils/constants.js';
import { createCard, findError } from './utils/utils.js';

Promise.all([api.getProfileInfo(), api.getCardsForServer()])
.then(([userData, data]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  section.items = data;
  section.renderItems();
})
.catch((err) => findError(err));

//валидация всех форм
const formEditValidation = new FormValidator(settings, document.getElementById('edit_popup'));
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(settings, document.getElementById('add_popup'));
formAddValidation.enableValidation();
const formAvatarValidation = new FormValidator(settings, document.getElementById('avatar_popup'));
formAvatarValidation.enableValidation();


//работа формы редактирования
const formEditProfile = new PopupWithForm({
  submitCallBack: (value) => {
    userInfo.setUserInfo(value);
    formEditProfile.renderLoading(true, "Сохранение...");
    api.editProfileInfo(value.name, value.about)
    .catch((err) => findError(err))
    .finally(() => {
      formEditProfile.renderLoading(false, "")
    })
  }
}, 'edit_popup');
formEditValidation.enableValidation();
formEditProfile.setEventListeners();
buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  formEditProfile.open();
  nameInput.value = data.name;
  aboutInput.value = data.about
});



//работа формы добавление карточек
const formAddCard = new PopupWithForm({
  submitCallBack: (value) => {
    formAddCard.renderLoading(true, 'Создание...');
    api.addCard(value.mesto, value.link)
    .then((data) => {
      section.addItemFirst(createCard(data, data.owner._id));
      console.log(data.owner._id);
    })    .catch((err) => findError(err))
    .finally(() => {
      formAddCard.renderLoading(false, '')
    })

  }
}, 'add_popup');
formAddCard.setEventListeners();
buttonAdd.addEventListener('click', () => {
  formAddCard.open();
  formAddValidation.enableValidation();
});

//работа формы изменения аватара
const formAvatarProfile = new PopupWithForm({
  submitCallBack: (value) => {
    formAvatarProfile.renderLoading(true, "Сохранение...");
    api.editProfileAvatar(value.avatarLink)
    .then((res) => {
      avatarProfile.src = res.avatar;
    })
    .catch((err) => findError(err))
    .finally(() => {
      formAvatarProfile.renderLoading(false, '')
    })
  }
}, 'avatar_popup');
formAvatarProfile.setEventListeners();
buttonAvatar.addEventListener('click', () => {
  formAvatarProfile.open();
  formAvatarValidation.enableValidation();
});
