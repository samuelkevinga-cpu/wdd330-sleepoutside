import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    calculateTotal(cartItems);
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Tu carrito está vacío.</p>";
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

function calculateTotal(items) {
  const footerElement = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!footerElement || !totalElement) return; 

  const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);

  footerElement.classList.remove("hide");
  
  
  totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
}

renderCartContents();