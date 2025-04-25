import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  it("add an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    // cart.length will still be 1 because the product is already in the cart and just increase the quantity
    expect(cart.length).toBe(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toBe("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toBe(2);
  });

  it("add a new product to the cart", () => {
    // Order matter, mocking localStorage.setItem() first then call addToCart(),
    // so setItem() will be replaced with a fake version and this will no longer to store data in the local storage.
    // and to test if the method was called (should be mocked for toHaveBeenCalledTimes() method).
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    // reload cart from storage
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toBe(1);

    // How many times localStorage.setItem() wa called in the code above
    // param (localStorage.setItem) must have been mocked when it's used with toHaveBeenCalledTimes()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toBe("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toBe(1);
  });
});
