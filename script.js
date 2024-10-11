// script.js

let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Load existing expenses from localStorage

// When the page loads, populate the UI with the stored expenses
document.addEventListener('DOMContentLoaded', function () {
    updateExpenseList();
    updateTotalAmount();
});

document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get the input values
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;

    // Create an expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: date
    };

    // Add to the expense array
    expenses.push(expense);

    // Save expenses to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Reset the form
    document.getElementById('expense-form').reset();

    // Update the UI
    updateExpenseList();
    updateTotalAmount();
});

function updateExpenseList() {
    const expenseList = document.getElementById('expense-items');
    expenseList.innerHTML = ''; // Clear current list

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name} - ₹${expense.amount.toFixed(2)} (Date: ${expense.date})</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
        `;
        expenseList.appendChild(li);
    });
}

function updateTotalAmount() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = `₹${totalAmount.toFixed(2)}`;
}

function deleteExpense(id) {
    // Filter out the expense with the specified ID
    expenses = expenses.filter(expense => expense.id !== id);

    // Save the updated expenses to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update the UI
    updateExpenseList();
    updateTotalAmount();
}
