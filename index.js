
let transactions = []
const formElm = document.getElementById('form-el')
const transactionList =  document.getElementById('transaction-list')
let showBalance = document.getElementById('show-balance')
let showIncome = document.getElementById('show-income')
let showExpense = document.getElementById('show-expense')

showBalance.innerHTML = "$0"
showIncome.innerHTML = "$0"
showExpense.innerHTML = "$0"

// eventlisteners
document.addEventListener('click', function(e){
    if(e.target.classList.contains('fa-solid')){
        deleteTransaction(e.target.id)
    }
   else if(e.target.id === 'submit-btn'){
        updateTransactionsArray()
    }
})

formElm.addEventListener('submit', function(e){
    e.preventDefault()
})

function getTypeOfExpense(){
        const typeInput = document.querySelector('input[name ="choice"]:checked')
        if(typeInput){
            return typeInput.id
        }
}


function updateTransactionsArray(){
    const descriptionInput = document.getElementById('description')
    const amountInput = document.getElementById('amount')
if(descriptionInput.value && amountInput.value){
    const transaction = {
        description: descriptionInput.value,
        amount: amountInput.value,
        type: getTypeOfExpense(),
        id: crypto.randomUUID()
   }
       transactions.push(transaction)
}
    formElm.reset()
    displayTransactionList()
    updateBalance()
    showIncomeOrExpense()
}


function displayTransactionList(){
    transactionList.innerHTML = ''
       
    transactions.forEach(function(transaction){
         const listItem = document.createElement('li')
        const deleteBtn = document.createElement('button')
        const listDiv = document.createElement('div')
        listDiv.classList.add('list-item-div')
        if(transaction.type === 'income'){
            listItem.textContent = `${transaction.description} (+$${transaction.amount})`
            listDiv.classList.add('green-border')
        }else{
            listItem.textContent = `${transaction.description} (-$${transaction.amount})` 
            listDiv.classList.add('red-border')
        }
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash" id="${transaction.id}"></i>`
        listItem.appendChild(deleteBtn)
        listDiv.appendChild(listItem)
        transactionList.appendChild(listDiv)
    })
}


function updateBalance(){
    let balance = transactions.reduce(function(total, currentTransaction){
        if(currentTransaction.type === 'expense'){
          return  Number(total) -Number(currentTransaction.amount)
        }else{
          return  Number(total) + Number(currentTransaction.amount)
        }
    }, 0)
    showBalance.innerHTML =  `$${balance}`
}

function showIncomeOrExpense(){
    let addIncome = 0
    let addExpense = 0
    transactions.forEach(function (transaction){
    if(transaction.type=== 'income'){
        addIncome = addIncome + Number(transaction.amount)
    }else if(transaction.type=== 'expense'){
        addExpense = addExpense + Number(transaction.amount)
    }
})
    showIncome.innerHTML = `$${addIncome}`
    showExpense.innerHTML = `$${addExpense}`
}

function deleteTransaction(id){
 transactions = transactions.filter(function(transaction){
    return transaction.id !== id
  })
  displayTransactionList()
  updateBalance()
  showIncomeOrExpense()
}