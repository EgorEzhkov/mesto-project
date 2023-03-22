import { initialCardsAdd } from "./card.js";
const captionImage = document.querySelector('.popup__caption');
const inputNameMesto = document.getElementById('mesto');
const inputLinkMesto = document.getElementById('link')
export const popupImage = document.getElementById('image_popup');
const imagePopup = popupImage.querySelector('.popup__image');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession')
const inputName = document.getElementById('name')
const inputProfession = document.getElementById('profession')
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');
const popupSubmitAdd = document.getElementById('popup__submit_add');
export const popupImageClose = document.getElementById('image_popup_close');
export const popupEditClose = document.getElementById('edit_popup_close');
export const popupAdd = document.getElementById('add_popup');
export const popupEdit = document.getElementById('edit_popup');
export const popupAddClose = document.getElementById('add_popup_close');



export function popupOpen(popup) {
  popup.classList.add('popup_opened');
};

export function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

export function openedPopupImage(text, image) {
	imagePopup.src = image;
  imagePopup.alt = text;
	captionImage.textContent = text ;
	popupOpen(popupImage)
};


export const popupCloseKeydown = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popupClose(popup)
    }
  })
};


export const popupCloseOverlay = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      popupClose(popup)
    }
  })
}


export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupClose(popupEdit);
};


export function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  inputMesto.textContent = inputNameMesto.value;
  inputLink.src = inputLinkMesto.value;
  initialCardsAdd(inputMesto.textContent, inputLink.src);
	popupClose(popupAdd);
  evt.target.reset();
  popupSubmitAdd.classList.add('popup__submit_disabled');
  popupSubmitAdd.disabled = true;
};


export const popupCloseKeydownAndOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.forEach((popup) => {
    popupCloseKeydown(popup);
    popupCloseOverlay(popup);
  });
}


inputName.value = profileName.textContent;
inputProfession.value = profileProfession.textContent;



