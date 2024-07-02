// Import necessary modules
import { firestoreDB } from './firestore';
import { collection, query, getDocs } from 'firebase/firestore';

// Example function to fetch data from Firestore
export const fetchDataFromFirestore = async () => {
  try {
    const expensesCollection = collection(firestoreDB, 'Expenses');
    const snapshot = await getDocs(query(expensesCollection));
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};
