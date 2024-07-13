export const cart = [];

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
            quantity
        });
    }
}