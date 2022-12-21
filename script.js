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

function popupClose(popup) {
    popup.classList.remove('popup_opened');
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

//открытие попапа с фото
function popupImageOpened() {
  const cardsAll = document.querySelectorAll('.cards__card');
  cardsAll.forEach(function(el) {
    const cardImage = el.querySelector('.cards__image');
    const cardName = el.querySelector('.cards__name');
    cardImage.addEventListener('click', function() {
      imagePopup.src = cardImage.src;
      captionImage.textContent = cardName.textContent
      popupOpen(popupImage)
    });
    });
};


function createCard(text, image) {
  //добавление фоток
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__image').src = image;
  cardElement.querySelector('.cards__name').textContent = text;
  //система лайков
  const cardLikeElement = cardElement.querySelector('.cards__like');
  cardLikeElement.addEventListener('click', function() {
    cardLikeElement.classList.toggle('cards__like_active');
  });
  //удаление card
  const cardTrash = cardElement.querySelector('.cards__trash');
  cardTrash.addEventListener('click', function() {
    const closestCard = cardTrash.closest('.cards__card');
    closestCard.remove();
  });
  //открытие попупа
    popupImageOpened()
  return cardElement;
};

function initialCardsAdd(name, link) {
  cards.prepend(createCard(name, link))
  popupImageOpened()
  inputNameMesto.value = '';
  inputLinkMesto.value = '';
};




formElement.addEventListener('submit', handleFormSubmit);

popupFormAdd.addEventListener('submit', handleFormSubmitAdd);


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
});

popupAddClose.addEventListener('click', function() {
  popupClose(popupAdd);
});

for (let i = 0; i < initialCards.length; i++) {
  cards.append(createCard(initialCards[i].name, initialCards[i].link));
};


