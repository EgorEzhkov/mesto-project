import { initialCardsAdd } from "./card.js";
const captionImage = document.querySelector('.popup__caption');
const inputNameMesto = document.getElementById('mesto');
const inputLinkMesto = document.getElementById('link')
export const popupImage = document.getElementById('image_popup');
const imagePopup = popupImage.querySelector('.popup__image');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession')
export const inputName = document.getElementById('name')
export const inputProfession = document.getElementById('profession')
const inputMesto = document.getElementsByName('mesto');
const inputLink = document.getElementsByName('link');
const popupSubmitAdd = document.getElementById('popup__submit_add');
export const popupImageClose = document.getElementById('image_popup_close');
export const popupEditClose = document.getElementById('edit_popup_close');
export const popupAdd = document.getElementById('add_popup');
export const popupEdit = document.getElementById('edit_popup');
export const popupAddClose = document.getElementById('add_popup_close');


export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

export function openPopupImage(text, image) {
	imagePopup.src = image;
  imagePopup.alt = text;
	captionImage.textContent = text ;
	openPopup(popupImage)
};



export const closePopupOverlay = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  })
};


export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEdit);
};


export function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  inputMesto.textContent = inputNameMesto.value;
  inputLink.src = inputLinkMesto.value;
  initialCardsAdd(inputMesto.textContent, inputLink.src);
	closePopup(popupAdd);
  evt.target.reset();
  popupSubmitAdd.classList.add('popup__submit_disabled');
  popupSubmitAdd.disabled = true;
};


export const closePopupOverlayAll = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.forEach((popup) => {
    closePopupOverlay(popup);
  });
};





