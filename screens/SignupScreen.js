// Import necessary modules
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useSignupFormValidation from '../hooks/useSignupFormValidation';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { createUser } from '../utils/auth';

const SignupScreen = ({ navigation }) => {
  const { validationSchema } = useSignupFormValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);

  const gotToSignInScreen = () => {
    navigation.navigate('Signin');
  };

  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="checkmark-circle" size={150} color="#7DE24E" />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 18,
            padding: 30,
          }}
        >
          Registration Successful
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#7DE24E',
            borderWidth: 0,
            color: '#FFFFFF',
            borderColor: '#7DE24E',
            height: 40,
            width: 200,
            alignItems: 'center',
            borderRadius: 30,
            marginLeft: 35,
            marginRight: 35,
            marginTop: 20,
            marginBottom: 20,
          }}
          activeOpacity={0.5}
          onPress={gotToSignInScreen}
        >
          <Text style={{ color: '#FFFFFF', paddingVertical: 10, fontSize: 16 }}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          const user = await createUser(values?.email, values?.password);
          setIsLoading(false);
          setIsRegistrationSuccess(true);
        } catch (e) {
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
                  Create Account to save more
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
                <TextInput
                  value={values?.password}
                  onChangeText={handleChange('password')}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  style={{
                    backgroundColor: 'white',
                  }}
                />
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
                  Signup
                </Button>
                {isError && (
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Something went wrong.
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
                    gotToSignInScreen();
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

export default SignupScreen;
