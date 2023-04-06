import './styles/index.css'
import {cards, createCard} from './components/card.js';
import {openPopupImage,
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
  getCardsForServer,
  deleteCard,
  addLike,
  deleteLike,
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
profileForm.addEventListener('submit', handleProfileFormSubmit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupFormAvatar.addEventListener('submit', handleFormSubmitEditAvatar)


//включение валидации для всех форм
enableValidation(settings)

