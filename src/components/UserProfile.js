import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableWithoutFeedback, Tabbar } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import { userProfileUpdate, getUserProfile, getCheckins, getFollowing } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import UserMainFilterHeader from './UserMainFilterHeader';
import UserReviewsView from './UserReviewsView';
import CheckinsView from './CheckinsView';
import UserFollowingView from './UserFollowingView';

class UserProfile extends Component {

  componentWillMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.props.getCheckins(currentUser);
    this.props.getUserProfile(currentUser);
    this.props.getFollowing(currentUser);
  }

  /*
  componentWillUpdate(){
    LayoutAnimation.spring();
  }
  */

  renderContent() {
    const { userProfileState } = this.props;
    if (userProfileState.tab_selected === 'Checkins') {
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <CheckinsView />
      </View>);
    }
    else if (userProfileState.tab_selected === 'Reviews') {
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <UserReviewsView />
      </View>);
    }
    else if (userProfileState.tab_selected === 'Following') {
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <UserFollowingView />
      </View>);
    }
  }

  renderTabs() {
    const { userProfileState } = this.props;

    var selectedStyle = { alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18 };
    var notSelectedStyle = { alignSelf: 'center', color: '#fff', fontSize: 15 };
    var selectedContainer = { borderBottomWidth: 5, borderColor: "#fff"};
    var notSelectedContainer = { borderBottomWidth: 5, borderColor: "#0084b4"};

    var checkin_tab = null;
    var review_tab = null;
    var following_tab = null;

    var checkin_cont = notSelectedContainer;
    var review_cont = notSelectedContainer;
    var following_cont = notSelectedContainer;

    if (userProfileState.tab_selected === 'Checkins'){
      checkin_tab = selectedStyle;
      checkin_cont = selectedContainer;
      review_tab = notSelectedStyle;
      review_cont = notSelectedContainer;
      following_tab = notSelectedStyle;
      following_cont = notSelectedContainer;
    }
    else if (userProfileState.tab_selected === 'Reviews'){
      review_tab = selectedStyle;
      review_cont = selectedContainer;
      checkin_tab = notSelectedStyle;
      checkin_cont= notSelectedContainer;
      following_tab = notSelectedStyle;
      following_cont = notSelectedContainer;
    }
    else if (userProfileState.tab_selected === 'Following'){
      review_tab = notSelectedStyle;
      review_cont = notSelectedContainer;
      checkin_tab = notSelectedStyle;
      checkin_cont= notSelectedContainer;
      following_tab = selectedStyle;
      following_cont = selectedContainer;
    }

    return(
    <View style={{ flex:1, flexDirection: 'row', backgroundColor: '#0084b4',
    shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 1 }}>
      <View style={[checkin_cont, {flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.userProfileUpdate({prop:'tab_selected', value: 'Checkins'})} style={checkin_tab} >Check-ins</Text>
      </View>
      <View style={[review_cont, {flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.userProfileUpdate({prop:'tab_selected', value: 'Reviews'})} style={review_tab} >Reviews</Text>
      </View>
      <View style={[following_cont, {flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.userProfileUpdate({prop:'tab_selected', value: 'Following'})} style={following_tab} >Follows</Text>
      </View>
    </View>
  );
  }

  render() {
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex:4, backgroundColor:'#fff' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 5, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{this.props.user.points}</Text>
              <Text style={{ alignSelf: 'center' }}>puntOs</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center'}}>
              <Image
              style={styles.thumbnailStyle}
              defaultSource={require('../assets/userImage.png')}
              />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{_.size(this.props.checkins)}</Text>
              <Text style={{ alignSelf: 'center'}}>Check-Ins</Text>
              </View>
            </View>
            <View style={{ flex: 3 , flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: 5 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{this.props.user.name}</Text>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <Text>Level {this.props.user.level}</Text>
            </View>
            </View>
          </View>
        </View>
          {this.renderTabs()}
          {this.renderContent()}
      </View>
    );
  }
}

const styles ={
backgroundStyle: {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: 20
},
textStyle:{
  fontSize: 25,
  color: '#fff'
},
thumbnailStyle: {
height: 100,
width: 100,
borderRadius: 5,
borderWidth: 1,
borderColor: 'black',
alignSelf: 'center',
resizeMode: 'contain'
}
}
const mapStateToProps = state => {
  const { user, name, points, level, checkins, userProfileState, following } = state.userMain;
  console.log(state.userMain);
  return { user, name, points, level, checkins, userProfileState, following };
};
export default connect(mapStateToProps,{ userProfileUpdate, getUserProfile, getCheckins, getFollowing })(UserProfile);
