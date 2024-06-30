import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewExpenseScreen from './screens/NewExpense';
import ExpenseListing from './screens/ExpenseListing';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent';
import ExpensesContextProvider from './context/ExpensesContext';
import SplashScreen from './screens/SplashScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignupScreen from './screens/SignupScreen';
import AuthContextProvider from './context/AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Expenses') {
            iconName = focused ? 'list' : 'list-outline';
          } else {
            iconName = 'add';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Expenses" component={ExpenseListing} />
      <Tab.Screen name="New Expense" component={NewExpenseScreen} />
    </Tab.Navigator>
  );
};

const MainStackNavigator = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  React.useEffect(() => {
    const showDrawerIcon = routeName !== '' && routeName !== 'Signup';
    navigation.setOptions({
      title: '',
      headerLeft: showDrawerIcon ? undefined : () => null,
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <MenuProvider>
        <AuthContextProvider>
          <ExpensesContextProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                  <Drawer.Screen name="Track your Expenses" component={MainStackNavigator} />
                </Drawer.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </ExpensesContextProvider>
        </AuthContextProvider>
      </MenuProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
