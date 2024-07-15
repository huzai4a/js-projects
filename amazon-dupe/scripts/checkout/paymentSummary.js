import { cart, calculateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from '../utils/money.js';
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary(){
    // calls when page is loaded
    calculateItemsCost();



    // calculates cost for the order summary items section
    function calculateItemsCost () {
        let centsTotal = 0;
        let shippingTotal = 0;

        cart.forEach((itemsChosen) => {
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
                Items (${calculateCartQuantity()})
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

          <button class="place-order-button button-primary">
              Place your order
          </button>
          `;
          
        // shows values on screen
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    }
}