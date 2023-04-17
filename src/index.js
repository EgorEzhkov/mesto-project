import './styles/index.css';

import Api from './components/classes/Api.js';
import Card from './components/classes/Card.js';
import Section from './components/classes/Section.js';

const config = {
  server: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: 'd49dae7b-52fd-4787-ad1c-63454d12ebd1',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);

// Этот код следует поместить в Promise.all и объединить построение карточек и отображения информации от пользователя. Первый метод api.getCardsForServer() нужно поместить в массив Promise.all, после в then сделать массив с двумя данными и весь код из then перенести в then у Promise.all
api.getCardsForServer().then((data) => {
  const section = new Section({
    items: data,
    render: (cardInfo) => {
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
            .catch(card._findError)}, 
        deleteLike: (likeCounter, like) => {
          api.deleteLike(cardInfo._id)
            .then((data) => {
              likeCounter.textContent = data.likes.length;
              like.classList.remove('cards__like_active');
              if (data.likes.length === 0) {
                likeCounter.classList.remove('cards__like-counter_active');
              }
            })
            .catch(card._findError);
        },
      deleteCard: () => {
        api.deleteCard(cardInfo._id).then(() => {
          card.remove();
        }).catch(card._findError)
      }},
        'e871dc8690cbbaff627df173', 
        '#card');
      section.addItem(card.generate());
    }
  }, '.cards');
  section.renderItems();
});
/* import {cards, createCard} from './components/card.js';
import {
  popupImageClose,
  popupEditClose,
  popupAddClose,
  closePopup,
  openPopup,
  popupImage,
  popupEdit,
  popupAdd,
  handleProfileFormSubmit,
  handleFormSubmitAdd,
  closePopupOverlayAll,
  inputName,
  inputProfession,
  profileName,
  profileProfession,
  popupEditAvatar,
  popupAvatarClose,
  handleFormSubmitEditAvatar
} from './components/modal.js';
import {enableValidation, settings} from './components/validate.js';
import {
  getProfileInfo,
  getCardsForServer
} from './components/api.js';

let userId;
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar')
const profileForm  = document.querySelector('.popup__form');
const popupFormAdd = document.getElementById('popup__form_add');
const popupFormAvatar = document.getElementById('avatar_popup')
export const profileAvatar = document.querySelector('.profile__avatar')
export const allImages = [
  {
    name: "CloseIcon",
    link: "../images/Close-Icon.svg"
  },
  {
    name: "EditButton",
    link: "../images/Editbutton.svg"
  },
  {
    name: "like",
    link: "../images/like.svg"
  },
  {
    name: "likeActive",
    link: "../images/like_active.svg"
  }
];



Promise.all([getProfileInfo(), getCardsForServer()])
.then(([userData, res]) => {
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  userId = userData._id
  res.forEach(element => {
    cards.append(createCard(element, userId))
  })
})
.catch((err) => {
  console.log(err)
});


//закрытие модульных окон по нажатию на крестик
popupImageClose.addEventListener('click', function() {
  closePopup(popupImage);
});

popupEditClose.addEventListener('click', function() {
  closePopup(popupEdit)
});

popupAddClose.addEventListener('click', function() {
  closePopup(popupAdd)
});


popupAvatarClose.addEventListener('click', function() {
  closePopup(popupEditAvatar)
});





//открытие модального окна "редактирования профиля" и "добавление card"
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd)
});


buttonEditAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar)
})


//закрытие всех попупов по нажатию на оверлей или escape
closePopupOverlayAll()


//работа форм после сохранения
profileForm.addEventListener('submit', handleProfileFormSubmit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupFormAvatar.addEventListener('submit', handleFormSubmitEditAvatar)


//включение валидации для всех форм
enableValidation(settings)




 */