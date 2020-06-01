const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

//add transactions to dom list 
function addTransactionsDom(transaction) {

    //get sign if positive or negative
    const sign = transaction.amount < 0 ? '-' : '+';

    const newItem = document.createElement('li');

    //add class based on value 
    newItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    //craeting the look of the new item/list item 
    newItem.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">X</button>`;

    //adding the new list item to the list 
    list.appendChild(newItem);
}
//adding transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() =='' || amount.value.trim() == ''){
        alert('please enter values');
    } else {
        const newText = text.value;
        const newAmount = +amount.value;
        const newItem = {text : newText , amount : newAmount};
        transactions.push(newItem);
    }
    Init();
    text.value='';
    amount.value='';
}
//update the balance income and expense 
function updateValues() {

    //get the amounts of each transaction using the map function
    const amounts = transactions.map(transaction => transaction.amount);

    //get the total of the amounts using teh reduce method
    const totalAmounts = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    //getting the incomes using the filter method 
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    //getting the expenses filtering and summing all of the items 
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    //inserting numbers to the dom 
    balance.innerText = `$${totalAmounts}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}
//Init app 
function Init() {
    list.innerHTML = '';
    //called here not outside because it must access each array element 
    transactions.forEach(trans => addTransactionsDom(trans));
    updateValues();
}
function deleteAction(e) {
    const deleteBtn = e.target;
    const parent = deleteBtn.parentElement;
    const index= getElementIndex(parent);
    transactions.splice(index,1);
    list.removeChild(parent);
    Init();
}
function getElementIndex(parent) {
    var index = 0;
    while ( (parent = parent.previousElementSibling) ) {
        index++;
    }
    return index;
}

Init();
form.addEventListener('submit' ,addTransaction);
list.addEventListener('click' , deleteAction);
