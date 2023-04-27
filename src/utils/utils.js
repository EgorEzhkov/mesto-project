import Card from "../components/Card.js";
import {api, popupImage} from "./constants.js";

function createCard(cardInfo, ownerId) {
  const card = new Card({
    cardData: cardInfo,
    addLike: (likeCounter, like) => {
      api.addLike(cardInfo._id)
        .then((data) => {
          card.putLike(data, likeCounter, like);
        })
        .catch((err) => {findError(err)})},
    deleteLike: (likeCounter, like) => {
      api.deleteLike(cardInfo._id)
        .then((data) => {
          card.deleteLike(data, likeCounter, like);
        })
        .catch((err) => {findError(err)});
    },
    deleteCard: (trash) => {
      trash.addEventListener('click', () => {
        api.deleteCard(cardInfo._id).then(() => {
          card.cardRemove();
        }).catch((err) => {findError(err)})
      });
    },
    handleCardClick: (cardImage) => {
      cardImage.addEventListener('click', () => {
        popupImage.image = cardInfo.link;
        popupImage.text = cardInfo.name;
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

export {createCard, findError, renderLoading};
