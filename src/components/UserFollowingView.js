import React, { Component } from 'react';
import { View } from 'react-native';
import UserFollowingList from './UserFollowingList';

class UserFollowingView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UserFollowingList />
      </View>
    );
  }
}

export default UserFollowingView;
