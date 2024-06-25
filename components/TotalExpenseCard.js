import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TotalExpenseCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="apple" size={20} color="#900" />
        </View>
        <Text style={styles.text}>Foods and Drinks</Text>
        <Text>INR 300</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '80%',
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    gap: 32,
  },
  text: {
    fontWeight: '600',
  },
});

export default TotalExpenseCard;
