const inputName = document.getElementById('name')
const inputProfession = document.getElementById('profession')
const inputNameMesto = document.getElementById('mesto');
const inputLinkMesto = document.getElementById('link')
const popupEdit = document.getElementById('edit_popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession')
const formElement = document.querySelector('.popup__form');
const popupAdd = document.getElementById('add_popup');
const buttonAdd = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card').content;
const popupFormAdd = document.getElementById('popup__form_add');
const popupSubmitAdd = document.getElementById('popup__submit_add');
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');
const popupSubmit = document.querySelector('.popup__submit');
const popupImage = document.getElementById('image_popup');
const imagePopup = popupImage.querySelector('.popup__image');
const captionImage = document.querySelector('.popup__caption')
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



function popupOpen(popup, button) {
  button.addEventListener('click', function() {
    popup.classList.add('popup_opened');
  });
};

function popupClose(popup) {
  const close = popup.querySelector('.popup__close')
  close.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  });
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
};

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  inputMesto.textContent = inputNameMesto.value;
  inputLink.src = inputLinkMesto.value;
  initialCardsAdd(inputMesto.textContent, inputLink.src);
  popupImageOpened()
};

//открытие попапа с фото
function popupImageOpened() {
  popupImage.style = 'background: rgba(0, 0, 0, 0.9)'
  const cardsAll = document.querySelectorAll('.cards__card');
  cardsAll.forEach(function(el) {
    const cardImage = el.querySelector('.cards__image');
    const cardName = el.querySelector('.cards__name');
    popupOpen(popupImage, cardImage)
    el.addEventListener('click', function() {
      imagePopup.src = cardImage.src;
      captionImage.textContent = cardName.textContent
    });
    popupClose(popupImage);
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
  return cardElement;
};

function initialCardsAdd(name, link) {
  cards.prepend(createCard(name, link))
  inputNameMesto.value = '';
  inputLinkMesto.value = '';
};




formElement.addEventListener('submit', handleFormSubmit);
popupSubmit.addEventListener('click', function() {
  popupEdit.classList.remove('popup_opened');
});

popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupSubmitAdd.addEventListener('click', function() {
  popupAdd.classList.remove('popup_opened')
})

popupOpen(popupEdit, buttonEdit);
popupClose(popupEdit);

popupOpen(popupAdd, buttonAdd);
popupClose(popupAdd);

for (let i = 0; i < initialCards.length; i++) {
  cards.append(createCard(initialCards[i].name, initialCards[i].link));
  popupImageOpened()
};


