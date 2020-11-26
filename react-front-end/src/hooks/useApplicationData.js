// import {useEffect, useState } from 'react';
// import axios from "axios";



// export function useApplicationData() {
//   const [state, setState] = useState({
//     account: "Checking",
//     accounts: [],
//     categories: [],
//     transactions: [],
//     transaction_types: []
//   });

//   const setAccount = function(account) {
//     return setState({ ...state, accounts: [...state.accounts, account]});
//   } 

//   useEffect(() => {
//     Promise.all([
//       axios.get(`/api/accounts`),
//       axios.get(`/api/categories`),
//       axios.get(`/api/transactions`),
//       axios.get(`/api/transaction_types`)
//     ]).then((all) => {
//       setState(prev => ({
//         ...prev,
//         accounts: all[0].data,
//         categories: all[1].data,
//         transactions: all[2].data,
//         transaction_types: all[3].data
//       }))
//     })
//   }, []);

//   return {
//     state,
//     setAccount
//   };
// }