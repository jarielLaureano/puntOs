import React, { Component } from 'react';
import { View } from 'react-native';
import UserReviewList from './UserReviewList';

class UserReviewsView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UserReviewList />
      </View>
    );
  }
}

export default UserReviewsView;
