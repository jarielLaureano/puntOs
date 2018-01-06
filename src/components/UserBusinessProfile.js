import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableWithoutFeedback, Tabbar } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkin, businessProfileUpdate, getBusinessProfile, getReviews, getCheckins, getCoupons, getCheckinsToday, getCouponsToday, getPosts, postReviewChange } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ReviewList from './ReviewList';
import CouponsList from './CouponsList';
import PostList from './PostList';
import { Button, Spinner } from './common';
import firebase from 'firebase';
//import PopupDialog, { DialogTitle, SlideAnimation } from 'react-native-popup-dialog';


class UserBusinessProfile extends Component {


  componentWillMount(){

    var businessID = this.props.uid;
    this.props.getBusinessProfile(businessID);
    this.props.getCheckins(businessID);
    this.props.getCheckinsToday(businessID);
    this.props.getCoupons(businessID);
    this.props.getReviews(businessID);
    this.props.getCouponsToday(businessID);
    this.props.getPosts(businessID);
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  component
  renderContent(){
    const { businessProfileState } = this.props;
    if (businessProfileState.tab_selected === 'Promos'){
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <PostList />
    </View>);
    } else if( businessProfileState.tab_selected === 'Coupons'){
      return (
      <View style= {{ flex: 8, flexDirection: 'column' }}>
      <CouponsList />
      </View>);
    } else if(businessProfileState.tab_selected === 'Reviews'){
        return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <ReviewList />
        <Button
            overStyle={styles.reviewButtonOverStyle}
            onPress={() => {
                this.props.postReviewChange( {prop: "businessID", value: this.props.uid});
                Actions.PostReviewView()
            }}
        >
            Make Review
        </Button>
      </View>);
    }
  }



  renderIcon(image) {
          if (image) {
              return (
                <Image
                style={styles.thumbnailStyle}
                source={{uri: image }}
                />
              );
          }
          else {
            return(<Image
            style={styles.thumbnailStyle}
            source={require('../assets/no-user-image.gif')}
            />);
          }
      }
      renderTabs() {
        const { businessProfileState } = this.props;
        var selectedStyle = { alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18 };
        var notSelectedStyle = { alignSelf: 'center', color: '#fff', fontSize: 15 };
        var selectedContainer = { borderBottomWidth: 5, borderColor: "#fff"};
        var notSelectedContainer = { borderBottomWidth: 5, borderColor: "#0084b4"};

        var promo_tab = null;
        var coupon_tab = null;
        var review_tab = null;
        var promo_cont = notSelectedContainer;
        var coupon_cont = notSelectedContainer;
        var review_cont = notSelectedContainer;
        if (businessProfileState.tab_selected === 'Promos'){
          promo_tab = selectedStyle;
          promo_cont = selectedContainer;
          coupon_tab = notSelectedStyle;
          review_tab = notSelectedStyle;
        } else if( businessProfileState.tab_selected === 'Coupons'){
          promo_tab = notSelectedStyle;
          coupon_tab = selectedStyle;
          coupon_cont = selectedContainer;
          review_tab = notSelectedStyle;
        } else if(businessProfileState.tab_selected === 'Reviews'){
          promo_tab = notSelectedStyle;
          coupon_tab = notSelectedStyle;
          review_tab = selectedStyle;
          review_cont = selectedContainer;
        }
        return(
        <View style={{ flex:1, flexDirection: 'row', backgroundColor: '#0084b4',
        shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 1 }}>
        <View style={[coupon_cont,{flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Coupons'})} style={coupon_tab} >Coupons</Text>
        </View>
        <View style={[promo_cont, {flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Promos'})} style={promo_tab} >Promos</Text>
        </View>
        <View style={[review_cont, {flex: 1, justifyContent: 'center'}]}>
        <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Reviews'})} style={review_tab} >Reviews</Text>
        </View>
        </View>
      );
      }
  renderTheTabs() {
    const { businessProfileState } = this.props;
    var selectedStyle = { alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18 };
    var notSelectedStyle = { alignSelf: 'center', color: '#fff', fontSize: 15 };
    var promo_tab = null;
    var coupon_tab = null;
    var review_tab = null;
    if (businessProfileState.tab_selected === 'Promos'){
      promo_tab = selectedStyle;
      coupon_tab = notSelectedStyle;
      review_tab = notSelectedStyle;
    } else if( businessProfileState.tab_selected === 'Coupons'){
      promo_tab = notSelectedStyle;
      coupon_tab = selectedStyle;
      review_tab = notSelectedStyle;
    } else if(businessProfileState.tab_selected === 'Reviews'){
      promo_tab = notSelectedStyle;
      coupon_tab = notSelectedStyle;
      review_tab = selectedStyle;
    }
    return(
    <View style={{ flex:1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 0.5, backgroundColor: '#299cc5' }}>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Coupons'})} style={coupon_tab} >Coupons</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Promos'})} style={promo_tab} >Promos</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Reviews'})} style={review_tab} >Reviews</Text>
    </View>
    </View>
  );
  }


  callCheckin(){
    this.props.checkin(this.props.user_id, this.props.uid, this.props.username);
  }

  render() {
    const { user, coupon_count, checkin_count, scene, businessProfileState } = this.props;
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex:4, backgroundColor:'#fff' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center'}} >
            <Icon name='ios-arrow-back' size= {30} color='#0084b4' onPress={()=> Actions.pop()} style={{ alignSelf: 'flex-start', paddingLeft: 5 }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center'}}>
            <Icon name='ios-settings' size= {20} color='#0084b4' style={{ alignSelf: 'flex-end', paddingRight: 5 }} />
            </View>
            </View>
            <View style={{ flex: 5, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{coupon_count}</Text>
              <Text style={{ alignSelf: 'center' }}>coupons</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center'}}>
              {this.renderIcon(user.image)}
              </View>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{checkin_count}</Text>
              <Text style={{ alignSelf: 'center'}}>visits</Text>
              </View>
            </View>
            <View style={{ flex: 3 , flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: 5 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{user.businessName}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                <StarRating
                disabled={true}
                maxStars={5}
                rating={parseFloat(user.rating)}
                starSize={25}
                starColor={'#f2d733'}
                />
                <Text style={{ fontSize: 20, paddingLeft: 5 }}>{user.rating}</Text>
                <View style={{ alignSelf: 'flex-end', paddingLeft: 20, marginRight: 5 }}>
                  <TouchableOpacity onPress={() => {this.callCheckin()}}>
                  <Icon name='ios-navigate' size= {25} color='#0084b4' />
                  </TouchableOpacity>
                </View>
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
  backgroundColor: '#fff'
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
},
reviewButtonOverStyle: {
    marginTop: 5
},
reviewButtonContainer: {
    backgroundColor: '#0084b4',
    flex: 9,
    alignItems: 'center'
}
}
const mapStateToProps = state => {
  const {
      user,
      uid,
      metrics,
      scene,
      coupon_count,
      checkin_count,
      businessProfileState,
      isCouponClaim
    } = state.businessMain;
  const user_id = firebase.auth().currentUser.uid;
  const username  = state.userMain.user.name;
  const { checkin } = state.userMain;

  return {
    user_id,
    user,
    uid,
    metrics,
    scene,
    coupon_count,
    checkin_count,
    businessProfileState,
    isCouponClaim,
    username,
    checkin
 };
};
export default connect(mapStateToProps,{ checkin, businessProfileUpdate, getReviews,
   getCheckinsToday,
  getCoupons,
   getBusinessProfile,
  getCouponsToday,
   getCheckins,
  getPosts,
  postReviewChange
 })(UserBusinessProfile);
