import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableWithoutFeedback, Tabbar } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import { userProfileUpdate, getUserProfile, getCheckins } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import UserMainFilterHeader from './UserMainFilterHeader';
import UserReviewsView from './UserReviewsView';
import CheckinsView from './CheckinsView';

class UserProfile extends Component {

  componentWillMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.props.getCheckins(currentUser);
    this.props.getUserProfile(currentUser);
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  renderContent(){
    const { userProfileState } = this.props;
    if (userProfileState.tab_selected === 'Checkins'){
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <CheckinsView />
      </View>);
    } 
    else if(userProfileState.tab_selected === 'Reviews'){
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <UserReviewsView />
      </View>);
    }
  }

  renderTabs() {
    const { userProfileState } = this.props;
    var selectedStyle = { alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18 };
    var notSelectedStyle = { alignSelf: 'center', color: '#fff', fontSize: 15 };
    var checkin_tab = null;
    var review_tab = null;
    if (userProfileState.tab_selected === 'Checkins'){
      checkin_tab = selectedStyle;
      review_tab = notSelectedStyle;
    } 
    else if(userProfileState.tab_selected === 'Reviews'){
      checkin_tab = notSelectedStyle;
      review_tab = selectedStyle;
    }
    return(
    <View style={{ flex:1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 0.5, backgroundColor: '#299cc5' }}>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.userProfileUpdate({prop:'tab_selected', value: 'Checkins'})} style={checkin_tab} >Check-Ins</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.userProfileUpdate({prop:'tab_selected', value: 'Reviews'})} style={review_tab} >Reviews</Text>
    </View>
    </View>
  );
  }
  render() {
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex:4, borderBottomWidth: 0.5, borderColor: '#000', backgroundColor:'#fff' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center'}} >
            </View>
            <View style={{ flex: 1, justifyContent: 'center'}}>
            </View>
            </View>
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
  backgroundColor: '#e3e3e3'
},
tileStyle:{
  alignSelf: 'stretch',
  flex:1,
  borderColor:'#000',
  borderRadius: 5,
  borderWidth:1,
  marginTop: 2,
  marginLeft: 2,
  marginBottom: 2,
  marginRight: 2,
  paddingTop: 6,
  paddingLeft: 6,
  paddingRight: 4,
  paddingBottom: 4,
  backgroundColor:'#299cc5',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2
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
  const { user, name, points, level, checkins, userProfileState } = state.userMain;
  console.log(state.userMain);
  return { user, name, points, level, checkins, userProfileState };
};
export default connect(mapStateToProps,{ userProfileUpdate, getUserProfile, getCheckins })(UserProfile);