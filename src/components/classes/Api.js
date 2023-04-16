export const trashRemove = true;

const config = {
  server: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: 'd49dae7b-52fd-4787-ad1c-63454d12ebd1',
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(config, checkResponse) {
    this.server = config.server;
    this.headers = config.headers;
    this.checkResponse = checkResponse;
  }

  _request(server, settings) {
    return fetch(server, settings).then(this.checkResponse);
  }

  getProfileInfo() {
    this._request(this.server + 'users/me', {
      method: 'GET',
      headers: this.headers
    });
  }

  getCardsForServer() {
    this._request(this.server + 'cards', {
      method: 'GET',
      headers: this.headers
    });
  }

  editProfileInfo(name, about) {
    this._request(this.server + 'users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  editProfileAvatar(link) {
    this._request(this.server + 'users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  addCard(name, link) {
    this._request(this.server + 'cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    this._request(this.server + 'cards/' + `${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  addLike(id) {
    this._request(this.server + 'cards/likes/' + `${id}`, {
      method: 'PUT',
      headers: this.headers
    });
  }

  deleteLike(id) {
    this._request(this.server + 'cards/likes/' + `${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }
}