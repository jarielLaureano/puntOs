import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { userMainUpdate, getUserProfile } from '../actions';
import UserSocialList from './UserSocialList';

class UserSocialFeed extends Component {
  componentWillMount(){
    currentUser = firebase.auth().currentUser.uid;
    this.props.getUserProfile(currentUser);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <UserSocialList />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, uid } = state.userMain;
  return { user, uid };
};

export default connect(mapStateToProps, { getUserProfile })(UserSocialFeed);
