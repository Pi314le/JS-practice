import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

// send a request to the server to get the products data
// and then ues a callback to wait for the response/ the data to be loaded
// after the data is loaded,run the callback function = run the rest of the code
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
