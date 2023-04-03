import './styles/index.css'
import {cards, initialCardsAdd} from './components/card.js';
import {openPopupImage,
  popupImageClose,
  popupEditClose,
  popupAddClose,
  closePopup,
  openPopup,
  popupImage,
  popupEdit,
  popupAdd,
  handleFormSubmit,
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
  getCardsForServer,
  deleteCard,
  addLike,
  deleteLike,
  myId,
  trashRemove
} from './components/api.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar')
const formElement = document.querySelector('.popup__form');
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

// Загрузка информации о пользователе с сервера
getProfileInfo()
.then((res) => {
  profileName.textContent = res.name;
  profileProfession.textContent = res.about;
  profileAvatar.src = res.avatar;
})
.catch((err) => {
  console.log(err)
});

// Загрузка карточек с сервера
getCardsForServer()
.then((res) => {
  res.forEach(element => {
    if ((element.owner.name === profileName.textContent) && (element.owner.about === profileProfession.textContent)) {
      initialCardsAdd(element.name, element.link, element.likes.length, element._id)
    } else {
      initialCardsAdd(element.name, element.link, element.likes.length, element._id, trashRemove)
    }
    if (element.likes.map((item) => item._id).includes(myId)) {
      document.querySelector('.cards__like').classList.add('cards__like_active')
    } else {
      document.querySelector('.cards__like').classList.remove('cards__like_active')
    }
  })
})
.catch((err) => {
  console.log(err)
});



//делегирование cards(лайк, удаление card, открытие модального окна, работа api)
cards.addEventListener('click', (evt) => {
    const cardsId = evt.target.closest('.cards__card').querySelector('.cards__id')
    const likeCounter = evt.target.closest('.cards__card').querySelector('.cards__like-counter')
  if ((evt.target.classList.contains('cards__like')) && (!evt.target.classList.contains('cards__like_active'))) {
    addLike(cardsId.textContent)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      likeCounter.innerHTML = data.likes.length
    })
    .catch((err) => {console.log(err)});
    evt.target.classList.add('cards__like_active')
  } else if (evt.target.classList.contains('cards__like_active')) {
    deleteLike(cardsId.textContent)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      likeCounter.innerHTML = data.likes.length
    })
    .catch((err) => {console.log(err)});
    evt.target.classList.remove('cards__like_active')
  };
  if (evt.target.classList.contains('cards__trash')) {
    deleteCard(evt.target.closest('.cards__card').querySelector('.cards__id').textContent)
    .catch((err) => {console.log(err)})
    evt.target.closest('.cards__card').remove()
  };
  if (evt.target.classList.contains('cards__image')) {
    openPopupImage(evt.target.alt, evt.target.src)
  }
});



//закрытие модульных окон по нажатию на крестик
popupImageClose.addEventListener('click', function() {
  closePopup(popupImage);
});

popupEditClose.addEventListener('click', function() {
  closePopup(popupEdit)
});

popupAddClose.addEventListener('click', function() {
  closePopup(popupAdd);
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
  openPopup(popupAdd);
});

buttonEditAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar)
})


//закрытие всех попупов по нажатию на оверлей или escape
closePopupOverlayAll()



//работа форм после сохранения
formElement.addEventListener('submit', handleFormSubmit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupFormAvatar.addEventListener('submit', handleFormSubmitEditAvatar)


//включение валидации для всех форм
enableValidation(settings)

