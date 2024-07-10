// Import necessary modules
import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { Formik } from 'formik';

import useSigninFormValidation from '../hooks/useSigninFormValidation';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { signIn } from '../utils/auth';
import { AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
  const { validationSchema } = useSigninFormValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { signInUser } = React.useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const gotToSignUpScreen = () => {
    navigation.navigate('Signup');
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          setIsLoading(true);
          setIsError(false);
          const user = await signIn(values?.email, values?.password);
          setIsLoading(false);
          signInUser(user);
          navigation.navigate('Main');
        } catch (e) {
          console.log(e);
          setIsLoading(false);
          setIsError(true);
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors, setErrors, touched }) => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 10,
              gap: 10,
            }}
          >
            {isLoading && (
              <ActivityIndicator animating={true} color={MD2Colors.blue300} size={'large'} />
            )}
            {!isLoading && (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginBottom: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Login to Account to track and view your Expenses
                </Text>
                <TextInput
                  name="email"
                  value={values?.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    backgroundColor: 'white',
                  }}
                />
                {errors?.email && touched?.email && (
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {errors?.email}
                  </Text>
                )}
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}
                >
                  <TextInput
                    value={values?.password}
                    onChangeText={handleChange('password')}
                    name="password"
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    style={{
                      backgroundColor: 'white',
                      flex: 1,
                    }}
                     right={<TextInput.Icon icon={passwordVisible ? 'eye-off' : 'eye'}  onPress={() => setPasswordVisible(!passwordVisible)} />}
                  />
                
                </View>
                {errors?.password && touched?.password && (
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {errors?.password}
                  </Text>
                )}
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: 'blue',
                  }}
                  onPress={handleSubmit}
                >
                  Sign in
                </Button>
                {isError && (
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Something went wrong. Please check if entered email and password is correct.
                  </Text>
                )}
                <Divider />
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: '#42b72a',
                  }}
                  onPress={() => {
                    setErrors({
                      email: '',
                      password: '',
                    });
                    gotToSignUpScreen();
                  }}
                >
                  Create new account
                </Button>
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

export default SigninScreen;
