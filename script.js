
function popupHandler(popup, trigger) {
  trigger.addEventListener('click', function () {
    popup.classList.add('popup_opened');
  });
  const close = popup.querySelector('.popup__close')
  close.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  });
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputs[0].value;
  profileProfession.textContent = popupInputs[1].value;
};

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  inputMesto.textContent = popupInputs[2].value;
  inputLink.src = popupInputs[3].value;
  initialCardsAdd(inputMesto.textContent, inputLink.src);
  popupInputs[2].value = '';
  popupInputs[3].value = '';
};

//функция для добавления 6 фоток из массива и система лайков + удаление card
function cardsAddAppend(text, image) {
  //добавление фоток
  let cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__image').src = image;
  cardElement.querySelector('.cards__name').textContent = text;
  cards.append(cardElement);
  //система лайков
  const cardLikeElements = cardElement.querySelectorAll('.cards__like');
  cardLikeElements.forEach(function(el) {
    el.addEventListener('click', function() {
      el.classList.toggle('cards__like_active');
    });
  });
  //удаление card
  const cardTrash = cardElement.querySelector('.cards__trash');
  cardTrash.addEventListener('click', function() {
    let closestCard = cardTrash.closest('.cards__card');
    closestCard.remove();
  });
};


//функция для добавления фоток из popup'a сайта add и система лайков + удаление card
function cardAddPrepend(text, image) {
  //добавление фоток
  let cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__image').src = image;
  cardElement.querySelector('.cards__name').textContent = text;
  cards.prepend(cardElement);
  //система лайков
  const cardLikeElements = cardElement.querySelector('.cards__like');
  cardLikeElements.addEventListener('click', function() {
    cardLikeElements.classList.toggle('cards__like_active');
  });
  //удаление card
  const cardTrash = cardElement.querySelector('.cards__trash');
  cardTrash.addEventListener('click', function() {
    let closestCard = cardTrash.closest('.cards__card');
    closestCard.remove();
  });
};


function initialCardsAdd(name, link) {
	initialCards.unshift({name, link});
  cardAddPrepend(initialCards[0].name, initialCards[0].link)
};

const popupEdit = document.getElementById('edit_popup');
const buttonEdit = document.querySelector('.profile__edit-button');

popupHandler(popupEdit, buttonEdit)

const popupInputs = document.querySelectorAll('.popup__input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession')

popupInputs[0].value = profileName.textContent;
popupInputs[1].value = profileProfession.textContent;

const formElement = document.querySelector('.popup__form');

formElement.addEventListener('submit', handleFormSubmit);

const popupSubmit = document.querySelector('.popup__submit');
popupSubmit.addEventListener('click', function() {
  popupEdit.classList.remove('popup_opened');
});



const popupAdd = document.getElementById('add_popup');
const buttonAdd = document.querySelector('.profile__add-button');

popupHandler(popupAdd, buttonAdd);

const cards = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card').content;

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


for (let i = 0; i < initialCards.length; i++) {
  cardsAddAppend(initialCards[i].name, initialCards[i].link);
};



const popupFormAdd = document.getElementById('popup__form_add');
const popupAddClose = document.getElementById('popup__submit_add');
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');

popupFormAdd.addEventListener('submit', handleFormSubmitAdd);

popupAddClose.addEventListener('click', function() {
  popupAdd.classList.remove('popup_opened');
});


