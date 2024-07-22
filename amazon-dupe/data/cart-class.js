class Cart{
    #localStorageKey;
    cartItems;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    // shortcut for loadfromStorage: function (){
    #loadFromStorage (){ 
        // 'this' is the same as saying 'cart', ref to obj name
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||  
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
    };

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    };

    addToCart(productId) {
        // stores object if its been added to cart already
        let dupeItem;
    
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId === productId){
                dupeItem = cartItem;
            }
        });
    
        // const quantity = Number(document.querySelector(`.js-select-${productId}`).value);
        const quantity = 1; // use for add to cart testing
    
        if (dupeItem){
            dupeItem.quantity+= quantity;
        } else{
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
    
        this.saveToStorage();
    };

    removeFromCart (productId){
        this.cartItems.forEach((cartItem, index)=> {
            if (productId === cartItem.productId){
                this.cartItems.splice(index, 1)
            }
        });
    
        this.saveToStorage();
    };

    calculateCartQuantity () {
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            totalQuantity += cartItem.quantity
        });
        return totalQuantity;
    };

    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId){
                cartItem.quantity = newQuantity;
            }
        });
    
        this.saveToStorage();
    };

    updateDeliveryOption (productId, deliveryOptionId){
        let matchingProduct;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId){
                matchingProduct = cartItem;
            }
        });
        
        matchingProduct.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    };
};

const cart = new Cart('cartItems-oop');
const businessCart = new Cart('businessCart');

cart.loadFromStorage(); 