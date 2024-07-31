import { getProduct, loadProductsFetch } from "../data/products.js";
import { Cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export

const url = new URL (window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const cart = new Cart('cartItems');
await loadProductsFetch();
updateCartQuantity();

let matchingOrder = [];
let orderTime = {};
orders.forEach((order)=>{
    if (order.id === orderId){
        orderTime = dayjs(order.orderTime);

        order.products.forEach((product)=>{
            if (product.productId === productId){
                // matchingOrder[0] holds order info
                matchingOrder.push(product);
            }
        })
    }
});
// matchingOrder[1] holds product info
matchingOrder.push(getProduct(productId));

// deliveryTime
const deliveryTime = dayjs(matchingOrder[0].estimatedDeliveryTime);
// currentTime
const today = dayjs();

const percentProgress = ((today-orderTime)/(deliveryTime-orderTime))*200;
console.log(percentProgress);
const formattedArrivalDate = deliveryTime.format('dddd, MMMM D');

const html = 
`
<div class="delivery-date">
    Arriving on ${formattedArrivalDate}
</div>

<div class="product-info">
    ${matchingOrder[1].name}
</div>

<div class="product-info">
    Quantity: ${matchingOrder[0].quantity}
</div>

<img class="product-image" src="${matchingOrder[1].image}">

<div class="progress-labels-container">
    <div class="progress-label ${
        percentProgress <= 49 ? "current-status" : ''
      }">
    Preparing
    </div>
    <div class="progress-label ${
        percentProgress <= 99 && percentProgress>= 50 ? "current-status" : ''
      }">
    Shipped
    </div>
    <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
    Delivered
    </div>
</div>

<div class="progress-bar-container">
    <div class="progress-bar" style="width:${percentProgress}%"></div>
</div>
`;

document.querySelector('.js-item-info').innerHTML = html;


function updateCartQuantity () {
    document.querySelector('.js-total-quantity').innerHTML = `${cart.calculateCartQuantity()}`;
}