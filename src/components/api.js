export default class Api {
  constructor(config) {
    this._server = config.server;
    this._headers = config.headers;
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
    return this._request(this._server + 'users/me', {
      method: 'GET',
      headers: this._headers
    });
  }

  getCardsForServer() {
    return this._request(`${this._server}cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  editProfileInfo(name, about) {
    return this._request(`${this._server}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  editProfileAvatar(link) {
    return this._request(`${this._server}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  addCard(name, link) {
    return this._request(`${this._server}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    return this._request(`${this._server}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  addLike(id) {
    return this._request(`${this._server}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike(id) {
    return this._request(`${this._server}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }
}

