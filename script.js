

function popupHandler(popup, trigger) {
  trigger.addEventListener('click', function () {
    popup.classList.add('popup_opened');
  });
  const close = popup.querySelector('.popup__close')
  close.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  });
};


const inputName = document.getElementById('name')
const inputProfession = document.getElementById('profession')
const inputNameMesto = document.getElementById('mesto');
const inputLinkMesto = document.getElementById('link')


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
};

//открытие попапа с фото
function popupImageOpened() {
  const popupImage = document.getElementById('image_popup');
  popupImage.style = 'background: rgba(0, 0, 0, 0.9)'
  const imagePopup = popupImage.querySelector('.popup__image');
  const captionImage = document.querySelector('.popup__caption')
  const card = document.querySelectorAll('.cards__card');
  card.forEach(function(el) {
    const cardImage = el.querySelector('.cards__image');
    const cardName = el.querySelector('.cards__name');
    popupHandler(popupImage, cardImage);
    el.addEventListener('click', function() {
      imagePopup.src = cardImage.src;
      captionImage.textContent = cardName.textContent
    })
    });
};

//функция для добавления 6 фоток из массива и система лайков + удаление card
function createCard(text, image) {
  //добавление фоток
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__image').src = image;
  cardElement.querySelector('.cards__name').textContent = text;
  cards.append(cardElement)
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
    const closestCard = cardTrash.closest('.cards__card');
    closestCard.remove();
  });
  popupImageOpened();
	return cardElement;
};

//функция для добавления фоток из popup'a сайта add и система лайков + удаление card
function cardAddPrepend(text, image) {
  //добавление фоток
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__image').src = image;
  cardElement.querySelector('.cards__name').textContent = text;
  cards.prepend(cardElement);
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
  popupImageOpened();
};

function initialCardsAdd(name, link) {
  cardAddPrepend(name, link)
  inputNameMesto.value = '';
  inputLinkMesto.value = '';
};


const popupEdit = document.getElementById('edit_popup');
const buttonEdit = document.querySelector('.profile__edit-button');

popupHandler(popupEdit, buttonEdit)



const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession')

inputName.value = profileName.textContent;
inputProfession.value = profileProfession.textContent;



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
  createCard(initialCards[i].name, initialCards[i].link);
};



const popupFormAdd = document.getElementById('popup__form_add');
const popupSubmitAdd = document.getElementById('popup__submit_add');
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');

popupFormAdd.addEventListener('submit', handleFormSubmitAdd);

popupSubmitAdd.addEventListener('click', function() {
  popupAdd.classList.remove('popup_opened');
});

