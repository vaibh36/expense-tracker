import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteExpenseModal from './DeleteExpenseModal';
import moment from 'moment';

const TotalExpenseCard = ({ amount, description, date }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <React.Fragment>
      <Pressable
        style={styles.container}
        onPress={() => {
          setVisible(true);
        }}
      >
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
      </Pressable>
      {visible && (
        <DeleteExpenseModal
          visible={visible}
          setVisible={setVisible}
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
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'column',
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    width: '25%',
    flexWrap: 'wrap',
  },
});

export default TotalExpenseCard;
