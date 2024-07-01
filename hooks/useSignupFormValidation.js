import * as Yup from 'yup';

const useSignupFormValidation = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return { validationSchema };
};

export default useSignupFormValidation;
