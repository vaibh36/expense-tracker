import * as Yup from 'yup';

const useSigninFormValidation = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return { validationSchema };
};

export default useSigninFormValidation;
