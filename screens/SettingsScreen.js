import React from 'react';
import { Text, Switch } from 'react-native-paper';
import { View, StyleSheet  } from 'react-native';

const SettingsScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }}>
      <Text>Enable the alert for 20k monthly expense</Text>
       <View>
    
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='purple' />
    
    </View>
     
    </View>
  );
};



export default SettingsScreen;
