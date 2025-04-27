function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    // it's a regular function not arrow function because we need to use 'this' keyword
    loadFromStorage() {
      // change localStorage key from "cart" to "cart-oop", so that we don't affect original cart
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
          {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 1,
            deliveryOptionId: "3",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    // don't forget change cart type from const to let
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        } else if (cartItem.quantity > 1) {
          cartItem.quantity--;
          newCart.push(cartItem);
        } else {
          // remove cart item from cart summary HTML
          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.remove();
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      // console.log(productId);

      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business-oop");

cart.loadFromStorage();
// cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
// console.log(cart);

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
