import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';

const ExpenseScreen = ({ route }) => {
  const { itemId } = route.params || {};

  return (
    <View style={styles.container}>
      <ExpenseForm itemId={itemId} />
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
