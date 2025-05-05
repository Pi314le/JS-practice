import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

async function loadPage() {
  // console.log("load page");

  // put the code that could cause an error in try/catch block
  try {
    // throw "error1";

    // load products
    // loadProductsFetch().then(() => {}); // use .then() to wait for the promise to finish
    await loadProductsFetch(); // use await to wait for the promise to finish

    // load cart
    const value = await new Promise((resolve, reject) => {
      // throw "error2";  // way 1 of creating an error in a promise

      // this inner function will run in the future
      // when loadCart() finished loading, we're going to run the callback function
      loadCart(() => {
        // reject("error3"); // way 2 of creating an error in the future in a promise
        resolve("value3");
      });
    });
  } catch (error) {
    // catch is going to get one parameter, the error that was thrown in the try block
    console.log("Unexpected error. Please try again later.");
    console.log(error);
  }

  // render the page - the rest of the code that not asynchronous code. it's a next step
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();

  // return "value2"; // return a value to the next step
}
loadPage();
// loadPage().then((value) => {
//   console.log("next step");
//   console.log(value); // "value2"
// });

/*
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
*/

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
