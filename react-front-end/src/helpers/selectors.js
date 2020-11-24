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
    console.log(category)
    if (category.id === id) {
      return category.name
    }
  }
}

function getTransactionTypeById(state, id) {
  for (const type of state) {
    console.log('type', type)
    if (type.id === id) {
      return type.type_name;
    }
  }
}

function getAmountDollars(amount){
  return `$${(amount/100).toFixed(2)}`
}


export { getTransactionsByAccount, getCategoryById, getTransactionTypeById, getAmountDollars }