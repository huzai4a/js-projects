export const orders = JSON.parse(localStorage.getItem('orders')) || [];// JSON.parse('[{"id":"03e6b3b9-a77b-46ba-948e-f29a109286a5","orderTime":"2024-07-31T04:59:07.626Z","totalCostCents":12278,"products":[{"productId":"3ebe75dc-64d2-4137-8860-1f5a963e534b","quantity":4,"estimatedDeliveryTime":"2024-08-07T04:59:07.626Z","variation":null},{"productId":"83d4ca15-0f35-48f5-b7a3-1ea210004f2e","quantity":1,"estimatedDeliveryTime":"2024-08-07T04:59:07.626Z","variation":null},{"productId":"15b6fc6f-327a-4ec4-896f-486349e85a3d","quantity":1,"estimatedDeliveryTime":"2024-08-07T04:59:07.626Z","variation":null}]}]');

export function addOrder (order) {
    orders.unshift(order);
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}