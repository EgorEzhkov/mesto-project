import './styles/index.css';

import Api from './components/classes/Api.js';
import Card from './components/classes/Card.js';
import Section from './components/classes/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import FormValidator, { settings } from './components/classes/FormValidator.js'
import UserInfo from './components/UserInfo';
import { findError, actionsForm } from './utils/utils.js';

const config = {
  server: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: 'd49dae7b-52fd-4787-ad1c-63454d12ebd1',
    'Content-Type': 'application/json'
  }
};
let cards = {};

const api = new Api(config);
const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const section = new Section({
  items: cards,
  render: (cardInfo) => {
    section.addItem(createCard(cardInfo));
  }
}, '.cards');

function createCard(cardInfo) {
  const card = new Card({
    cardData: cardInfo,
    addLike: (likeCounter, like) => {
      api.addLike(cardInfo._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.add('cards__like_active');
          if (!likeCounter.classList.contains('cards__like-counter_active')) {
            likeCounter.classList.add('cards__like-counter_active');
          }
        })
        .catch((err) => findError(err))},
    deleteLike: (likeCounter, like) => {
      api.deleteLike(cardInfo._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.remove('cards__like_active');
          if (data.likes.length === 0) {
            likeCounter.classList.remove('cards__like-counter_active');
          }
        })
        .catch((err) => findError(err))
    },
    deleteCard: (trash) => {
      trash.addEventListener('click', () => {
        api.deleteCard(cardInfo._id).then(() => {
          card.element.remove();
        })
        .catch((err) => findError(err))
      });
    },
    handleCardClick: (cardImage) => {
      const popupImage = new PopupWithImage(cardInfo.link, cardInfo.name, 'image_popup')
      cardImage.addEventListener('click', () => {
        popupImage.open()
        popupImage.setEventListeners()
      })
    }
  },
  'e871dc8690cbbaff627df173',
  '#card');
  const cardElement = card.generate();
  return cardElement;
}

Promise.all([api.getProfileInfo(), api.getCardsForServer()])
.then(([userData, data]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  section.items = data;
  section.renderItems();
})
.catch((err) => findError(err))


const nameInput = document.getElementById('name');
const aboutInput = document.getElementById('profession');
const avatarProfile = document.querySelector('.profile__avatar')
const buttonEdit = document.querySelector('.profile__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const buttonAvatar = document.querySelector('.profile__avatar-edit')


const formEditValidation = new FormValidator(settings, document.getElementById('edit_popup'))
const formAddValidation = new FormValidator(settings, document.getElementById('add_popup'))
const formAvatarValidation = new FormValidator(settings, document.getElementById('avatar_popup'))


//работа формы редактирования
const formEditProfile = new PopupWithForm({
  submitCallBack: (value) => {
    userInfo.setUserInfo(value);
    formEditProfile.renderLoading(true, "Сохранение...")
    api.editProfileInfo(value.name, value.about)
    .catch((err) => findError(err))
    .finally(() => {
      formEditProfile.renderLoading(false, "")
    })
  }
}, 'edit_popup');

buttonEdit.addEventListener('click', () => {
  actionsForm(formEditProfile, formEditValidation)
  const data = userInfo.getUserInfo()
  nameInput.value = data.name;
  aboutInput.value = data.about
});

//работа формы добавление карточек
const formAddCard = new PopupWithForm({
  submitCallBack: (value) => {
    formAddCard.renderLoading(true, 'Создание...')
    api.addCard(value.mesto, value.link)
    .then((data) => {
      section.addItemFirst(createCard(data));
    })
    .catch((err) => findError(err))
    .finally(() => {
      formAddCard.renderLoading(false, '')
    })
  }
}, 'add_popup')
buttonAdd.addEventListener('click', () => {
  actionsForm(formAddCard, formAddValidation)
});

//работа формы изменения аватара
const formAvatarProfile = new PopupWithForm({
  submitCallBack: (value) => {
    formAvatarProfile.renderLoading(true, "Сохранение...")
    api.editProfileAvatar(value.avatarLink)
    .then((res) => {
      avatarProfile.src = res.avatar;
    })
    .catch((err) => {findError(err)})
    .finally(() => {
      formAvatarProfile.renderLoading(false, '')
    })
  }
}, 'avatar_popup')
buttonAvatar.addEventListener('click', () => {
  actionsForm(formAvatarProfile, formAvatarValidation)
});
