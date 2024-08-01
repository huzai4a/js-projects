// import { cart as myCart } from '../data/cart.js';
// import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { Cart } from '../data/cart-class.js';
import { products, loadProductsFetch } from '../data/products.js';
import { renderNavbar } from './navbar.js';

// since this is necessary to display products
await loadProductsFetch();

// will be used to generate html for products in both renderProductsGrid and checkForSearch
let productsHTML = '';

// checks for search use on window load
// note: window.onload wasn't working 100% of the time
window.addEventListener ? 
window.addEventListener("load",checkForSearch(),false) : 
window.attachEvent && window.attachEvent("onload",checkForSearch());


function renderAllProducts (){
    products.forEach((product)=>{
        productsHTML += loadProductHTML(product);    
    });
}

function checkForSearch(){
    const url = new URL (window.location.href);
    
    if (url.searchParams.get('search')){
        document.querySelector('.page-title').innerHTML = 'Results';
        
        const userSearch = url.searchParams.get('search').toLowerCase();
        let count = 0;
        products.forEach((product)=>{
            // splits product name into array to use includes
            if (product.name.toLowerCase().split(' ').includes(userSearch)){
                productsHTML += loadProductHTML(product);
                count++;
            }
        });

        document.querySelector('.result-amount').innerHTML = count < 1 ? 
        `There are no matching results for '${userSearch}'` :
        `Showing ${count} result${count > 1 ? 's' : ''} for '${userSearch}'`;

    } else{
        renderAllProducts();
    }
}

// needs to be used in renderProductsGrid and checkforSearch
const cart = new Cart('cartItems');
// loads navbar html
renderNavbar(cart);

// loads products html
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// deals with timeout timing when showing 'added' text
const addedTimeouts = [];

document.querySelectorAll('.js-add-to-cart').forEach((btn)=>{
    btn.addEventListener('click', () => {
        const { productId } = btn.dataset;
        
        cart.addToCart(productId);

        renderNavbar(cart);
        
        toggleAddedText(productId);
        
    });
});

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

function loadProductHTML(product){
    return `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            ${product.getPrice()}
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

        
        ${product.extraInfoHTML()}
        

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
    `;
}