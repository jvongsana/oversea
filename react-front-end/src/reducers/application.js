const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_CATEGORY = "SET_CATEGORY";
const SET_TRANSACTIONS = "SET_TRANSACTIONS";
const SET_NEW_ACCOUNT = "SET_NEW_ACCOUNT";
const SET_NEW_TRANSACTION = "SET_NEW_TRANSACTION";
const SET_RENAME_ACCOUNT = "SET_RENAME_ACCOUNT";
const SET_DELETE_ACCOUNT = "SET_DELETE_ACCOUNT";

const reducer = function (state, action) {

  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.account
      };
    case SET_NEW_ACCOUNT:
      return {
        ...state,
        accounts:
          [...state.accounts,
          {
            user_id: action.user_id,
            name: action.account
          }
          ]
      };
    case SET_RENAME_ACCOUNT:
      return {
        ...state,
        account: action.account,
        accounts: action.accounts
      };
    case SET_DELETE_ACCOUNT:
      return {
        ...state,
        account: "Checking",
        accounts: action.accounts
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        accounts: action.accounts,
        categories: action.categories,
        transaction_types: action.transaction_types,
        transactions: action.transactions
      };
    case SET_CATEGORY:
      return {
        ...state,
        categories:
          [
            ...state.categories,
            {
              name: action.category
            }
          ]
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      };
    case SET_NEW_TRANSACTION:
      return {
        ...state,
        transactions:
          [...state.transactions,
          {
            category_id: action.data.category_id,
            account_id: action.data.account_id,
            transaction_type_id: action.data.transaction_type_id,
            payee: action.data.payee,
            amount_cents: action.data.amount_cents,
            transaction_date: action.data.transaction_date
          }
          ]
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default reducer;
export {
  SET_APPLICATION_DATA,
  SET_ACCOUNT,
  SET_CATEGORY,
  SET_TRANSACTIONS,
  SET_NEW_ACCOUNT,
  SET_RENAME_ACCOUNT,
  SET_DELETE_ACCOUNT,
  SET_NEW_TRANSACTION
};
