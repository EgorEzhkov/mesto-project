export const trashRemove = true;

export default class Api {
  constructor(config) {
    this.server = config.server;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(server, settings) {
    return fetch(server, settings).then(this._checkResponse);
  }

  getProfileInfo() {
    return this._request(this.server + 'users/me', {
      method: 'GET',
      headers: this.headers
    });
  }

  getCardsForServer() {
    return this._request(`${this.server}cards`, {
      method: 'GET',
      headers: this.headers
    });
  }

  editProfileInfo(name, about) {
    return this._request(`${this.server}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  editProfileAvatar(link) {
    return this._request(`${this.server}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  addCard(name, link) {
    return this._request(`${this.server}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    return this._request(`${this.server}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  addLike(id) {
    return this._request(`${this.server}cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    });
  }

  deleteLike(id) {
    return this._request(`${this.server}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }
}