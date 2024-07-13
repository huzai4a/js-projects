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
                $${(product.priceCents/100).toFixed(2)}
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
document.querySelectorAll('.js-add-to-cart').forEach((btn)=>{
    btn.addEventListener('click', () => {
        const { productId } = btn.dataset;
        // stores object if its been added to cart already
        let dupeItem;

        cart.forEach((product)=>{
            if (product.productId === productId){
                dupeItem = product;
            }
        });

        const quantity = Number(document.querySelector(`.js-select-${productId}`).value);

        if (dupeItem){
            dupeItem.quantity+= quantity;
        } else{
            cart.push({
                productId,
                quantity
            });
            console.log(cart)
        }

        let totalQuantity = 0;

        cart.forEach((product) => {
            totalQuantity += product.quantity
        });
        document.querySelector('.js-total-quantity').innerHTML = `${totalQuantity}`;

        document.querySelector(`.js-added-${productId}`).classList.add('visible');
        // hides added text after 3s
        setTimeout(()=>{
            document.querySelector(`.js-added-${productId}`).classList.remove('visible');
        }, 2000);
    })
});