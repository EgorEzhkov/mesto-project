// Карточка принимает данные из Api о карточке и передаёт темплейт html формы карточки

export default class Card {
  constructor({cardData, addLike, deleteLike, deleteCard, handleCardClick}, userId, selectorTemplate) {
    this._cardLink = cardData.link;
    this._cardName = cardData.name;
    this._cardOwner = cardData.owner._id;
    this._cardLikes = cardData.likes;
    this._cardId = cardData._id;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._userId = userId;
    this.deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = selectorTemplate;
  }

  _getElement() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }

  _checkIdOwner(deleteButton) {
    if (this._cardOwner !== this._userId) {
      deleteButton.remove();
    }
  }

  _toggleButtonLikes(likeCounter, like) {
    const count = this._cardLikes.length;
    if (count !== 0) {
      likeCounter.classList.add('cards__like-counter_active');
      likeCounter.textContent = count;
    }

    this._cardLikes.forEach((item) => {
      if (item._id === this._userId) {
        like.classList.add('cards__like_active');
      }
    });

    like.addEventListener('click', () => {
      if (!like.classList.contains('cards__like_active')) {
        this._addLike(likeCounter, like);
      } else {
        this._deleteLike(likeCounter, like);
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

  putLike(data, likeCounter, like) {
    likeCounter.textContent = data.likes.length;
    like.classList.add('cards__like_active');
    if (!likeCounter.classList.contains('cards__like-counter_active')) {
      likeCounter.classList.add('cards__like-counter_active');
    }
  }

  deleteLike(data, likeCounter, like) {
    likeCounter.textContent = data.likes.length;
    like.classList.remove('cards__like_active');
    if (data.likes.length === 0) {
      likeCounter.classList.remove('cards__like-counter_active');
    }
  }

  cardRemove() {
    this.element.remove();
  }

  generate() {
    this.element = this._getElement();
    const cardImage = this.element.querySelector('.cards__image');
    const like = this.element.querySelector('.cards__like');
    const likeCounter = this.element.querySelector('.cards__like-counter');
    const trash = this.element.querySelector('.cards__trash');
    this._setEventListeners(cardImage, likeCounter, like, trash);

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;
    likeCounter.textContent = this._cardLikes.length;
    this.element.querySelector('.cards__name').textContent = this._cardName;
    this.element.querySelector('.cards__id').textContent = this._cardId;

    return this.element;
  }
}

