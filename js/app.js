// Expense Error Handling //
// empty Error Handling //
function emptyErrorHandler(section, isEmpty) {
  const emptyErrorMessage = document.getElementById(
    section + "-empty-error-message"
  );
  const texts = document.getElementsByClassName(section + "-texts");
  for (const text of texts) {
    if (isEmpty === true) {
      text.style.display = "none";
      emptyErrorMessage.style.display = "block";
    } else if (isEmpty === false) {
      text.style.display = "block";
      emptyErrorMessage.style.display = "none";
    }
  }
}
// Income And Expense Negative Error Handling //
function negativeErrorHandler(section, isinputNegative) {
  const negativeErrorMessage = document.getElementById(
    section + "-negative-error-message"
  );
  const texts = document.getElementsByClassName(section + "-texts");
  for (const text of texts) {
    if (isinputNegative === true) {
      text.style.display = "none";
      negativeErrorMessage.style.display = "block";
    } else if (isinputNegative === false) {
      text.style.display = "block";
      negativeErrorMessage.style.display = "none";
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
    } else if (isBigger === false) {
      text.style.display = "block";
      amountLimitErrorMessage.style.display = "none";
    }
  }
}
// function amountComparison(isBigger) {
//   const ExpenseLimitErrorMessage = document.getElementById(
//     "expense-limit-error-message"
//   );
//   const expenseTexts = document.getElementsByClassName("expense-texts");
//   for (const expenseText of expenseTexts) {
//     if (isBigger === true) {
//       expenseText.style.display = "none";
//       ExpenseLimitErrorMessage.style.display = "block";
//     } else if (isBigger === false) {
//       expenseText.style.display = "block";
//       ExpenseLimitErrorMessage.style.display = "none";
//     }
//   }
// }
// Getting Input Value //
function getInputValue(inputId) {
  const inputField = document.getElementById(inputId);
  const inputText = inputField.value;
  const inputValue = parseFloat(inputText);
  return inputValue;
}
// Income And Expense Calculation Section //
document.getElementById("calc-button").addEventListener("click", function () {
  // Variable Declaration //
  const incomeValue = getInputValue("income-id");
  const foodExpense = getInputValue("food-expense");
  const rentExpense = getInputValue("rent-expense");
  const clothesExpense = getInputValue("clothes-expense");

  // Empty Error Handling //
  if (!incomeValue || !foodExpense || !rentExpense || !clothesExpense) {
    emptyErrorHandler("expense", true);
    return null;
  } else {
    emptyErrorHandler("expense", false);
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
  } else {
    negativeErrorHandler("expense", false);
  }
  // Sum Of Expenses //
  const totalExpenses = foodExpense + rentExpense + clothesExpense;
  const totalExpensesField = document.getElementById("total-expense");
  totalExpensesField.innerText = totalExpenses;
  if (totalExpenses > incomeValue) {
    amountComparison("expense", true);
  } else {
    amountComparison("expense", false);
  }
  // Balance Count //
  const balance = incomeValue - totalExpenses;
  const balanceField = document.getElementById("balance");
  balanceField.innerText = balance;
});

// Saving Calculation Section //
document.getElementById("save-button").addEventListener("click", function () {
  // save Input
  const saveAmountValue = getInputValue("save-percent-amount");
  if (!saveAmountValue) {
    emptyErrorHandler("saving", true);
    return null;
  } else {
    emptyErrorHandler("saving", false);
  }
  if (saveAmountValue < 0) {
    negativeErrorHandler("saving", true);
    return null;
  } else {
    negativeErrorHandler("saving", false);
  }
  // Income Input //
  const incomeValue = getInputValue("income-id");
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
  } else {
    amountComparison("saving", false);
  }
  remainingBalanceField.innerText = remainingBalance;
});
