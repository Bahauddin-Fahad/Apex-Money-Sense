// Getting Input Values
function getInputValue(inputId) {
  const inputTypeField = document.getElementById(inputId);
  const inputTypeText = inputTypeField.value;
  const inputTypeValue = parseFloat(inputTypeText);
  const negativeErrorMessage = document.getElementById(
    "negative-error-message"
  );
  const expenseTexts = document.getElementsByClassName("expense-texts");
  for (const expenseText of expenseTexts) {
    if (inputTypeValue < 0) {
      expenseText.style.display = "none";
      negativeErrorMessage.style.display = "block";
    } else {
      expenseText.style.display = "block";
      negativeErrorMessage.style.display = "none";
    }
  }
  return inputTypeValue;
}
//   Expense Section //
function getSumOfExpenses() {
  const foodExpenseValue = getInputValue("food-expense");
  const rentExpenseValue = getInputValue("rent-expense");
  const clothesExpenseValue = getInputValue("clothes-expense");
  // Sum Of Expense //
  const sumOfExpenses =
    foodExpenseValue + rentExpenseValue + clothesExpenseValue;
  const totalExpensesField = document.getElementById("total-expense");
  totalExpensesField.innerText = sumOfExpenses;
  return sumOfExpenses;
}
// Calculating Balance
function calculatingBalance() {
  const incomeInputValue = getInputValue("income-id");
  const sumOfExpenses = getSumOfExpenses();
  const balanceField = document.getElementById("balance");
  //   const balance = balanceField.innerText;
  const balance = incomeInputValue - sumOfExpenses;
  balanceField.innerText = balance;
  const expenseLimitMessage = document.getElementById(
    "expense-limit-error-message"
  );
  const expenseTexts = document.getElementsByClassName("expense-texts");
  for (const expenseText of expenseTexts) {
    if (balance < 0) {
      expenseText.style.display = "none";
      expenseLimitMessage.style.display = "block";
    } else {
      expenseText.style.display = "block";
      expenseLimitMessage.style.display = "none";
    }
  }
  return balance;
}

document.getElementById("calc-button").addEventListener("click", function () {
  calculatingBalance();
});

// Savings section //
document.getElementById("save-button").addEventListener("click", function () {
  const incomeInput = getInputValue("income-id");
  const saveInputValue = getInputValue("save-percent-amount");
  if (saveInputValue < 0) {
    const negativeErrorMessage = document.getElementById(
      "saving-negative-error-message"
    );
    negativeErrorMessage.style.display = "block";
    for (const savingText of savingTexts) {
      savingText.style.display = "none";
    }
  } else {
    const savingAmountField = document.getElementById("saving-amount");
    const savingAmount = incomeInput * (saveInputValue / 100);
    savingAmountField.innerText = savingAmount;
    const balance = calculatingBalance();
    const remainingBalanceField = document.getElementById("remaining-balance");
    const remainingBalance = balance - savingAmount;

    //   error check
    const balanceLimitMessage = document.getElementById(
      "balance-limit-error-message"
    );
    const savingTexts = document.getElementsByClassName("saving-texts");
    for (const savingText of savingTexts) {
      if (remainingBalance >= 0) {
        savingText.style.display = "block";
        balanceLimitMessage.style.display = "none";
        remainingBalanceField.innerText = remainingBalance;
      } else {
        savingText.style.display = "none";
        balanceLimitMessage.style.display = "block";
      }
    }
  }
});
