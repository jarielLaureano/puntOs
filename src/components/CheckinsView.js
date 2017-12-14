import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import CheckinList from './CheckinList';

class CheckinsView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CheckinList />
      </View>
    );
  }
}

export default CheckinsView;
