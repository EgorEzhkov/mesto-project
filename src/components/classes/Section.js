export default class Section {
  constructor({items, render}, containerSelector) {
    this._items = items;
    this._render = render;

    this.containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(element) {
    this.containerSelector.append(element);
  }
}