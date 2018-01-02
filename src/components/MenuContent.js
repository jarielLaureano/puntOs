import React, { Component } from 'react';
import { Text, View} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

class MenuContent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Drawer Content</Text>
        <Button onPress={() => console.log('Close')}>Back</Button>
        <Text>Title: Drawer</Text>
      </View >
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  }
};

export default MenuContent;
