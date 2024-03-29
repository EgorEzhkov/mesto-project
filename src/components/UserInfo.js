export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector) ;
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      avatar: this._avatarSelector.src
    }
  }

  setUserInfo(value) {
    this._nameSelector.textContent = value.name;
    this._aboutSelector.textContent = value.about;

  }

  setUserAvatar(value) {
    this._avatarSelector.src = value.avatar;
  }
}
