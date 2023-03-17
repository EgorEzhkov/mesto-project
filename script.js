const inputName = document.getElementById('name')
const inputProfession = document.getElementById('profession')
const inputNameMesto = document.getElementById('mesto');
const inputLinkMesto = document.getElementById('link')
const popupEdit = document.getElementById('edit_popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditClose = document.getElementById('edit_popup_close');
const popupAddClose = document.getElementById('add_popup_close');
const popupAdd = document.getElementById('add_popup');
const buttonAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession')
const formElement = document.querySelector('.popup__form');
const cards = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card').content;
const popupFormAdd = document.getElementById('popup__form_add');
const popupSubmitAdd = document.getElementById('popup__submit_add');
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');
const popupSubmit = document.querySelector('.popup__submit');
const popupImage = document.getElementById('image_popup');
const popupImageOpened = document.querySelector('.popup_opened')
const popupImageClose = document.getElementById('image_popup_close');
const imagePopup = popupImage.querySelector('.popup__image');
const captionImage = document.querySelector('.popup__caption');
inputName.value = profileName.textContent;
inputProfession.value = profileProfession.textContent;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



function popupOpen(popup) {
    popup.classList.add('popup_opened');
};


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupClose(popupEdit);
};


function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  inputMesto.textContent = inputNameMesto.value;
  inputLink.src = inputLinkMesto.value;
  initialCardsAdd(inputMesto.textContent, inputLink.src);
	popupClose(popupAdd);
};

//Заполнение ПоПуПа данными
function openedPopupImage(text, image) {
	imagePopup.src = image;
  imagePopup.alt = text;
	captionImage.textContent = text ;
	popupOpen(popupImage)
};

//добавление фоток
function createCard(text, image) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = text;
  cardElement.querySelector('.cards__name').textContent = text;
  return cardElement;
};

function initialCardsAdd(name, link) {
  cards.prepend(createCard(name, link))
};

const popupCloseKeydown = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popupClose(popup)
    }
  })
};

function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

const popupCloseOverlay = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      popupClose(popup)
    }
  })
}


formElement.addEventListener('submit', handleFormSubmit);

popupFormAdd.addEventListener('submit', handleFormSubmitAdd);

//Слушатель на кнопку закрытия ПоПуПа картинок, повешенный глобально
popupImageClose.addEventListener('click', function() {
  popupClose(popupImage);
});

buttonEdit.addEventListener('click', function() {
  popupOpen(popupEdit);
});

popupEditClose.addEventListener('click', function() {
  popupClose(popupEdit)
});

buttonAdd.addEventListener('click', function() {
  popupOpen(popupAdd);
	inputNameMesto.value = '';
  inputLinkMesto.value = '';
});

popupAddClose.addEventListener('click', function() {
  popupClose(popupAdd);
});

cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cards__like')) {
    evt.target.classList.toggle('cards__like_active');
  };
  if (evt.target.classList.contains('cards__trash')) {
    evt.target.closest('.cards__card').remove()
  };
  if (evt.target.classList.contains('cards__image')) {
    openedPopupImage(evt.target.alt, evt.target.src)
  }
});

popupCloseKeydown(popupImage);
popupCloseKeydown(popupAdd);
popupCloseKeydown(popupEdit);
popupCloseOverlay(popupImage);
popupCloseOverlay(popupAdd);
popupCloseOverlay(popupEdit);



for (let i = 0; i < initialCards.length; i++) {
  cards.append(createCard(initialCards[i].name, initialCards[i].link));
};

const formInput = formElement.querySelectorAll('.popup__input')


const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error-active');
};

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input_error-active');
  errorElement.textContent = '';
}

const checkInputValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
} else {
    input.setCustomValidity("");
}
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input)
  };
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation()
