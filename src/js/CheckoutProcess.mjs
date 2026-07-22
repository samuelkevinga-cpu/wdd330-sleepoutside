import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

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
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector);
    const itemNumElement = summaryElement.querySelector("#num-items");

    itemNumElement.innerText = this.list.length;

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );

    summaryElement.querySelector("#cartTotal").innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping =
      this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const summaryElement = document.querySelector(this.outputSelector);

    summaryElement.querySelector("#shipping").innerText =
      `$${this.shipping.toFixed(2)}`;
    summaryElement.querySelector("#tax").innerText =
      `$${this.tax.toFixed(2)}`;
    summaryElement.querySelector("#orderTotal").innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const order = formDataToJSON(form);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage("so-cart", []);
      updateCartCount();
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
