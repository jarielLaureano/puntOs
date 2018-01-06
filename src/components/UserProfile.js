import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableWithoutFeedback, Tabbar, ScrollView, CameraRoll, Alert, Modal, TouchableHighlight } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import { userProfileUpdate, getUserProfile, getCheckins, updateUserProfilePic, userMainUpdate } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import UserMainFilterHeader from './UserMainFilterHeader';
import UserReviewsView from './UserReviewsView';
import CheckinsView from './CheckinsView';
import PhotoGrid from 'react-native-photo-grid';
import { Button, Spinner } from './common'

class UserProfile extends Component {
  constructor(props){
    super();
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.props.getCheckins(currentUser);
    this.props.getUserProfile(currentUser);
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }


  setSelected(key){
    this.props.userMainUpdate({prop: 'photoSelectedKey', value: key});
    this.props.userMainUpdate({prop: 'photoSelected', value: this.props.photos[key-1]});
  }

  renderItem(item, itemSize){
//    this.props.photos.map((photo, key) => {
  if(item){
      return (
        <TouchableHighlight
        style={{opacity: item.id === this.props.photoSelectedKey ? 0.5 : 1, width: itemSize, height: itemSize}}
        key={item.id}
        underlayColor='transparent'
        onPress={()=> this.setSelected(item.id)}>
          <Image resizeMode = 'cover' style = {{ flex: 1 }} source = {{ uri: item.src }}  />
        </TouchableHighlight>
      );
    }
  //  })
}

  modalContinueMain(){
    this.props.updateUserProfilePic(this.props.photoSelected.src, this.props.uid);
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
    var selectedContainer = { borderBottomWidth: 5, borderColor: "#fff"};
    var notSelectedContainer = { borderBottomWidth: 5, borderColor: "#0084b4"};

    var checkin_tab = null;
    var review_tab = null;
    var checkin_cont = notSelectedContainer;
    var review_cont = notSelectedContainer;
    if (userProfileState.tab_selected === 'Checkins'){
      checkin_tab = selectedStyle;
      checkin_cont = selectedContainer;
      review_tab = notSelectedStyle;
      review_cont = notSelectedContainer;
    } else if( userProfileState.tab_selected === 'Reviews'){
      review_tab = selectedStyle;
      review_cont = selectedContainer;
      checkin_tab = notSelectedStyle;
      checkin_cont= notSelectedContainer;
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
    </View>
  );
  }

  render() {
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex:4, backgroundColor:'#fff' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {this.renderPhotosModal()}
            <View style={{ flex: 5, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{this.props.user.points}</Text>
              <Text style={{ alignSelf: 'center' }}>puntOs</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center'}}>
                {this.renderIcon(this.props.user.image)}
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

  renderPhotosModal(){
    return (
      <Modal transparent={false} animationType={'slide'} visible={this.props.showPhotos} onRequestClose={ () => {}}>
        <View style={{ flex:1, paddingTop: 20, flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{fontSize: 20, color: '#000', paddingBottom:10}}>Camera Roll</Text>
          <ScrollView style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            <PhotoGrid
                data = { this.props.photos }
                itemsPerRow = { 3 }
                itemMargin = { 1 }
                renderItem = {this.renderItem}
            />
          </ScrollView>
          {this.renderButtonsMain()}
        </View>
      </Modal> );
  }

  openModalMain(){
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'All'
    })
    .then(response => {
        var paths = response.edges;
        var photos = [];
        photos = paths.map((photo , key) => {
          return { id: key+1, src: photo.node.image.uri }
        });
        this.props.userMainUpdate({prop: 'showPhotos', value: true});
        this.props.userMainUpdate({prop: 'photos', value: photos});

    })
    .catch((err) => {
      console.log(err);
    });
  }

  closeModalMain(){
    this.props.userMainUpdate({prop: 'showPhotos', value: false});
    this.props.userMainUpdate({prop: 'photoSelected', value: null});
    this.props.userMainUpdate({prop: 'photoSelectedKey', value: null});
  }

  renderButtonsMain(){
    const { photoSelectedKey, uploadLoading } = this.props;
    if(uploadLoading){
      return (
        <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
        <Spinner />
        </View>
      );
    }
    else if (photoSelectedKey){
      return (
        <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
                    <Button onPress={()=> this.closeModalMain()} overStyle={{ width: 150 }}>Cancel</Button>
                    <Button onPress={()=> this.modalContinueMain()} overStyle={{ width: 150 }}>Continue</Button>
        </View>
      );} else {
      return (
        <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
          <Button overStyle={{  width: 150 }} onPress={()=> this.closeModalMain()} >
          Cancel
          </Button>
          <Button disbaled overStyle={{ backgroundColor: 'gray', borderColor: 'gray', width: 150 }} >
          Continue
          </Button>
        </View>
            );
    }
  }

  renderIcon(image) {
    if (image) {
        return (
          <TouchableWithoutFeedback onPress={() => {this.openModalMain()}} >
          <Image
          style={styles.thumbnailStyle}
          source={{uri: image }}
          />
          </TouchableWithoutFeedback>
        );
    }
    else {
      return(
      <TouchableWithoutFeedback onPress={() => {this.openModalMain()}} >
      <Image
      style={styles.thumbnailStyle}
      source={require('../assets/no-user-image.gif')}
      />
      </TouchableWithoutFeedback>);
    }
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
  const { user, name, uid, points, level, checkins, userProfileState, photos, photoSelected, photoSelectedKey, showPhotos, uploadLoading, uploadError } = state.userMain;
  return { user, name, uid, points, level, checkins, userProfileState, photos, photoSelected, photoSelectedKey, showPhotos, uploadLoading, uploadError };
};
export default connect(mapStateToProps,{ userProfileUpdate, getUserProfile, getCheckins, updateUserProfilePic, userMainUpdate })(UserProfile);
