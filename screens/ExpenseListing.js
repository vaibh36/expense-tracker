import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
  Pressable,
  Button,
  Text,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import TotalExpenseCard from '../components/TotalExpenseCard';
import { ExpensesContext } from '../context/ExpensesContext';

const validationSchema = yup.object().shape({
  startDate: yup.date().required('Start date is required field'),
  endDate: yup
    .date()
    .required('End date is required field.')
    .when('startDate', (startDate, schema) => {
      return (
        startDate?.find((d) => !!d) &&
        schema.min(startDate, 'End date must be greater than start Date.')
      );
    })
    .required('End date is required field.'),
});

const ExpenseListing = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filters, setFilters] = useState(null);
  const { expenses, getExpenses, hasMore, setHasMore } = useContext(ExpensesContext);
  const { handleSubmit, setFieldValue, values, errors, touched, resetForm } = useFormik({
    initialValues: { startDate: '', endDate: '' },
    validationSchema,
    onSubmit: (values) => {
      setFilters({
        startDate: values.startDate,
        endDate: values.endDate,
      });
      onRefresh();
    },
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const response = await getExpenses(page, 10, filters);
    if (response) {
      setPage((prev) => prev + 1);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const renderExpenseItem = (itemData) => {
    return <TotalExpenseCard {...itemData.item} />;
  };

  const onRefresh = () => {
    setHasMore(true);
    setPage(1);
    setRefreshing(true);
  };

  const handleClear = () => {
    resetForm({ values: { startDate: '', endDate: '' } });
    setFilters(null);
    onRefresh();
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    ) : null;
  };

  const displayStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const displayEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const handleStartDateChange = (event, date) => {
    setShowStartDatePicker(false);
    setFieldValue('startDate', date);
  };

  const handleEndDateChange = (event, date) => {
    setShowEndDatePicker(false);
    setFieldValue('endDate', date);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.dateFilterWrapper}>
          <View>
            <Pressable onPress={displayStartDatePicker} style={{ width: '100%' }}>
              <View style={[styles.dateInput, styles.input]}>
                <Text>
                  {values.startDate
                    ? moment(values.startDate).format('DD-MM-YYYY')
                    : 'Select start date'}
                </Text>
                <Icon name="calendar" size={20} color="#0969da" />
              </View>
            </Pressable>
            {showStartDatePicker && (
              <DateTimePicker
                mode="date"
                style={{ width: 200 }}
                value={values.startDate || new Date()}
                onChange={handleStartDateChange}
              />
            )}
          </View>
          <View>
            <Pressable onPress={displayEndDatePicker} style={{ width: '100%' }}>
              <View style={[styles.dateInput, styles.input]}>
                <Text>
                  {values.endDate ? moment(values.endDate).format('DD-MM-YYYY') : 'Select end date'}
                </Text>
                <Icon name="calendar" size={20} color="#0969da" />
              </View>
            </Pressable>
            {showEndDatePicker && (
              <DateTimePicker
                mode="date"
                style={{ width: 200 }}
                value={values.endDate || new Date()}
                onChange={handleEndDateChange}
              />
            )}
          </View>
          {filters?.startDate || filters?.endDate ? (
            <Button onPress={handleClear} title="Clear" />
          ) : (
            <Button onPress={handleSubmit} title="Apply" />
          )}
        </View>
        {touched.startDate && errors.startDate && (
          <Text style={styles.errorText}>{errors.startDate}</Text>
        )}
        {(touched.endDate || touched.startDate) && errors.endDate && (
          <Text style={styles.errorText}>{errors.endDate}</Text>
        )}
      </View>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item, index) => item.id + '-' + index}
        onEndReached={fetchData}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateFilterWrapper: {
    flexDirection: 'row',
    justifyContent: 'streach',
    gap: 5,
    width: '40%',
    marginBottom: 5,
  },
  dateInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#BEBEBE',
    color: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default ExpenseListing;
