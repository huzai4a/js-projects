// import { cart, calculateCartQuantity } from "../../data/cart.js";
import { Cart } from "../../data/cart-class.js";
import { formatCurrency } from '../utils/money.js';
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    const cart = new Cart('cartItems');
    // calls when page is loaded
    calculateItemsCost();
    updateQuantityHTML();



    // calculates cost for the order summary items section
    function calculateItemsCost () {
        let centsTotal = 0;
        let shippingTotal = 0;

        cart.cartItems.forEach((itemsChosen) => {
            const { productId } = itemsChosen;
            const product = getProduct(productId);
            
            centsTotal += 
            (product.priceCents * itemsChosen.quantity);
            
            const deliveryOption = getDeliveryOption(itemsChosen.deliveryOptionId);
            shippingTotal += deliveryOption.priceCents;
        });

        const totalBeforeTax = centsTotal+shippingTotal;
        const tax = 0.1*totalBeforeTax;
        const orderTotal = totalBeforeTax+tax;

        const paymentSummaryHTML = 
          `
          <div class="payment-summary-title">
              Order Summary
          </div>

          <div class="payment-summary-row">
              <div>
                Items (${cart.calculateCartQuantity()})
              </div>
              <div class="payment-summary-money">
              ${formatCurrency(centsTotal)}
              </div>
          </div>

          <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">
              ${formatCurrency(shippingTotal)}
              </div>
          </div>

          <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">
              ${formatCurrency(totalBeforeTax)}
              </div>
          </div>

          <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">
              ${formatCurrency(tax)}
              </div>
          </div>

          <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">
              ${formatCurrency(orderTotal)}
              </div>
          </div>

          <button class="place-order-button button-primary js-place-order">
              Place your order
          </button>
          `;

        // shows values on screen
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    }

    document.querySelector('.js-place-order').addEventListener('click', async ()=>{
        try{
            const response = await 
        fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                cart: cart.cartItems
            })
        });
        const order = await response.json();
        addOrder(order);

        window.location.href = 'orders.html';
        localStorage.setItem('cartItems', JSON.stringify([]));
        } catch (error) {
            console.log('an error occured, try again later\n' + error);
        }
        
        
    });

    // updates header item count
    function updateQuantityHTML(){
        document.querySelector('.js-header-quantity').innerHTML = `${cart.calculateCartQuantity()} Items`;
    } 
}