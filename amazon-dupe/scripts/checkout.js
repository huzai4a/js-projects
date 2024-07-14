import { calculateCartQuantity, cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// calls when page loaded
updateQuantityHTML();
calculateItemsCost();

let allItemsHtml = '';

// get info for generated html
cart.forEach((cartItem)=> {
    const { productId } = cartItem;

    let matchingProduct;

    products.forEach((product)=> {
        if ( productId === product.id){
            matchingProduct = product;
        }
    });

    const html = 
      `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input quantity-input-${matchingProduct.id} js-quantity-input" data-product-id="${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>`;

    allItemsHtml += html;
});

// generate all HTML
document.querySelector('.js-order-summary').innerHTML = allItemsHtml;

// update button clicks
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;

    // show the save and input
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  });
});

// input works same as save
document.querySelectorAll('.js-quantity-input').forEach((link) => {
  link.addEventListener('keydown', (event) => {
    if (event.key === "Enter"){
      const {productId} = link.dataset;

      const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value);

      if (newQuantity < 0 || newQuantity >= 500) {
        alert('Quantity must be at least 0 and less than 500');
        return;
      }

      updateQuantity(productId, newQuantity);

      // show the save and input
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

      // self-note: it wasn't worth putting the second queryselector in any fn since only here will it be changed
      updateQuantityHTML();
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      calculateItemsCost ();
    }
  });
});

// save button clicks
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;

    const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value);

    if (newQuantity < 0 || newQuantity >= 500) {
      alert('Quantity must be at least 0 and less than 500');
      return;
    }

    updateQuantity(productId, newQuantity);

    // show the save and input
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

    // self-note: it wasn't worth putting the second queryselector in any fn since only here will it be changed
    updateQuantityHTML();
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    calculateItemsCost ();
    
  });
});

// delete items from cart
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
          // reminder that going from kebab case to camel case when going from html dataset to js const
          const {productId} = link.dataset;
          removeFromCart(productId);
          
          document.querySelector(`.js-cart-item-container-${productId}`).remove();

          updateQuantityHTML();
          calculateItemsCost();
        });
    });

// updates header and order summary
function updateQuantityHTML(){
  document.querySelector('.js-header-quantity').innerHTML = `${calculateCartQuantity()} Items`;

  document.querySelector('.js-summary-row').innerText = `Items (${calculateCartQuantity()}):`;
}

// calculates cost for the order summary items section
function calculateItemsCost () {
  let centsTotal = 0;

  cart.forEach((itemsChosen) => {
    const { productId } = itemsChosen;

    products.forEach((product) => {
      //if product is found add it to total
      if (product.id === productId) {
        centsTotal += (product.priceCents*itemsChosen.quantity);
      }
    });
  });

  document.querySelector('.js-items-money').innerHTML = `$${(centsTotal/100).toFixed(2)}`;
}
