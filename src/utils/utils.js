import Card from "../components/Card.js";
import {api, settings} from "./constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

function createCard(cardInfo, ownerId) {
  const card = new Card({
    cardData: cardInfo,
    addLike: (likeCounter, like) => {
      api.addLike(cardInfo._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.add('cards__like_active');
          if (!likeCounter.classList.contains('cards__like-counter_active')) {
            likeCounter.classList.add('cards__like-counter_active');
          }
        })
        .catch(card._findError)},
    deleteLike: (likeCounter, like) => {
      api.deleteLike(cardInfo._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.remove('cards__like_active');
          if (data.likes.length === 0) {
            likeCounter.classList.remove('cards__like-counter_active');
          }
        })
        .catch(card._findError);
    },
    deleteCard: (trash) => {
      trash.addEventListener('click', () => {
        api.deleteCard(cardInfo._id).then(() => {
          card.element.remove();
        }).catch(card._findError)
      });
    },
    handleCardClick: (cardImage) => {
      const popupImage = new PopupWithImage(cardInfo.link, cardInfo.name, 'image_popup')
      cardImage.addEventListener('click', () => {
        popupImage.open()
        popupImage.setEventListeners()
      })
    }
  },
  ownerId,
  '#card');
  const cardElement = card.generate();
  return cardElement;
}

function findError(err) {
  console.log(`Ошибка: ${err}`)
}

function renderLoading(isLoading, button, loadingText, buttonText) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

function createForm({api, clickEvent}, button, selector) {
  const popup = new PopupWithForm({
    submitCallBack: (value) => {
      api(value);
    }
  }, selector);
  const formValidation = new FormValidator(settings, popup.form);
  formValidation.enableValidation();
  popup.setEventListeners();
  button.addEventListener('click', () => {
    clickEvent(popup);
  });
}

export {createCard, findError, renderLoading, createForm};