import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { ExpensesContext } from '../context/ExpensesContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import moment from 'moment';

const HomeScreen = ({ navigation }) => {
  const { expenses } = useContext(ExpensesContext);
  const sevenDayAgo = moment().startOf('day').subtract(7, 'days');
  const totalExpenses = expenses?.reduce((acc, expense) => acc + Number(expense.amount), 0);
  const sevenDaysExpense = expenses
    ?.filter((expense) => moment(expense.date) > sevenDayAgo)
    .reduce((acc, expense) => acc + Number(expense.amount), 0);

  const gotToExpenses = () => {
    navigation.navigate('Expenses');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enhance your savings with Expense Tracker App</Text>
      <Divider />
      <View style={styles.analyticsContainer}>
        <Text style={styles.metricsHeader}>Total Expenses</Text>
        <View style={styles.totalExpenseContainer}>
          <Card style={styles.totalCard} onPress={gotToExpenses}>
            <Card.Content>
              <View style={styles.totalCardContent}>
                <View style={styles.totalIcon}>
                  <Icon size={30} name="sack-dollar" color="blue" />
                </View>
                <View style={styles.totalMetric}>
                  <Text style={styles.totalMetricTitle}>All</Text>
                  <Text style={styles.totalMetricValue}>INR {totalExpenses?.toFixed(2)}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.totalCard} onPress={gotToExpenses}>
            <Card.Content>
              <View style={styles.totalCardContent}>
                <View style={styles.totalIcon}>
                  <Icon size={30} name="sack-dollar" color="blue" />
                </View>
                <View style={styles.totalMetric}>
                  <Text style={styles.totalMetricTitle}>Last 7 days</Text>
                  <Text style={styles.totalMetricValue}>INR {sevenDaysExpense?.toFixed(2)}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
    justifyContent: 'center',
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
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  analyticsContainer: {
    flex: 1,
    padding: 10,
  },
  metricsHeader: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
  totalExpenseContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  totalCard: {
    flex: 1,
  },
  totalCardContent: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  totalIcon: {
    alignItems: 'center',
  },
  totalMetric: {
    gap: 10,
    justifyContent: 'center',
    flex: 1,
  },
  totalMetricTitle: {
    fontWeight: 'bold',
    color: 'blue',
    width: '100%',
    flexWrap: 'wrap',
  },
  totalMetricValue: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue',
  },
});

export default HomeScreen;
