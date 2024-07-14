export const cart = JSON.parse(localStorage.getItem('cartItems')) ||  
[
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '3'
    }
];


function saveToStorage(){
    localStorage.setItem('cartItems', JSON.stringify(cart))
}

export function addToCart(productId) {
    // stores object if its been added to cart already
    let dupeItem;

    cart.forEach((cartItem)=>{
        if (cartItem.productId === productId){
            dupeItem = cartItem;
        }
    });

    const quantity = Number(document.querySelector(`.js-select-${productId}`).value);

    if (dupeItem){
        dupeItem.quantity+= quantity;
    } else{
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart (productId){
    cart.forEach((cartItem, index)=> {
        if (productId === cartItem.productId){
            cart.splice(index, 1)
        }
    });

    saveToStorage();
}

export function calculateCartQuantity () {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    });
    return totalQuantity;
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId){
            cartItem.quantity = newQuantity;
        }
    });

    saveToStorage();
}