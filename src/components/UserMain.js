import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { userMainUpdate, getUserProfile } from '../actions';
import UserPromoList from './UserPromoList';
import UserMainFilterHeader from './UserMainFilterHeader';
import PostFeed from './PostFeed';
import UserMainFooter from './UserMainFooter';
import CheckinsView from './CheckinsView';
import UserReviewsView from './UserReviewsView';
import UserProfile from './UserProfile';
import { Actions }  from 'react-native-router-flux';
import { Button, Spinner } from './common';

class UserMain extends Component {
  componentWillMount(){
    currentUser = firebase.auth().currentUser.uid;
    this.props.getUserProfile(currentUser);

    
    this.props.userMainUpdate({ prop: 'loading', value: true});
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler );
    this.props.userMainUpdate({ prop: 'loading', value: false });
  }

  backHandler () {
    return true;
  }
  

  render() {
    if(this.props.loading){
      return(
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
         <Spinner size="large" />
      </View>
      );
    }
    else{
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <UserPromoList />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const { user, uid, loading } = state.userMain;
  return { user, uid, loading };
};

export default connect(mapStateToProps, { getUserProfile, userMainUpdate })(UserMain);
