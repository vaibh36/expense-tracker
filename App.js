import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
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
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import AuthContextProvider from './context/AuthContext';
import AnimatedTabBarIcon from './components/AnimatedTabBarIcon';
import * as Notifications from 'expo-notifications';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

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
          return <AnimatedTabBarIcon name={iconName} size={size} color={color} focused={focused} />;
        },
        headerShown: false,
      })}
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          // Prevent default action
          e.preventDefault();
          navigation.navigate(route.name);
        },
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
    const showDrawerIcon = routeName !== '' && routeName !== 'Signup' && routeName !== 'Signin';
    navigation.setOptions({
      title: '',
      headerLeft: showDrawerIcon ? undefined : () => null,
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
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
                  <Drawer.Screen name="Settings" component={SettingsScreen} />
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
