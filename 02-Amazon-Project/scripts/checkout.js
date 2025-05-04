import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

// wait for all promises to finish before going to the next step, instead of waiting for each promise to finish one by one
// loadProductsFetch(): fetch + promises and will return a promise
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values); // ["value1", undefined]

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

/* loadProducts(): XML + callbacks
Promise.all([
  // give an array to add multiple promises to run/wait for in parallel
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1");
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values); // ["value1", undefined]

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
// add some asynchronous code inner function of Promise function
// when run some asynchronous code and then wait for it finish, and then call resolve() to go to the next step
new Promise((resolve) => {
  // console.log("start promise");

  // some asynchronous code
  loadProducts(() => {
    // console.log("finished loading");

    resolve("value1"); // call resolve() to go to the next step when loadProducts() is finished
  });
})
  .then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve(); // give/call a function resolve() to go to the next step when loadCart() is finished
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
*/

/*
// send a request to the server to get the products data
// and then ues a callback to wait for the response/ the data to be loaded
// after the data is loaded,run the callback function = run the rest of the code
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/
