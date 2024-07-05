import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useState,
} from 'react';
import {
  fetchDataFromFirestore,
  addExpenseToFirestore,
  updateExpenseToFirestore,
  deleteExpenseToFirestore,
  fetchTotalExpenses,
  fetchTotalExpensesInLast7Days,
} from '../utils/expenses';
import { AuthContext } from './AuthContext';
import moment from 'moment';

export const ExpensesContext = createContext({
  expenses: [],
  totalExpenses: 0,
  totalExpensesIn7Days: 0,
  getExpenses: () => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  getExpenseById: (id) => {},
  getTotalExpense: () => {},
  getTotalExpenseInLast7Days: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        ...state,
        expenses:
          action.payload.page > 1
            ? [...state.expenses, ...action.payload.expenseData]
            : [...action.payload.expenseData],
      };
    }
    case 'ADD': {
      const newExpenses = [{ ...action.payload }, ...state.expenses];
      newExpenses.sort((a, b) => {
        const dateCmp = moment(a.date).format('x') - moment(b.date).format('x');
        const idCmp = a.id.localeCompare(b.id);

        return dateCmp || idCmp;
      });

      return {
        ...state,
        expenses: newExpenses,
      };
    }
    case 'UPDATE': {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return { ...state, expenses: updatedExpenses };
    }
    case 'DELETE': {
      const updatedExpenses =
        state.expenses.filter((expense) => expense.id !== action.payload) || [];
      return { ...state, expenses: updatedExpenses };
    }
    case 'SET_TOTAL_EXPENSES': {
      return { ...state, totalExpenses: action.payload };
    }
    case 'SET_TOTAL_EXPENSES_IN_7_DAYS': {
      return { ...state, totalExpensesIn7Days: action.payload };
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, {
    expenses: [],
    totalExpenses: 0,
    totalExpensesIn7Days: 0,
  });
  const [hasMore, setHasMore] = useState(true);
  const { isAuthenticated, userDetails } = useContext(AuthContext);
  const userId = userDetails?._tokenResponse?.localId;

  useEffect(() => {
    if (isAuthenticated && userId) {
      getExpenses();
      getTotalExpense();
      getTotalExpenseInLast7Days();
    }
  }, [isAuthenticated, userId]);

  const getTotalExpense = useCallback(async () => {
    const totalAmount = await fetchTotalExpenses(userId);
    dispatch({ type: 'SET_TOTAL_EXPENSES', payload: totalAmount });
  }, [userId]);

  const getTotalExpenseInLast7Days = useCallback(async () => {
    const totalAmount = await fetchTotalExpensesInLast7Days(userId);
    dispatch({ type: 'SET_TOTAL_EXPENSES_IN_7_DAYS', payload: totalAmount });
  }, [userId]);

  const getExpenses = useCallback(async (page = 1, limit = 10) => {
    const { expenses } = expensesState;

    if (page > 1 && expenses?.length >= page - 1 * limit && !expenses[expenses.length - 1]?.id) {
      return false;
    }
    const expenseData = await fetchDataFromFirestore(
      userId,
      page > 1 ? expenses[expenses.length - 1] : '',
      limit
    );

    if (expenseData?.length > 0) {
      dispatch({ type: 'INITIALIZE', payload: { expenseData, page } });
      if (expenseData?.length < limit) {
        setHasMore(false);
        return false;
      }
    } else {
      setHasMore(false);
    }

    return true;
  }, [userId, expensesState].expenses);

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
    return expensesState.expenses?.find((item) => item.id === id);
  }

  const value = {
    ...expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    getExpenseById,
    getExpenses,
    hasMore,
    setHasMore,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
