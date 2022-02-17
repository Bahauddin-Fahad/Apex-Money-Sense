function emptyErrorHandler(isEmpty) {
  const emptyErrorMessage = document.getElementById("empty-error-message");
  const expenseTexts = document.getElementsByClassName("expense-texts");
  for (const expenseText of expenseTexts) {
    if (isEmpty === true) {
      expenseText.style.display = "none";
      emptyErrorMessage.style.display = "block";
    } else if (isEmpty === false) {
      expenseText.style.display = "block";
      emptyErrorMessage.style.display = "none";
    }
  }
}
function negativeErrorHandler(isinputNegative) {
  const negativeErrorMessage = document.getElementById(
    "negative-error-message"
  );
  const expenseTexts = document.getElementsByClassName("expense-texts");
  for (const expenseText of expenseTexts) {
    if (isinputNegative === true) {
      expenseText.style.display = "none";
      negativeErrorMessage.style.display = "block";
    } else if (isinputNegative === false) {
      expenseText.style.display = "block";
      negativeErrorMessage.style.display = "none";
    }
  }
}
function expenseComparison(isBigger) {
  const ExpenseLimitErrorMessage = document.getElementById(
    "expense-limit-error-message"
  );
  const expenseTexts = document.getElementsByClassName("expense-texts");
  for (const expenseText of expenseTexts) {
    if (isBigger === true) {
      expenseText.style.display = "none";
      ExpenseLimitErrorMessage.style.display = "block";
    } else if (isBigger === false) {
      expenseText.style.display = "block";
      ExpenseLimitErrorMessage.style.display = "none";
    }
  }
}

function getInputValue(inputId) {
  const inputField = document.getElementById(inputId);
  const inputText = inputField.value;
  const inputValue = parseFloat(inputText);
  return inputValue;
}

document.getElementById("calc-button").addEventListener("click", function () {
  // Income
  const incomeValue = getInputValue("income-id");
  // food
  const foodExpense = getInputValue("food-expense");
  // rent
  const rentExpense = getInputValue("rent-expense");
  // clothes
  const clothesExpense = getInputValue("clothes-expense");
  if (
    incomeValue < 0 ||
    foodExpense < 0 ||
    rentExpense < 0 ||
    clothesExpense < 0
  ) {
    negativeErrorHandler(true);
    return null;
  } else {
    negativeErrorHandler(false);
    // return null;
  }

  if (!incomeValue || !foodExpense || !rentExpense || !clothesExpense) {
    emptyErrorHandler(true);
    return null;
  } else {
    emptyErrorHandler(false);
  }
  // Sum Of Expenses //
  const totalExpenses = foodExpense + rentExpense + clothesExpense;
  const totalExpensesField = document.getElementById("total-expense");
  totalExpensesField.innerText = totalExpenses;
  if (totalExpenses > incomeValue) {
    expenseComparison(true);
  } else {
    expenseComparison(false);
  }
  //   balance
  const balance = incomeValue - totalExpenses;
  const balanceField = document.getElementById("balance");
  balanceField.innerText = balance;
});

// Save Section //
document.getElementById("save-button").addEventListener("click", function () {
  // save Input
  const saveAmountField = document.getElementById("save-percent-amount");
  const saveAmountText = saveAmountField.value;
  const saveAmountValue = parseFloat(saveAmountText);
  // Income Input //
  const incomeValue = getIncomeValue();
  // Save Amount
  const savingAmountField = document.getElementById("saving-amount");
  const savingAmount = incomeValue * (saveAmountValue / 100);
  savingAmountField.innerText = savingAmount;
  // Balance
  const balanceField = document.getElementById("balance");
  const balanceFieldText = balanceField.innerText;
  const balance = parseFloat(balanceFieldText);
  // Remaining Balance
  const remainingBalanceField = document.getElementById("remaining-balance");
  const remainingBalance = balance - savingAmount;
  remainingBalanceField.innerText = remainingBalance;
});
