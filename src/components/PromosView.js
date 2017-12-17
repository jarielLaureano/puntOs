import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputLine } from './common';
import PostList from './PostList';
import { Actions } from 'react-native-router-flux';

class PromosView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PostList />
      </View>
    );
  }
}

export default PromosView;
