import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputLine, Button } from './common';
import { Actions } from 'react-native-router-flux';

class UserMain extends Component {
  render() {
    return (
      <View>
        <Text>Main View User</Text>
        <Button onPress={() => Actions.PostReviewView()}>
          Post Review
        </Button>
      </View>
    );
  }
}

export default UserMain;
