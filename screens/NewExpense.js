import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';

const ExpenseScreen = () => {
  return (
    <View style={styles.container}>
      <ExpenseForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExpenseScreen;
