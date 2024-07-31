export function renderNavbar(cart){
  const html = 
  `
      <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar js-search-enter js-value" type="text" placeholder="Search">

        <button class="search-button js-search">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity">${cart.calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
  `;


  document.querySelector('.js-navbar').innerHTML = html;

  // search bar
  document.querySelector('.js-search').addEventListener('click', ()=>{
    search();
  });
  document.querySelector('.js-search-enter').addEventListener('keydown', (event)=>{
    if (event.key === 'Enter'){
      search();
    }
  });
  // when searching
  function search(){
    const userSearch = document.querySelector('.js-value').value;

    if (userSearch.length < 1 || userSearch.length > 32) {
      alert('Query must be between 1 and 32 characters');
      return;
    }
    
    window.location.href = `amazon.html?search=${userSearch}`;
  }
}