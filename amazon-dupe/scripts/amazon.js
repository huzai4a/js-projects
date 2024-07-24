// import { cart as myCart } from '../data/cart.js';
// import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { Cart } from '../data/cart-class.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const cart = new Cart('cartItems');
// does on page load up
updateCartQuantity();


let productsHTML = '';

products.forEach((product)=>{
    productsHTML += 
        `<div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10 }.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-select-${product.id}">
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

            <div class="added-to-cart js-added-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>`;    
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// deals with timeout timing when showing 'added' text
const addedTimeouts = [];

document.querySelectorAll('.js-add-to-cart').forEach((btn)=>{
    btn.addEventListener('click', () => {
        const { productId } = btn.dataset;
        
        cart.addToCart(productId);

        updateCartQuantity();
        
        toggleAddedText(productId);
        
    });
});


function updateCartQuantity () {
    document.querySelector('.js-total-quantity').innerHTML = `${cart.calculateCartQuantity()}`;
}

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