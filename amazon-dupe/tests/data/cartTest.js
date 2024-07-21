import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('addToCart test suite', () => {
    it('adds an existing product to cart', () => {
        // to prevent effects on real code
        spyOn(localStorage, 'setItem');

        // gets empty string preventing real code effects
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        // check if set item was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        (expect(cart[0].productId)).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
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

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        // check if set item was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        (expect(cart[0].productId)).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        (expect(cart[0].quantity)).toEqual(1);
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