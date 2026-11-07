

const addFriend = ()=> {

let friendDiv = document.getElementById("friends")

let personDiv = document.createElement("div")
 personDiv.className = "person"

 let nameInput = document.createElement("input")
 
 nameInput.className = "personName"
 nameInput.type = "text"
 nameInput.placeholder = "Enter your name"

let expenseInput = document.createElement("input")

expenseInput.className = "expense"
expenseInput.type = "number"
expenseInput.placeholder = "Enter personal expense"
expenseInput.min = "0"
expenseInput.step = "0.01"

let amountInput = document.createElement("input")

amountInput.className = "amount"
amountInput.type = "number"
amountInput.placeholder = "Enter amount paid"
amountInput.min = "0"
amountInput.step = "0.01"

let removeBtn = document.createElement("button")

removeBtn.className = "removeBtn"
removeBtn.type = "button"
removeBtn.textContent = "Remove"
removeBtn.onclick = function(){
 removeFriend(this)
}

personDiv.appendChild(nameInput)
personDiv.appendChild(expenseInput)
personDiv.appendChild(amountInput)
personDiv.appendChild(removeBtn)

friendDiv.appendChild(personDiv)
}

function removeFriend(button){

let personDiv = button.parentElement

let friendDiv = document.getElementById("friends")

if(friendDiv.children.length > 2){
    friendDiv.removeChild(personDiv)

}
}

const calculateBill = ()=> {

let personDivs = document.querySelectorAll(".person")

if (personDivs.length < 2) {
        alert("You need at least 2 people to split a bill.")
        return
    }
let currency = document.getElementById("currency").value
let splitMethod = document.getElementById("splitMethod").value

let friends = []

let totalExpenses = 0
let totalPaid = 0

for( let i = 0 ; i < personDivs.length; i++){

 let name = personDivs[i].querySelector(".personName").value.trim()
 let expense = Number(personDivs[i].querySelector(".expense").value)
 let paid = Number(personDivs[i].querySelector(".amount").value)

 if(name === ""){
    alert("Please enter a name")
    return
 }
 if(expense < 0 || paid < 0){
    alert("Expsenses and payments cannot be negative")
    return
 }
 friends.push({
    name:name,
    expense: expense,
    paid: paid
 })
  totalExpenses += expense
  totalPaid += paid

}
 
  if(totalExpenses <= 0){
    alert("Enter the expenses")
    return

}

for( let i = 0; i < friends.length; i++){
    if(splitMethod === "equal"){
  friends[i].share = totalExpenses / friends.length
 }
 

 else{ 
    friends[i].share = friends[i].expense
}
friends[i].balance = friends[i].paid - friends[i].share
}
let money = new Intl.NumberFormat("en",{
    style :"currency",
    currency : currency
})
const displayResults =(friends, totalExpenses, splitMethod, money)=>{


let summary = document.getElementById("summary")

summary.innerHTML = ""

let total = document.createElement("h4")

total.textContent = "Total Bill :" + money.format(totalExpenses)

let method = document.createElement("p")
summary.appendChild(total)
 
if(splitMethod === "equal"){
    method.textContent = "Splitting Method:Split Equally"
}
else{
method.textContent = "Splitting Method:Individual Expenses "
}
summary.appendChild(method)

let cards = document.createElement("div")

cards.className = "friendCards"

for(let i = 0 ; i < friends.length ; i++){
 let card = document.createElement("div")

 card.className = "friendCard"

 let name = document.createElement("h4")

name.textContent = friends[i].name
card.appendChild(name)

let expenses = document.createElement("p")
expenses.textContent = "Personal Expenses: " + money.format(friends[i].expense)

card.appendChild(expenses)

let share = document.createElement("p")
share.textContent = "Their Share: " + money.format(friends[i].share)

card.appendChild(share)

let paid = document.createElement("p")
paid.textContent = "Amount Paid: " + money.format(friends[i].paid)

card.appendChild(paid)

let status = document.createElement("p")

if(friends[i].balance < -0.01){
 status.textContent = "Still Owes: " + money.format(-friends[i].balance)

 status.className = "owes"
}
else if(friends[i].balance > 0.01){
status.textContent = "Should Receive: " + money.format(friends[i].balance)

status.className = "receives"
}
else{
status.textContent = "Settled"
status.className = "settled"
}

card.appendChild(status)

cards.appendChild(card)
}

summary.appendChild(cards)


let heading = document.createElement("h3")

    heading.textContent = "Who Pays Whom?"

    summary.appendChild(heading)

let debtors = []
let creditors = []

for(let i = 0 ; i < friends.length; i++){
 if(friends[i].balance < -0.01){
    
  debtors.push({
    name: friends[i].name,
    amount: -friends[i].balance
  })
 }

 else if(friends[i].balance > 0.01){
    creditors.push({
    name:friends[i].name,
    amount: friends[i].balance
    })
 }
}
let i = 0
let j = 0

if(debtors.length === 0){
    let message = document.createElement("p")

   message.textContent = "Everyone is settled!"

 summary.appendChild(message)
}
 while (i < debtors.length && j < creditors.length) {

  let amount = Math.min(      
     debtors[i].amount,
     creditors[j].amount
)}

 let payment = document.createElement("div")

 payment.className = "payment"
 let paymentText = document.createElement("p")
 console.log(creditors);
console.log(j);
console.log(creditors[j]);

 paymentText.textContent = debtors[i].name + " pays " +
        creditors[j].name + " " + money.format(amount)

 payment.appendChild(paymentText)

summary.appendChild(payment)


}

displayResults(friends, totalExpenses, splitMethod, money)

}
