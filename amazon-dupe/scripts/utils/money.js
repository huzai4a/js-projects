export function formatCurrency (priceCents){
    // math.round is necessary since toFixed rounds wrong for 3 decimals i.e. 6.005
    return `$${(Math.round(priceCents)/100).toFixed(2)}`;
}

export default formatCurrency;