import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ExpenseForm from '../components/ExpenseForm';

const ExpenseScreen = ({ route, navigation }) => {
  const { itemId } = route.params || {};

  const onPress = () => {
    navigation.navigate(itemId ? 'Expenses' : 'Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <Pressable onPress={onPress} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="#307ecc" />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
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
  backButtonWrapper: {
    alignSelf: 'flex-start',
    padding: 20,
    width: '100%',
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 10,
  },
  backButtonText: {
    color: '#307ecc',
    fontSize: 20,
  },
});

export default ExpenseScreen;
