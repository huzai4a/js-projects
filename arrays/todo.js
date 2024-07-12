/*
const newArray = [10,20,30];
console.log(newArray[2]);
// same as append
newArray.push(33);
console.log(newArray)
// remove 2 nums starting at 0
newArray.splice(0,2)
console.log(newArray)

let i = 0
while (i <=5){
    i++;
    console.log(i);
}

for(let i =1; i<=5; i++){
    console.log(i);
}

const newList = [
    'hello',
    'no',
    'ojoqdwj'
]
const nums = [1,2,3];
const doubled = []
let total = 0;
for (let i = 0; i<=newList.length-1; i++){
    console.log(newList[i]);
    total += nums[i];
    doubled.push(nums[i]*2);
}
console.log(doubled);
console.log(total);

const [val1, val2] = [1, 2];

*/






// works right before the page is reloaded to send the list items to local storage
window.onbeforeunload = function(){
    JSONItems = JSON.stringify(toDoList);
    localStorage.setItem('listItems', JSONItems);
}

const toDoList = JSON.parse(localStorage.getItem('listItems'));
// doesnt render on reload if there are no list items
if (toDoList != null){
    renderList();
}


function renderList(){
    let allHTML = '';
    
    /*
    for (let i = 0; i< toDoList.length; i++){
        const toDoObject = toDoList[i];
        const html = `<div class="listItem">
        <h4>${toDoObject.name}</h4>
        <h4>${toDoObject.dueDate}</h4>
        <button class="delete-btn box-btn" onclick="removeItem(${i})">Delete</button>
        </div>`;
        allHTML += html;
    }*/
    
    toDoList.forEach((toDoObject, index) => {
        const html = `<div class="listItem">
        <h4>${toDoObject.name}</h4>
        <h4>${toDoObject.dueDate}</h4>
        <button class="delete-btn box-btn js-delete">Delete</button>
        </div>`;
        allHTML += html;
    });

    document.querySelector('.js-outputs')
        .innerHTML = allHTML;
    
    document.querySelectorAll('.js-delete')
        .forEach((deleteButton, index)=>{
            deleteButton.addEventListener('click', () => {
                removeItem(index);
            });
        });
}



function addToList(){
    const inputElement = document.querySelector('.js-todo-in'); 
    const dateElement = document.querySelector('.js-date-in');
    
    if (inputElement.value != ''){
        toDoList.push({
            name: inputElement.value,
            dueDate: dateElement.value
        });
    }

    inputElement.value = '';
    dateElement.value = '';
    renderList();
}

function removeItem(index){
    toDoList.splice(index, 1);
    renderList();
}
function clearList(){
    toDoList.splice(0, toDoList.length)
    renderList();
}

function checkEnter(pressed){
    if(pressed === 'Enter'){
        addToList();
    }
}

document.querySelector('.js-clear')
    .addEventListener('click', ()=>{
        clearList();
    });
document.querySelector('.js-todo-in')
    .addEventListener('keydown', (event)=>{
        checkEnter(event.key);
    });
document.querySelector('.js-add')
    .addEventListener('click', ()=>{
        addToList();
    });