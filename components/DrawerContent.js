import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const DrawerContent = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerItemContainer}>
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate('Home')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="New Expense"
          onPress={() => navigation.navigate('New Expense')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="Expenses"
          onPress={() => navigation.navigate('Expenses')}
          style={styles.drawerItem}
        />
      </View>
      <View style={styles.logoutContainer}>
        <DrawerItem
          labelStyle={styles.logoutText}
          onPress={() => {
            signOut();
            navigation.navigate('Signup');
          }}
          label="Logout"
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerItemContainer: {
    justifyContent: 'flex-start',
  },
  drawerItem: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
});

export default DrawerContent;
