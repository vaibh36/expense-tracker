import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteExpenseModal from './DeleteExpenseModal';
import moment from 'moment';
import ExpenseActionsPopover from './ExpenseActionsPopover';
import { useNavigation } from '@react-navigation/native';

const TotalExpenseCard = ({ amount, description, date, id }) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const navigation = useNavigation();

  const handleSelectOption = (option) => {
    setSelectedItem(id);

    switch (option) {
      case 'edit': {
        navigation.navigate('New Expense', {
          itemId: id,
        });
        break;
      }
      case 'delete': {
        setVisible(true);
      }
      default: {
        break;
      }
    }
  };

  const onDeleteModalClose = () => {
    setVisible(false);
    setSelectedItem('');
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              backgroundColor: 'lightblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="apple" size={20} color="#900" />
          </View>
          <Text style={styles.text}>{moment(date).format('DD-MM-YYYY')}</Text>
          <Text style={styles.text}>{description}</Text>
          <Text>INR {amount}</Text>
        </View>
        <ExpenseActionsPopover onSelect={handleSelectOption} itemId={id} />
      </View>
      {visible && (
        <DeleteExpenseModal
          selectedItem={selectedItem}
          visible={visible}
          onClose={onDeleteModalClose}
          message="Do you want to delete this entry ?"
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    width: '25%',
    flexWrap: 'wrap',
  },
});

export default TotalExpenseCard;
