// ExpenseForm.js

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ExpensesContext } from '../context/ExpensesContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

const validationSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  category: yup.string().required('Category is required'),
});

const ExpenseForm = ({ itemId }) => {
  const [loading, setLoading] = useState(false);
  const { addExpense, updateExpense, getExpenseById } = useContext(ExpensesContext);
  const navigator = useNavigation();
  const initialValues = { description: '', amount: '', date: new Date(), category: '' };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      itemId ? await updateExpense(itemId, values) : await addExpense(values);
      setLoading(false);
      navigator.navigate('Expenses');
    },
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const focusCallback = React.useCallback(() => {
    if (itemId) {
      const expense = getExpenseById(itemId);
      resetForm(expense ? { values: { ...expense } } : { values: initialValues });
    } else {
      resetForm({ values: initialValues });
    }

    return () => {};
  }, [itemId]);

  useFocusEffect(focusCallback);

  const displayDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    setFieldValue('date', date);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={displayDatePicker}>
        <View style={[styles.dateInput, styles.input]}>
          <Text>{values.date ? moment(values.date).format('DD-MM-YYYY') : 'Select a date'}</Text>
          <Icon name="calendar" size={20} color="#0969da" />
        </View>
      </Pressable>
      {touched.date && errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          style={{ width: 200 }}
          value={values.date || new Date()}
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        value={values.description}
        placeholder="Description"
      />
      {touched.description && errors.description && (
        <Text style={styles.errorText}>{errors.description}</Text>
      )}

      <TextInput
        style={styles.input}
        onChangeText={handleChange('amount')}
        onBlur={handleBlur('amount')}
        value={values.amount?.toString()}
        placeholder="Amount"
        keyboardType="number-pad"
      />
      {touched.amount && errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      <RNPickerSelect
        onValueChange={(value) => {
          setFieldValue('category', value);
        }}
        items={[
          { label: 'Food', value: 'food' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Gas', value: 'gas' },
        ]}
        style={pickerSelectStyles}
        value={values?.category}
        placeholder={{ label: 'Select category', value: null }}
      />
      {touched.category && errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'#fff'} />
          <Text style={styles.loadingText}>Submitting...</Text>
        </View>
      ) : (
        <Button onPress={handleSubmit} title="Submit" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  dateInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    marginBottom: 2,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  loading: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    height: 40,
  },
  loadingText: {
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    borderColor: '#BEBEBE',
  },
  viewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#BEBEBE',
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
  },
  placeholder: {
    color: '#BEBEBE',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#BEBEBE',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default ExpenseForm;
