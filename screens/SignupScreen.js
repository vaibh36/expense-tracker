// Import necessary modules
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useSignupFormValidation from '../components/useSignupFormValidation';

const SignupScreen = ({ navigation }) => {
  const { validationSchema } = useSignupFormValidation();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('I am called:-', values);
        navigation.navigate('Main');
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => {

        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 10,
              gap: 10,
            }}
          >
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
            {errors?.email && (
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
            {errors?.password && (
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
          </View>
        );
      }}
    </Formik>
  );
};

export default SignupScreen;
