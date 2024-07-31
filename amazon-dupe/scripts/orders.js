import { orders } from "../data/orders.js";
import { Cart } from "../data/cart-class.js";
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export

const cart = new Cart('cartItems');
// header cart quantity
updateCartQuantity();

// no orders
if (orders.length === 0){
  document.querySelector('.js-orders').innerHTML = 'You have no orders.';

} else { //otherwise loop through the orders array and generate 
  // is used when getting info for orders
  await loadProductsFetch();
  let allOrdersHtml = '';
    orders.forEach((order)=>{
      // splits orderTime and takes the YYYY-MM-DD form for this const
      const date = order.orderTime.split('T')[0];
      const formattedOrderPlaced = dayjs(date, 'YYYY-MM-DD').format('MMMM D');

      // this html is different for each order
      let orderHtml = 
      `
      <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedOrderPlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderedItemsHTML(order)}
          </div>
        </div>
      `;
      // adds to the final html of all orders
      allOrdersHtml += orderHtml;
    });

    function orderedItemsHTML(order) {
      let html = '';

      order.products.forEach((item)=>{

        const date = item.estimatedDeliveryTime.split('T')[0];
        const formattedArrivalDate = dayjs(date, 'YYYY-MM-DD').format('MMMM D');
        const matchingProduct = getProduct(item.productId);

        html += 
        `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formattedArrivalDate}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <div class="buy-again-container">
            <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingProduct.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
            <div class="added-to-cart js-added-${matchingProduct.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
          </div>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
        `;
      });
      // includes all items in this order
      return html;
    }

    document.querySelector('.js-orders').innerHTML = allOrdersHtml;
}

function updateCartQuantity () {
  document.querySelector('.js-total-quantity').innerHTML = `${cart.calculateCartQuantity()}`;
}

document.querySelectorAll('.js-buy-again').forEach((btn)=>{
  btn.addEventListener('click', () => {
      const { productId } = btn.dataset;
      
      cart.addToCart(productId);
      updateCartQuantity();
      
      toggleAddedText(productId);
      
  });
});

// deals with timeout timing when showing 'added' text
const addedTimeouts = [];

function toggleAddedText(productId){
  document.querySelector(`.js-added-${productId}`).classList.add('visible');
      
  
      // if there was a previous timeout its id would be saved and referenced by productId as add to cart is clicked
      const previousTimeout = addedTimeouts[productId];
      // same thing as saying != null
      if (previousTimeout){
          clearTimeout(previousTimeout)
      }

      // hides added text after 2s
      const timeoutID = setTimeout(()=>{
          document.querySelector(`.js-added-${productId}`).classList.remove('visible');
      }, 2000);
      addedTimeouts[productId] = timeoutID;
}