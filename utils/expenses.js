// Import necessary modules
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
} from 'firebase/firestore';

const COLLECTION_NAME = 'Expenses';
const expensesCollection = collection(firestoreDB, COLLECTION_NAME);

// Example function to fetch data from Firestore
export const fetchDataFromFirestore = async (userId) => {
  let expenses = [];

  try {
    const snapshot = await getDocs(query(expensesCollection), where('userId', '==', userId));
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
      amount,
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
