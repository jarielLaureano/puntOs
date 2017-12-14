import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { userMainUpdate, getUserProfile } from '../actions';
import UserMainFilterHeader from './UserMainFilterHeader';
import PostFeed from './PostFeed';
import UserMainFooter from './UserMainFooter';
import CheckinsView from './CheckinsView';

class UserMain extends Component {
  componentWillMount(){
    this.props.getUserProfile(this.props.uid);
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <UserMainFilterHeader />
        <CheckinsView />
        <UserMainFooter />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, loading, error, checkins, coupons } = state.userMain;
  return {  };
};

export default connect(mapStateToProps, { userMainUpdate, getUserProfile })(UserMain);
