let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened')
});


let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened')
});

let popupInputs = document.querySelectorAll('.popup__input');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession')


popupInputs[0].value = profileName.textContent;
popupInputs[1].value = profileProfession.textContent;


let formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputs[0].value;
    profileProfession.textContent = popupInputs[1].value;

};

formElement.addEventListener('submit', handleFormSubmit);

let popupSubmit = document.querySelector('.popup__submit');
popupSubmit.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});
