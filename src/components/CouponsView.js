import React, { Component } from 'react';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import { InputLine } from './common';
import CouponsList from './CouponsList';
import { Actions } from 'react-native-router-flux';

class CouponsView extends Component {
  componentWillUpdate() {
  LayoutAnimation.spring();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CouponsList />
      </View>
    );
  }
}

export default CouponsView;
