/*
setTimeout(function(){
    console.log('timeout')
},  3000); 
// delay is in ms, 3k ms = 3s
setInterval(function(){
    console.log('interval')
}, 3000);
clearInterval(); // can be used by inputting interval ID (can be received by setting var equal to setInterval())

// async code doesn't wait for line to finish before going to next line/sync code will wait for a line to finish before going to the next line
//all code so far is sync

[
    'make dinner',
    'wash dishes', 
    'watch yt'
].forEach((value, index) => {
    if (value === 'wash dishes'){
        return;
    }
    console.log(value);
    console.log(index);
});
// if we need to break out of a loop, use for loop instea dof for each


const arrowFN = (param) => {
    console.log(param);
}
arrowFN('hello');


const oneParam = param => {
    console.log(param + 1)
}
oneParam(2);

const oneLine = () => {
    return 2+3;
}

const oneLineShort = () => 2+3;
console.log(oneLineShort());


const object2 = {
    method: () => {
        console.log
},
method() {

}


const btnElement = document.querySelector('.js-clicker');

const eventListener = () => {
    console.log ('click');
}
btnElement.addEventListener('click', eventListener);

btnElement.removeEventListener('click', eventListener);

btnElement.addEventListener('click', () => {
    console.log ('click2');
});
*/
// if the inner fn returns true, that val goes in the new array, false and it doesn't
const newList = [1,-2,3].filter((val, index) => {
    // if (value > 0){
    //     return true;
    // } else {
    //     return false;
    // }
    return val >= 0;
});
console.log(newList);

// transforms an array into another array based on the return value
const mapArray = [1,1,3]
    .map(val =>val * 2);
console.log(mapArray);