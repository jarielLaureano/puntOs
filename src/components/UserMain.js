import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputLine, Button } from './common';
import { Actions } from 'react-native-router-flux';
import PostFeed from './PostFeed';
import UserMainFilterHeader from './UserMainFilterHeader';
import UserMainFooter from './UserMainFooter';

class UserMain extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <UserMainFilterHeader />
        <PostFeed />
        <UserMainFooter />
      </View>
    );
  }
}


export default UserMain;
