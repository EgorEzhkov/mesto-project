export default class Section {
  constructor({items, render}, containerSelector) {
    this.items = items;
    this._render = render;

    this._containerSelector = document.body.querySelector(containerSelector);
  }

  renderItems(userId) {
    this.items.forEach((item) => {
      this._render(item, userId);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  addItemFirst(element) {
    this._containerSelector.prepend(element);
  }
}
