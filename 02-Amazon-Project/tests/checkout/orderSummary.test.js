import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  // hooks
  // because the scope of beforeEach() hook. the variables inside the beforeEach() are not available in the test cases. So we need to declare the variables outside of the beforeEach() hook.
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productId3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

  // load the products before all tests
  // 1. load the products first
  // 2. then call done()
  // 3. then go to the next step - run the tests
  beforeAll((done) => {
    // this send request function is async, but we don’t use callback in test.We use `done()` function provided by jasmine to wait for the async function to finish before running the test.
    loadProducts(() => {
      done();
    });
    // done() lets us control when to go to the next step.
    // if we don't call done() here, we will keep waiting forever, don't go to next step.
  });

  beforeEach(() => {
    // when we click delete button, removeFromCart() will be run and saveToStorage() is inside the function. BUT we don’t want to modify localStorage in test. So mock `localStorage.setItem()` in test
    spyOn(localStorage, "setItem");

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div> <div class="js-payment-summary"></div> <div class="js-checkout-header"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
        {
          productId: productId3,
          quantity: 1,
          deliveryOptionId: "3",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });
  afterEach(() => {
    // remove the HTML after the test is done
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    // // To test how the page looks, create the mock element that be put orderSummary HTML inside
    // document.querySelector(
    //   ".js-test-container"
    // ).innerHTML = `<div class="js-order-summary"></div>`;

    // // because cart object uses localStorage, to control exactly what’s inside this cart object we need to mock localStorage
    // // and load the cart object from localStorage

    // const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    // const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    // const productId3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: "2",
    //     },
    //     {
    //       productId: productId3,
    //       quantity: 1,
    //       deliveryOptionId: "3",
    //     },
    //   ]);
    // });
    // loadFromStorage();

    // // run the function to generate the HTML for the order summary
    // renderOrderSummary();

    // querySelectorAll returns a list, so use .length to check the number of elements
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      3
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-quantity-${productId3}`).innerText
    ).toContain("Quantity: 1");

    // // remove the HTML after the test is done
    // document.querySelector(".js-test-container").innerHTML = "";
  });

  it("removes a product from the cart", () => {
    // test the delete link for the first product in the cart and make a delete event click (the product quantity is 1)
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // 1. check what the page looks like after the delete link is clicked
    // cart length should be minus 1
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    // the first product should be removed from the cart
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`)
    ).toEqual(null);
    // the second and third product should still be in the cart
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`)
    ).not.toEqual(null);
    expect(
      document.querySelector(`.js-product-quantity-${productId3}`)
    ).not.toEqual(null);

    // 2. check that the cart object has been updated in localStorage
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[1].productId).toEqual(productId3);

    // // remove the HTML after the test is done
    // document.querySelector(".js-test-container").innerHTML = "";
  });
});
