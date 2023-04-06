import { checkResponse } from "./utils.js";
const token = 'd49dae7b-52fd-4787-ad1c-63454d12ebd1'
export const trashRemove = true;

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
  .then(checkResponse)
};

// Загрузка карточек с сервера
export function getCardsForServer() {
  return fetch(config.server + 'cards', {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse)
};


// Редактирование профиля
export function editProfileInfo(name, about) {
  return fetch(config.server + 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
};

// Изменение аватарки
export function editProfileAvatar(link) {
  return fetch(config.server + 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(checkResponse)
};

// Добавление карточки на сервер
export function addCard(name, link) {
  return fetch(config.server + 'cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
};

// Удаление карточки
export function deleteCard(id) {
  return fetch(config.server + 'cards/' + `${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export function addLike(id) {
  return fetch(config.server + 'cards/likes/' + `${id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
}



export function deleteLike(id) {
  return fetch(config.server + 'cards/likes/' + `${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
};
