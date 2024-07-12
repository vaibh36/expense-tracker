import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const DrawerContent = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [openLogoffModal, setOpenLogoffModal] = React.useState(false);

  return (
    <>
      <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
        <View style={styles.drawerItemContainer}>
          <DrawerItem
            label="Home"
            onPress={() => navigation.navigate('Home')}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="New Expense"
            onPress={() => navigation.navigate('New Expense')}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Expenses"
            onPress={() => navigation.navigate('Expenses')}
            style={styles.drawerItem}
          />
            <DrawerItem
            label="Settings"
             onPress={() => navigation.navigate('Settings')}
            style={styles.drawerItem}
          />
        </View>

        <View style={styles.logoutContainer}>
          <DrawerItem
            labelStyle={styles.logoutText}
            onPress={() => {
              navigation.closeDrawer();
              setOpenLogoffModal(true);
            }}
            label="Logout"
          />
        </View>
      </DrawerContentScrollView>
      {openLogoffModal && (
        <View style={styles.centeredView}>
          <Modal animationType="slide" visible={openLogoffModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Do you want to log out?</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 40,
                  }}
                >
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setOpenLogoffModal(false);
                      signOut();
                      navigation.navigate('Signin');
                    }}
                  >
                    <Text style={styles.textStyle}>Yes</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setOpenLogoffModal(false);
                    }}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerItemContainer: {
    justifyContent: 'flex-start',
    flex: 2,
  },
  drawerItem: {
    marginBottom: 0,
    paddingBottom: 0,
  },

  logoutContainer: {
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
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

export default DrawerContent;
