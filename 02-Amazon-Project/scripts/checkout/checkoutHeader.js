import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let numberOfItems = 0;

  cart.forEach((cartItem) => {
    numberOfItems += cartItem.quantity;
  });

  const checkoutHeaderHTML = `
    Checkout (<a class="return-to-home-link" href="amazon.html">${numberOfItems} items</a
          >)
  `;

  document.querySelector(".js-checkout-header").innerHTML = checkoutHeaderHTML;
}
