// Import necessary modules
import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';

import useSignupFormValidation from '../components/useSignupFormValidation';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { createUser } from '../utils/auth';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { validationSchema } = useSignupFormValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { saveUserDetails } = React.useContext(AuthContext);

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
          saveUserDetails(user);
          navigation.navigate('Main');
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
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
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

export default SignupScreen;
