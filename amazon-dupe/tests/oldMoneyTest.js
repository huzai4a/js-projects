import { formatCurrency } from '../scripts/utils/money.js';

console.log('Test suite: formatCurrency');

console.log('works with 20.95:');

if (formatCurrency(2095) === '$20.95'){
    console.log('passed');
} else {
    console.log('fail');
    console.log(formatCurrency(2095));
}

console.log('works with 0:');

if (formatCurrency(0) === '$0.00'){
    console.log('passed');
} else {
    console.log('fail');
    console.log(formatCurrency(0));
}

console.log('works with decimal round up:');

if (formatCurrency(2000.5) === '$20.01'){
    console.log('passed');
} else {
    console.log('fail');
    console.log(formatCurrency(2000.5));
}

console.log('works with decimal round down:');

if (formatCurrency(2000.4) === '$20.00'){
    console.log('passed');
} else {
    console.log('fail');
    console.log(formatCurrency(2000.4));
}