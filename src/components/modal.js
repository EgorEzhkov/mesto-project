import { initialCardsAdd, likes } from "./card.js";
import { editProfileInfo, addCard, editProfileAvatar, trashRemove } from "./api.js";
import { renderLoading } from "./utils.js";
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
export const popupEditAvatar = document.getElementById('avatar_popup');
export const popupAvatarClose = document.getElementById('avatar_popup_close');
const avatarLink = document.getElementById('avatarLink');
const avatar = document.querySelector('.profile__avatar');
export const buttonSubmitEdit = document.querySelector('.popup__submit');
export const buttonSubmitAvatar = document.getElementById('popup__submit_avatar')
export const buttonSubmitAdd = document.getElementById('popup__submit_add')
export const popup = document.querySelector('.popup')
const popupSubmitAvatar = document.getElementById('popup__submit_avatar')

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
  editProfileInfo(inputName.value, inputProfession.value)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then(() => {
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup(popupEdit);
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, 'Сохранение...', 'Сохранить', buttonSubmitEdit)
  })

};


export function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  inputMesto.textContent = inputNameMesto.value;
  inputLink.src = inputLinkMesto.value;
  addCard(inputMesto.textContent, inputLink.src)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((res) => {
    initialCardsAdd(inputMesto.textContent, inputLink.src, likes, res._id);
    closePopup(popupAdd);
    evt.target.reset();
    popupSubmitAdd.classList.add('popup__submit_disabled');
    popupSubmitAdd.disabled = true;
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, 'Создание...', 'Создать', buttonSubmitAdd)
  });

};

export function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  editProfileAvatar(avatarLink.value)
  .then((res) => {
    if (res.ok) {
      return res
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then(() => {
    avatar.src = avatarLink.value
    evt.target.reset()
    popupSubmitAvatar.classList.add('popup__submit_disabled')
    popupSubmitAdd.disabled = true
    closePopup(popupEditAvatar)
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, 'Сохранение...', 'Сохранить', buttonSubmitAvatar)
  });
};

export const closePopupOverlayAll = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.forEach((popup) => {
    closePopupOverlay(popup);
  });
};







