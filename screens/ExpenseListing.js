import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import TotalExpenseCard from '../components/TotalExpenseCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ExpensesContext } from '../context/ExpensesContext';

const ExpenseListing = () => {
  const { expenses } = useContext(ExpensesContext);

  const renderExpenseItem = (itemData) => {
    return <TotalExpenseCard {...itemData.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseListing;
