// Empty Error Handling //
function emptyErrorHandler(section, isEmpty) {
  const emptyErrorMessage = document.getElementById(
    section + "-empty-error-message"
  );
  const texts = document.getElementsByClassName(section + "-texts");
  for (const text of texts) {
    if (isEmpty === true) {
      text.style.display = "none";
      emptyErrorMessage.style.display = "block";
      document.getElementById("saving-amount").innerText = 0;
      document.getElementById("remaining-balance").innerText = 0;
    } else if (isEmpty === false) {
      text.style.display = "block";
      emptyErrorMessage.style.display = "none";
    }
  }
}
// Income, Expense and Savings Negative Error Handling //
function negativeErrorHandler(section, isinputNegative) {
  const negativeErrorMessage = document.getElementById(
    section + "-negative-error-message"
  );
  const texts = document.getElementsByClassName(section + "-texts");
  for (const text of texts) {
    if (isinputNegative === true) {
      text.style.display = "none";
      negativeErrorMessage.style.display = "block";
      document.getElementById("saving-amount").innerText = 0;
      document.getElementById("remaining-balance").innerText = 0;
      document.getElementById("save-button").setAttribute("disabled", true);
    } else if (isinputNegative === false) {
      text.style.display = "block";
      negativeErrorMessage.style.display = "none";
      document.getElementById("save-button").removeAttribute("disabled");
    }
  }
}
// Income And Expense Comparison //
function amountComparison(section, isBigger) {
  const amountLimitErrorMessage = document.getElementById(
    section + "-limit-error-message"
  );
  const texts = document.getElementsByClassName(section + "-texts");
  for (const text of texts) {
    if (isBigger === true) {
      text.style.display = "none";
      amountLimitErrorMessage.style.display = "block";
      document.getElementById("saving-amount").innerText = 0;
      document.getElementById("remaining-balance").innerText = 0;
      document.getElementById("save-button").setAttribute("disabled", true);
      document.getElementById("save-button").removeAttribute("disabled");
    } else if (isBigger === false) {
      text.style.display = "block";
      amountLimitErrorMessage.style.display = "none";
    }
  }
}
// Getting Input Values //
function getInputValue(inputId) {
  const inputField = document.getElementById(inputId);
  const inputText = inputField.value;
  const inputValue = parseFloat(inputText);
  return inputValue;
}
// Income And Expense Calculation Section //
document.getElementById("calc-button").addEventListener("click", function () {
  emptyErrorHandler("expense", false);
  negativeErrorHandler("expense", false);
  amountComparison("expense", false);

  // Variable Declaration //
  const incomeValue = getInputValue("total-income");
  const foodExpense = getInputValue("food-expense");
  const rentExpense = getInputValue("rent-expense");
  const clothesExpense = getInputValue("clothes-expense");

  // Empty Error Handling //
  if (!incomeValue || !foodExpense || !rentExpense || !clothesExpense) {
    emptyErrorHandler("expense", true);
    return null;
  }
  // Negative Error Handling
  if (
    incomeValue < 0 ||
    foodExpense < 0 ||
    rentExpense < 0 ||
    clothesExpense < 0
  ) {
    negativeErrorHandler("expense", true);
    return null;
  }
  // Sum Of Expenses //
  const totalExpenses = foodExpense + rentExpense + clothesExpense;
  const totalExpensesField = document.getElementById("total-expense");
  totalExpensesField.innerText = totalExpenses;
  if (totalExpenses > incomeValue) {
    amountComparison("expense", true);
    return null;
  }
  // Balance Count //
  const balance = incomeValue - totalExpenses;
  const balanceField = document.getElementById("balance");
  balanceField.innerText = balance;
  const saveInputField = document.getElementById("save-percent-amount");
  if (balance > 0) {
    saveInputField.removeAttribute("disabled");
  } else {
    saveInputField.setAttribute("disabled", true);
  }
});

// Saving Calculation Section //
document.getElementById("save-button").addEventListener("click", function () {
  emptyErrorHandler("saving", false);
  negativeErrorHandler("saving", false);
  amountComparison("saving", false);
  // Save Input //
  const saveAmountValue = getInputValue("save-percent-amount");
  if (!saveAmountValue) {
    emptyErrorHandler("saving", true);
    return null;
  }
  if (saveAmountValue < 0) {
    negativeErrorHandler("saving", true);
    return null;
  }
  // Income Input //
  const incomeValue = getInputValue("total-income");
  // Saving Amount //
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
  if (remainingBalance < 0) {
    amountComparison("saving", true);
    return null;
  }
  remainingBalanceField.innerText = remainingBalance;
});
