export default class Section {
  constructor({items, render}, containerSelector) {
    this.items = items;
    this._render = render;

    this.containerSelector = document.body.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(element) {
    this.containerSelector.append(element);
  }

  addItemFirst(element) {
    this.containerSelector.prepend(element);
  }
}