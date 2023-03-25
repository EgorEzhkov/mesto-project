import './styles/index.css'
import {cards, initialCards, createCard} from './components/card.js';
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
} from './components/modal.js';
import {enableValidation} from './components/validate.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const popupFormAdd = document.getElementById('popup__form_add');
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
]


//Загрузка начальных карточек
for (let i = 0; i < initialCards.length; i++) {
  cards.append(createCard(initialCards[i].name, initialCards[i].link));
};



//делегирование cards(лайк, удаление card, открытие модального окна)
cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cards__like')) {
    evt.target.classList.toggle('cards__like_active');
  };
  if (evt.target.classList.contains('cards__trash')) {
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


//открытие модального окна "редактирования профиля" и "добавление card"
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});


//закрытие всех попупов по нажатию на оверлей или escape
closePopupOverlayAll()


//работа форм после сохранения
formElement.addEventListener('submit', handleFormSubmit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);


//включение валидации для всех форм
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error-active',
}

enableValidation(settings)
