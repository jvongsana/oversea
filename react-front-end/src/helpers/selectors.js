function getTransactionsByAccount(state, account) {
  let account_id = 0;
  let filteredTranscactions = [];

  for (const acc of state.accounts) {
    if (acc.name === account) {
      account_id += acc.id;
    }
  }

  for (const transaction of state.transactions) {
    if (transaction.account_id === account_id) {
      filteredTranscactions.push(transaction);
    }
  }
  
  return filteredTranscactions
}

function getCategoryById(state, id) {
  for (const category of state) {
    if (category.id === id) {
      return category.name
    }
  }
}

function getTransactionTypeById(state, id) {
  for (const type of state) {
    if (type.id === id) {
      return type.type_name;
    }
  }
}

function getAmountDollars(amount){
  return `$${(amount/100).toFixed(2)}`
}

function getCategoryForAccount(state, id) {
  let accountCategories = [];

  for (const category of state) {
    if (category.id === id) {
      accountCategories.push(category);
    }
  }

  return accountCategories;
}

function getTotalCategorySpending(transactions) {
  let sum = 0;

  for (const transaction of transactions) {
    if (transaction.transaction_type_id === 2) {  
      sum += transaction.amount_cents
    }
  }

  return sum 
}

function getPercentCategoryExpense(state, category) {
  let categorizedTransactions = []
  let totalExpenses = 0;
  
  for (const transaction of state){
    if (transaction.transaction_type_id === 2) {
      totalExpenses += transaction.amount_cents;
      if (transaction.category_id === category.id) {
        categorizedTransactions.push(transaction)
      }
    }
  }
  
  const totalCategorySpending = getTotalCategorySpending(categorizedTransactions);
  const percentage = ((totalCategorySpending/totalExpenses) * 100).toFixed(2);

  if (isNaN(percentage)) {
    return 0;
  }

  return percentage;
}

function getID(state) {
  console.log('id state', state)
  const largestID = Math.max.apply(Math, state.accounts.map((account) =>  account.id ));
  const nextID = largestID + 1

  return nextID;
}

export {
        getTransactionsByAccount, 
        getCategoryById, 
        getTransactionTypeById, 
        getAmountDollars, 
        getCategoryForAccount, 
        getPercentCategoryExpense,
        getID
      }