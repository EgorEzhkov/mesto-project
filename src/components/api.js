import { buttonSubmitAdd, buttonSubmitAvatar, buttonSubmitEdit, profileName, profileProfession } from "./modal.js";
import { renderLoading } from "./utils.js";

const token = 'd49dae7b-52fd-4787-ad1c-63454d12ebd1'
export const like = document.querySelector('.cards__like-counter')
export const trashRemove = true;
export const myId = 'e871dc8690cbbaff627df173'

const config = {
  server: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

export function getProfileInfo() {
  return fetch(config.server + 'users/me', {
    method: 'GET',
    headers: config.headers
  })
};

// Загрузка карточек с сервера
export function getCardsForServer() {
  return fetch(config.server + 'cards', {
    method: 'GET',
    headers: config.headers
  })
};


// Редактирование профиля
export function editProfileInfo(name, about) {
  renderLoading(true, 'Сохранение...', 'Сохранить', buttonSubmitEdit)
  return fetch(config.server + 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
};

// Изменение аватарки
export function editProfileAvatar(link) {
  renderLoading(true, 'Сохранение...', 'Сохранить', buttonSubmitAvatar)
  return fetch(config.server + 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
};

// Добавление карточки на сервер
export function addCard(name, link) {
  renderLoading(true, 'Создание...', 'Создать', buttonSubmitAdd)
  return fetch(config.server + 'cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
};

// Удаление карточки
export function deleteCard(id) {
  return fetch(config.server + 'cards/' + `${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function addLike(id) {
  return fetch(config.server + 'cards/likes/' + `${id}`, {
    method: 'PUT',
    headers: config.headers
  })
}



export function deleteLike(id) {
  return fetch(config.server + 'cards/likes/' + `${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
};
