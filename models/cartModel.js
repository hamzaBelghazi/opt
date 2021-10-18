module.exports = class Cart {
  constructor(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;
  }

  add(item, itemId) {
    let sotredItem = this.items[itemId];
    if (!sotredItem) {
      sotredItem = this.items[itemId] = { item: item, quantity: 0, price: 0 };
    }
    sotredItem.quantity++;
    sotredItem.price = sotredItem.item.price * sotredItem.quantity;
    this.totalQuantity++;
    this.totalPrice += sotredItem.item.price;
  }
  list() {
    let cartList = [];
    for (let id in this.items) {
      cartList.push(this.items[id]);
    }
    return cartList;
  }

  delete(itemId) {
    if (this.items[itemId]) {
      this.totalPrice -= this.items[itemId].price;
      this.totalQuantity -= this.items[itemId].quantity;
      delete this.items[itemId];
    }
    return this.list(this.items);
  }

  incDecQuantity(id, q) {
    if (this.items[id]) {
      this.totalQuantity -= this.items[id].quantity;
      this.totalPrice -= this.items[id].price;
      this.items[id].quantity = Number(q);
      this.items[id].price = this.items[id].item.price * q;
      this.totalPrice += this.items[id].price;
      this.totalQuantity += this.items[id].quantity;
    }
    return this.list(this.items);
  }
};
