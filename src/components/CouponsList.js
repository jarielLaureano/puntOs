import React, { Component } from 'react';
import { ListView, FlatList } from 'react-native';
import PostItem from './PostItem';
import { getCoupons } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';

class CouponsList extends Component {
  componentWillMount() {
    this.props.getCoupons(this.props.uid);
  }

  render() {
    return (
      <FlatList
        data={this.props.coupons}
        renderItem={({item}) => <PostItem item={item} />}
      />
    );
  }
}
const mapStateToProps = state => {
  var { uid } = state.businessMain;
  const coupons = _.map(state.businessMain.coupons, (val, key) => {
    return {...val, key};
  });
  return { uid, coupons };
}

export default connect(mapStateToProps, { getCoupons })(CouponsList);
