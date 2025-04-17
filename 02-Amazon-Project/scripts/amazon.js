import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

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
            src="images/ratings/rating-${product.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${
          product.rating.count
        }</div>
        </div>

        <div class="product-price">$${formatCurrency(product.priceCents)}</div>

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
    const productId = addToCartButton.dataset.productId;

    addToCart(productId);

    updateCartQuantity();
  });
});

// initialize cart quantity
updateCartQuantity();
