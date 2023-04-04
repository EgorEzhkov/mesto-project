export const cards = document.querySelector('.cards')
export let likes = 0
const cardTemplate = document.querySelector('#card').content;
export const card = document.querySelector('.cards__card')

export function createCard(text, image, likes, idCard, trashRemove) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = text;
  cardElement.querySelector('.cards__like-counter').textContent = likes
  cardElement.querySelector('.cards__name').textContent = text;
  cardElement.querySelector('.cards__id').textContent = idCard;
  if (trashRemove) {
    cardElement.querySelector('.cards__trash').remove()
  }
  return cardElement;
};

export function initialCardsAdd(name, link, likes, idCard, trashRemove) {
  cards.prepend(createCard(name, link, likes, idCard, trashRemove))
};



