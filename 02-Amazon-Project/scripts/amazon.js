import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// HTTP requests are asynchronous.
// when this call is executed, next line is using the data immediately. But the response has not loaded yet. So the products array is still empty.
// Solution: we need to wait for the data to be loaded/ the request to finish first and for response to come back before we can use it
loadProducts(renderProductsGrid);

// How to wait for the data to be loaded?
// 1. Put the rest of the code in a function `renderProductsGrid()`
// 2. call it when the data is loaded - give this function to loadProducts() function -> to be a parameter of loadProducts()  [functions are values in JS, so we can use a function as a parameter of another function]

function renderProductsGrid() {
  // step 2
  // 1. generate HTML with data
  // 2. combine the HTML together
  // 3. put it on the web page (using the DOM)
  let productsHTML = "";

  products.forEach((product) => {
    // don't forget data processing
    // 4.5 stars, but image file name is 45
    // price should be shown in dollars on the webpage. and use .toFixed(2) to convert a number into a string with two decimals
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img
            class="product-image"
            src="${product.image}"
        />
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img
            class="product-rating-stars"
            src="${product.getStarsUrl()}"
        />
        <div class="product-rating-count link-primary">${
          product.rating.count
        }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
        <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">Add to Cart</button>
    </div>
  `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  // step 3
  // and separate the cart data into other file - Module
  // and step Ⅱ: Encapsulation

  // updateCartQuantity() handles updating the webpage rather than managing the cart data. So it doesn't need to be moved to cart.js
  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", () => {
      // get which product to add
      const productId = addToCartButton.dataset.productId;

      addToCart(productId);

      updateCartQuantity();
    });
  });

  // initialize cart quantity
  updateCartQuantity();
}
