// Import necessary modules
import moment from 'moment';
import { firestoreDB } from './firestore';
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  Timestamp,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  limit,
  startAfter,
  orderBy,
  documentId,
  getAggregateFromServer,
  sum,
} from 'firebase/firestore';

const COLLECTION_NAME = 'Expenses';
const expensesCollection = collection(firestoreDB, COLLECTION_NAME);

export const fetchTotalExpenses = async (userId) => {
  let totalExpense = 0;

  try {
    const snapshot = await getAggregateFromServer(
      query(expensesCollection, where('userId', '==', userId)),
      {
        totalExpense: sum('amount'),
      }
    );

    totalExpense = snapshot?.data()?.totalExpense || 0;
  } catch (e) {
    console.log('Error fetching total expenses', e);
  }

  return totalExpense;
};

export const fetchTotalExpensesInLast7Days = async (userId) => {
  let totalExpense = 0;
  try {
    const date = moment().startOf('day').subtract(7, 'days').toDate();

    const snapshot = await getAggregateFromServer(
      query(
        expensesCollection,
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(date))
      ),
      {
        totalExpense: sum('amount'),
      }
    );

    totalExpense = snapshot?.data()?.totalExpense || 0;
  } catch (e) {
    console.log('Error fetching total expenses in last 7 days ', e);
  }

  return totalExpense;
};

// Example function to fetch data from Firestore
export const fetchDataFromFirestore = async (userId, startAfterDoc, pageLimit) => {
  let expenses = [];
  try {
    const expensesQuery = [
      expensesCollection,
      where('userId', '==', userId),
      orderBy('date'),
      orderBy(documentId()),
      limit(pageLimit),
    ];

    if (startAfterDoc) {
      expensesQuery.push(startAfter(startAfterDoc.date, startAfterDoc.id));
    }

    const snapshot = await getDocs(query(...expensesQuery));
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      const expenseData = doc.data();
      expenses.push({
        id: doc.id,
        ...expenseData,
        date: expenseData?.date?.toDate(),
      });
    });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

  return expenses;
};

export const addExpenseToFirestore = async ({ category, userId, date, description, amount }) => {
  let expense;
  try {
    const docRef = await addDoc(expensesCollection, {
      userId,
      category: category || '',
      date,
      description,
      amount: parseFloat(amount),
      date: Timestamp.fromDate(date),
    });

    const expenseData = await getDoc(docRef).then((response) => response?.data());
    expense = { ...docRef?.id, ...expenseData, date: expenseData?.date?.toDate() };
  } catch (error) {
    console.error('Error adding data: ', error);
  }

  return expense;
};

export const updateExpenseToFirestore = async (id, { category, date, description, amount }) => {
  let expense;
  try {
    const docRefToUpdate = doc(firestoreDB, COLLECTION_NAME, id);
    await updateDoc(docRefToUpdate, {
      category: category || '',
      date,
      description,
      amount,
      date: Timestamp.fromDate(date),
    });

    const expenseData = await getDoc(docRefToUpdate).then((response) => response?.data());
    expense = { id, ...expenseData, date: expenseData?.date?.toDate() };
  } catch (error) {
    console.error('Error updating data: ', error);
  }

  return expense;
};

export const deleteExpenseToFirestore = async (id) => {
  try {
    const docRefToUpdate = doc(firestoreDB, COLLECTION_NAME, id);
    await deleteDoc(docRefToUpdate);

    return true;
  } catch (error) {
    console.error('Error updating data: ', error);
  }

  return false;
};
