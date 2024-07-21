import { addToCart, cart, loadFromStorage, removeFromCart } from "../../data/cart.js";

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('removeFromCart test suite', ()=> {
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

        // gets empty string preventing real code effects
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1, 
                deliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

    });
    afterEach(()=>{

    });

    it('remove existing product', ()=>{
        removeFromCart(productId1);
        
        expect(cart[0].productId).toEqual(productId2);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('removes a productId that is not in the cart', ()=>{
        removeFromCart('productidthatisnotinthecart');

        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[1].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});

describe('addToCart test suite', () => {
    it('adds an existing product to cart', () => {
        // to prevent effects on real code
        spyOn(localStorage, 'setItem');

        // gets empty string preventing real code effects
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart(productId1);
        expect(cart.length).toEqual(1);
        // check if set item was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        (expect(cart[0].productId)).toEqual(productId1);
        (expect(cart[0].quantity)).toEqual(2);
    });

    it('adds new product to cart', () => {
        // to prevent effects on real code
        spyOn(localStorage, 'setItem');
        
        // gets empty string preventing real code effects
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([]);
        });
        loadFromStorage();

        // product1 is new since its an empty initial cart
        addToCart(productId1);
        expect(cart.length).toEqual(1);
        // check if set item was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
    });
});

    // it('new product added to cart', () => {
    //     expect(formatCurrency(0)).toEqual('$0.00');
    // });

    // it('works with decimal round up', () => {
    //     expect(formatCurrency(2000.5)).toEqual('$20.01');
    // });

    // it('works with decimal round down', () => {
    //     expect(formatCurrency(2000.4)).toEqual('$20.00');
    // });