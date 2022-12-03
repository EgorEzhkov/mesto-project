let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened')
});

let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened')
})
