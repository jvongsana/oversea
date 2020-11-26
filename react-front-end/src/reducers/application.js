const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_CATEGORY = "SET_CATEGORY";
const SET_TRANSACTION = "SET_TRANSACTION";
const SET_NEW_ACCOUNT = "SET_NEW_ACCOUNT";

const reducer = function(state, action) {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.account
      }
    case SET_NEW_ACCOUNT:
      return { 
        ...state, 
        accounts: 
          [...state.accounts, 
            { user_id: action.user_id, 
              name: action.account
            }
          ]
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        accounts: action.accounts,
        categories: action.categories,
        transaction_types: action.transaction_types,
        transactions: action.transactions
      }
    case SET_CATEGORY:
      return {
        ...state,
        categories: 
          [...state.categories,
            { 
              name: action.category
            }
          ]
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
} 

export default reducer;
export { SET_APPLICATION_DATA, SET_ACCOUNT, SET_CATEGORY, SET_TRANSACTION, SET_NEW_ACCOUNT };