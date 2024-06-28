import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { ExpensesContext } from '../context/ExpensesContext';

const DeleteExpenseModal = ({ visible, onClose, message, selectedItem }) => {
  const { deleteExpense } = React.useContext(ExpensesContext);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 40,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteExpense(selectedItem);
                  onClose();
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  onClose();
                }}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DeleteExpenseModal;
