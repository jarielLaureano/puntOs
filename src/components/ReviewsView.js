import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputLine } from './common';
import ReviewItem from './ReviewItem';
import ReviewList from './ReviewList';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class ReviewsView extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ReviewList />
      </View>
    );
  }
}

export default ReviewsView;
