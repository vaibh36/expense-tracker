import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import {AuthContext} from '../context/AuthContext'

const DrawerContent = ({ navigation }) => {
  const {signOut} = React.useContext(AuthContext)

  return (
    <DrawerContentScrollView>
      <View style={{ flex: 1, justifyContent: 'space-between', height: "100%" }}>
        <View>
          <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
          <DrawerItem label="New Expense" onPress={() => navigation.navigate('New Expense')} />
          <DrawerItem label="Expenses" onPress={() => navigation.navigate('Expenses')} />
        </View>
       
      </View>
       <View style={styles.logoutContainer}>
          <Text style={styles.logoutText} onPress={() =>{
            signOut()
            navigation.navigate('Signup')
          }}>Logout</Text>
        </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
});

export default DrawerContent;
