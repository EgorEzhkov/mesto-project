export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameSelector = document.querySelector(nameSelector) ;
    this.aboutSelector = document.querySelector(aboutSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.nameSelector.textContent,
      about: this.aboutSelector.textContent,
      avatar: this.avatarSelector.src,
      id: ''
    }
  }

  setUserInfo(value) {
    this.nameSelector.textContent = value.name;
    this.aboutSelector.textContent = value.about;

  }

  setUserAvatar(value) {
    this.avatarSelector.src = value.avatar;
  }
}
