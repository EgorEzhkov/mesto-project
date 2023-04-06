import { addLike, deleteCard, deleteLike } from "./api";
import { openPopupImage } from "./modal";

export const cards = document.querySelector('.cards')
export let likes = 0
const cardTemplate = document.querySelector('#card').content;
export const card = document.querySelector('.cards__card')


export function createCard(element, userId) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const like = cardElement.querySelector('.cards__like')
  const likeCounter = cardElement.querySelector('.cards__like-counter')
  const trash = cardElement.querySelector('.cards__trash')
  const cardId = element._id
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector('.cards__like-counter').textContent = element.likes.length
  cardElement.querySelector('.cards__name').textContent = element.name;
  cardElement.querySelector('.cards__id').textContent = element._id;
  if (element.owner._id != userId) {
    trash.remove()
  };
  if (element.likes.map((item) => item._id).includes(userId)) {
    like.classList.add('cards__like_active')
  } else {
    like.classList.remove('cards__like_active')
  };
  like.addEventListener('click', () => {
    if (!like.classList.contains('cards__like_active')) {
      addLike(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length
        like.classList.add('cards__like_active')
      })
      .catch((err) => {console.log(err)})
    } else if (like.classList.contains('cards__like_active')) {
      deleteLike(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length
        like.classList.remove('cards__like_active')
      })
      .catch((err) => {console.log(err)})
    }
  });
  trash.addEventListener('click', () => {
    deleteCard(cardId)
    .then(() => {
      cardElement.remove()
    })
    .catch((err) => {console.log(err)})
  });
  cardImage.addEventListener('click', () => {
    openPopupImage(cardImage.alt, cardImage.src)
  })

  return cardElement;
};
