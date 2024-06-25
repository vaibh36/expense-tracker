import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

const DrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View>
        <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
        <DrawerItem label="New Expense" onPress={() => navigation.navigate('New Expense')} />
        <DrawerItem label="Expenses" onPress={() => navigation.navigate('Expenses')} />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
