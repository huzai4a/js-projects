import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  // calls when page loaded
//   updateQuantityHTML();
//   calculateItemsCost();

  let allItemsHtml = '';

  // get info for generated html
  cart.forEach((cartItem)=> {
      const { productId } = cartItem;

      const matchingProduct = getProduct(productId);

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      

      // save generated html in a string for a cart item (loops for each)
      const html = 
        `<div class="cart-item-container js-testing-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                  <div class="product-quantity js-quantity-test-${matchingProduct.id}">
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
                    <span class="delete-quantity-link link-primary js-delete-link js-testing-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
          </div>`;

      allItemsHtml += html;
  });


  // generate all product general HTML
  document.querySelector('.js-order-summary').innerHTML = allItemsHtml;


  // generates delivery date and price html
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
      // use dayjs for the delivery dates
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      // good use of ternary operator 
      const deliveryPriceCents = 
        (deliveryOption.priceCents === 0) ? 'FREE' 
        : `${formatCurrency(deliveryOption.priceCents)} -`;

      // another ternary use
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=
      `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${(isChecked) ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${deliveryPriceCents} Shipping
          </div>
        </div>
      </div>
      `;
    });

    // returns fully generated html for each item
    return html;
  }

  // delivery option changes
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderPaymentSummary();
      renderOrderSummary();
    });
  });

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

        if (newQuantity < 1 || newQuantity >= 500) {
          alert('Quantity must be at least 1 and less than 500');
          return;
        }

        updateQuantity(productId, newQuantity);

        // show the save and input
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

        // self-note: it wasn't worth putting the second queryselector in any fn since only here will it be changed
        // updateQuantityHTML();
        renderPaymentSummary();
        renderOrderSummary();
        // calculateItemsCost ();
      }
    });
  });


  // save button clicks
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value);

      if (newQuantity < 1 || newQuantity >= 500) {
        alert('Quantity must be at least 1 and less than 500');
        return;
      }

      updateQuantity(productId, newQuantity);

      // show the save and input
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

      // self-note: it wasn't worth putting the second queryselector in any fn since only here will it be changed
    //   updateQuantityHTML();
      renderPaymentSummary();
      renderOrderSummary();
    //   calculateItemsCost ();
      
    });
  });


  // delete items from cart
  document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
          link.addEventListener('click', () => {
            // reminder that going from kebab case to camel case when going from html dataset to js const
            const {productId} = link.dataset;
            removeFromCart(productId);
            
            renderOrderSummary();
            renderPaymentSummary();
            // calculateItemsCost();
          });
      });
}

