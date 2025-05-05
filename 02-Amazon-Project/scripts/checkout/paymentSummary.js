import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let numberOfItems = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    numberOfItems += cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
        <div>Items (${numberOfItems}):</div>
        <div class="payment-summary-money">$${formatCurrency(
          productPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(
          shippingPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalBeforeTaxCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // use async/await to wait for the fetch to finish before going to the next step
  // because await is only allowed to be used inside an async function, we need to wrap the whole fetch() in an async function, then use await inside it/to fetch()
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        // save the response in a variable because of `await`
        // use second parameter - an object
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          // what type of data we're sending to the server
          headers: {
            "Content-Type": "application/json",
          },
          // actual data we're sending to the server
          body: JSON.stringify({
            cart: cart,
          }),
        });

        // this is also a promise. it gives us the data that's attached to the response
        // in this case, it should be the order that we created
        const order = await response.json();

        addOrder(order);
      } catch (error) {
        console.log("Unexpected error. Please try again later.");
      }

      // redirect to the orders page
      window.location.href = "orders.html";
    });
}
