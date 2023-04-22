import Card from "../components/Card.js";
import {api} from "./constants.js";
import PopupWithImage from "../components/PopupWithImage.js";

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

export {createCard};