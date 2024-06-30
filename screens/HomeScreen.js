import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enhance your savings with Expense Tracker App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
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
  },
});

export default HomeScreen;
