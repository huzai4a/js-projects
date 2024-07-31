import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";
describe('render order summary test suite', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll( async ()=>{
        await loadProductsFetch();
    }); 

    beforeEach(()=> {
        // makes sure that set and get dont effect the actual local storage by mocking them
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `<div class = "js-header-quantity"> </div>
        <div class = "js-order-summary"> </div>
        <div class = "js-payment-summary"> </div>`;

        // gets empty string preventing real code effects
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '3'
            }]);
        });
        
        loadFromStorage();
        renderOrderSummary();
    });
    afterEach(()=>{
        // removes html
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays cart', () => {
        expect(
        document.querySelectorAll('.js-testing-container').length).toEqual(2);
        // null error on following code
        expect(
            document.querySelector(`.js-quantity-test-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-quantity-test-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });
    
    it('removes a product', () => {

        document.querySelector(`.js-testing-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-testing-container').length).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(
            cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});