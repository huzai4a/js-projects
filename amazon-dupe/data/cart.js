export let cart;

loadFromStorage();

export function loadFromStorage(){
     cart = JSON.parse(localStorage.getItem('cartItems')) ||  
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
}

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
    // const quantity = 1; // use for add to cart testing

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

export function updateDeliveryOption (productId, deliveryOptionId){
    let matchingProduct;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId){
            matchingProduct = cartItem;
        }
    });
    
    matchingProduct.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export async function loadCartFetch (){
    const response = await fetch('https://supersimplebackend.dev/cart');
    const msg = await response.text();
    console.log(msg);
    return msg;
}

export function loadCart(func){
    const xhr = new XMLHttpRequest;
    
    xhr.addEventListener('load', ()=>{
      console.log(xhr.response);
      func();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send();
  }