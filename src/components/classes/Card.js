// Карточка принимает данные из Api о карточке и передаёт темплейт html формы карточки

export default class Card {
  constructor({cardData, addLike, deleteLike, deleteCard, handleCardClick}, userId, selectorTemplate) {
    this.cardLink = cardData.link;
    this.cardName = cardData.name;
    this.cardOwner = cardData.owner._id;
    this.cardLikes = cardData.likes;
    this.cardId = cardData._id;
    this.addLike = addLike;
    this.deleteLike = deleteLike;
    this.userId = userId;
    this.deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
    this.cardTemplate = selectorTemplate;
  }

  _getElement() {
    const cardElement = document.querySelector(this.cardTemplate).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }

  _checkIdOwner(deleteButton) {
    if (this.cardOwner !== this.userId) {
      deleteButton.remove();
    }
  }

  _toggleButtonLikes(likeCounter, like) {
    let count = this.cardLikes.length;
    if (count != 0) {
      likeCounter.classList.add('cards__like-counter_active');
      likeCounter.textContent = count;
    }

    this.cardLikes.forEach((item) => {
      if (item._id === this.userId) {
        like.classList.add('cards__like_active');
      }
    });

    like.addEventListener('click', () => {
      if (!like.classList.contains('cards__like_active')) {
        this.addLike(likeCounter, like);
      } else {
        this.deleteLike(likeCounter, like);
      }
    });
  }

  _handleImageClick(cardImage) {
    this._handleCardClick(cardImage);
  }

  _deleteCard(deleteButton) {
    this._checkIdOwner(deleteButton);
    this.deleteCard(deleteButton);
  }

  _setEventListeners(cardImage, likeCounter, like, trash) {
    this._handleImageClick(cardImage);
    this._toggleButtonLikes(likeCounter, like);
    this._deleteCard(trash);
  }

  generate() {
    this.element = this._getElement();
    const cardImage = this.element.querySelector('.cards__image');
    const like = this.element.querySelector('.cards__like');
    const likeCounter = this.element.querySelector('.cards__like-counter');
    const trash = this.element.querySelector('.cards__trash');
    this._setEventListeners(cardImage, likeCounter, like, trash);

    cardImage.src = this.cardLink;
    cardImage.alt = this.cardName;
    likeCounter.textContent = this.cardLikes.length;
    this.element.querySelector('.cards__name').textContent = this.cardName;
    this.element.querySelector('.cards__id').textContent = this.cardId;

    return this.element;
  }
}

