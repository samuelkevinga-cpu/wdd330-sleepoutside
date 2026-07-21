export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key)|| [];
    //this.calculateItemSummary();
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    const itemCountElement = document.querySelector(`${this.outputSelector} #num-items`);
    itemCountElement.innerText = this.list.length;

    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;

    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;

    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();

  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    tax.innerText = `$${this.tax.toFixed(2)}`;

    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    shipping.innerText = `$${this.shipping.toFixed(2)}`;

    const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}