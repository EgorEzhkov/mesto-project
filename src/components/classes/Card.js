// Карточка принимает данные из Api о карточке и передаёт темплейт html формы карточки

export default class Card {
  constructor({cardData, putLike, deleteLike, deleteCard}, userId, handleCardClick, selectorTemplate) {
    this.cardLink = cardData.link;
    this.cardName = cardData.name;
    this.cardOwner = cardData.owner._id;
    this.cardLikes = cardData.likes;
    this.cardId = cardData._id;
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this.deleteCard = deleteCard;

    this.userId = userId;

    this._handleCardClick = handleCardClick;

    this.cardTemplate = selectorTemplate;
  }

  _findError(err) {
    console.log(`Ошибка: ${err}`);
  }

  _getElement() {
    const cardElement = document.querySelector(this.selectorTemplate).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }

  _checkIdOwner(deleteButton) {
    if (this.cardOwner !== this.userId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', this._deleteCard);
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
        this.putLike.then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.add('cards__like_active');
          if (!likeCounter.classList.contains('cards__like-counter_active')) {
            likeCounter.classList.add('cards__like-counter_active');
          }
        }).catch(this._findError);
      } else {
        this.deleteLike.then((data) => {
          likeCounter.textContent = data.likes.length;
          like.classList.remove('cards__like_active');
          if (data.likes.length === 0) {
            likeCounter.classList.remove('cards__like-counter_active');
          }
        }).catch(this._findError);
      }
    });
  }

  _handleImageClick(cardImage) {
    cardImage.addEventListener('click', this._handleCardClick);
  }

  _deleteCard() {
    this.deleteCard.then(() => {
      this.element.remove();
    }).catch(this._findError);
  }

  _setEventListeners(cardImage, likeCounter, like, trash) {
    this._handleCardClick(cardImage);
    this._toggleButtonLikes(likeCounter, like);
    this._checkIdOwner(trash);
  }

  generate() {
    this.element = this._getElement();
    const cardImage = this.element.querySelector('.cards__image');
    const like = this.element.querySelector('.cards__like');
    const likeCounter = this.element.querySelector('.cards__like-counter');
    const trash = this.element.querySelector('.cards__trash');
    this._setEventListeners(cardImage, likeCounter, like, trash);

    cardImage.src = element.link;
    cardImage.alt = element.name;
    likeCounter.textContent = this.cardLikes.length;
    this.element.querySelector('.cards__name').textContent = this.cardName;
    this.element.querySelector('.cards__id').textContent = this.cardId;

    return this.element;
  }
}