import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const ExpenseActionsPopover = ({ onMenuOpen, onSelect }) => {
  const handleSelect = (action) => {
    onSelect(action);
  };

  return (
    <Menu>
      <MenuTrigger onPress={onMenuOpen}>
        <Icon name="ellipsis-v" size={20} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.optionsContainer}>
        <MenuOption style={styles.menuItem} onSelect={() => handleSelect('edit')}>
          <Text>Edit</Text>
        </MenuOption>
        <MenuOption style={styles.menuItem} onSelect={() => handleSelect('delete')}>
          <Text>Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    width: 70,
  },
});

export default ExpenseActionsPopover;
