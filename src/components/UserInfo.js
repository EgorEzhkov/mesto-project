class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameSelector = document.querySelector(nameSelector) ;
    this.aboutSelector = document.querySelector(aboutSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.nameSelector.textContent,
      about: this.aboutSelector.textContent,
      avatar: this.avatarSelector.src
    }
  }

  setUserInfo({name, about, avatar}) {
    this.nameSelector.textContent = name;
    this.aboutSelector.textContent = about;
    this.avatarSelector.src = avatar;
  }
}
