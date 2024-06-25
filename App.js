import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewExpenseScreen from './screens/NewExpense';
import ExpenseListing from './screens/ExpenseListing';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getHeaderTitle = (routeName) => {
  switch (routeName) {
    case 'Home':
      return 'Home Screen';
    case 'New Expense':
      return 'New Expense';
    case 'Expenses':
      return 'Expenses';
    default:
      return 'App';
  }
};

const MainStackNavigator = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  React.useEffect(() => {
    navigation.setOptions({
      title: getHeaderTitle(routeName),
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="New Expense" component={NewExpenseScreen}  options={{ presentation: 'modal' }} />
      <Stack.Screen name="Expenses" component={ExpenseListing} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Track your Expenses" component={MainStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
});
