import React, { createContext, useEffect, useReducer, useContext } from 'react';
import {
  fetchDataFromFirestore,
  addExpenseToFirestore,
  updateExpenseToFirestore,
  deleteExpenseToFirestore,
} from '../utils/expenses';
import { AuthContext } from './AuthContext';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  getExpenseById: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return [...action.payload];
    case 'ADD':
      const id = new Date().valueOf() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE': {
      return state.filter((expense) => expense.id !== action.payload);
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const { isAuthenticated, userDetails } = useContext(AuthContext);
  const userId = userDetails?._tokenResponse?.localId;

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        const expenseData = await fetchDataFromFirestore(userId);
        dispatch({ type: 'INITIALIZE', payload: expenseData });
      };
      fetchData();
    }
  }, [isAuthenticated, userId]);

  async function addExpense(expenseData) {
    const addedData = await addExpenseToFirestore({ ...expenseData, userId });
    addedData && dispatch({ type: 'ADD', payload: addedData });
  }

  async function deleteExpense(id) {
    const isDeleted = await deleteExpenseToFirestore(id);
    isDeleted && dispatch({ type: 'DELETE', payload: id });
  }

  async function updateExpense(id, expenseData) {
    const updatedExpense = await updateExpenseToFirestore(id, expenseData);
    dispatch({ type: 'UPDATE', payload: { id: id, data: updatedExpense } });
  }

  function getExpenseById(id) {
    return expensesState?.find((item) => item.id === id);
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    getExpenseById: getExpenseById,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
