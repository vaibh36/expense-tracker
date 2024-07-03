import React, { useContext, useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const timeout = useRef();

  useEffect(() => {
    if (!timeout.current) {
      timeout.current = setTimeout(() => {
        navigation.replace(isAuthenticated ? 'Main' : 'Signin');
      }, 3000);
    }

    () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/SplashScreen.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
