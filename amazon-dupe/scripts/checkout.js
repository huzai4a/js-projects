import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';

// async basically wraps a function in promise
async function loadPage(){
  try{
    // throw 'error1';
    // await allows async code to be written like normal code
    // NOTE: await is only used in an async fn
    await loadProductsFetch(); //replaces .then

    // await loadCartFetch();


    // await new Promise((resolve)=>{
    //   // throw 'error2';
    //   loadCart(()=>{
    //     // reject('error in the future');
    //     resolve();
    //   });
    // });

  } catch(error){
    console.log('error. try again later');
    console.log(error);
  }

  // done after both awaits
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })  

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('val1');
  });

}).then((val)=>{
  console.log(val);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(()=>{
    loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    });
});
*/