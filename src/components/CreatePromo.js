import React, { Component } from 'react';
import { View, Text, Image, Keyboard, TouchableWithoutFeedback, CameraRoll, Modal, ScrollView, TouchableHighlight } from 'react-native';
import { InputBox, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { createPromoStateUpdate, createPromo, businessMainUpdate } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import PhotoGrid from 'react-native-photo-grid';
import { Actions } from 'react-native-router-flux';

class CreatePromo extends Component {

constructor(props){
      super(props);
      this.renderItem = this.renderItem.bind(this);
  }

  setSelectedPromo(key){
    this.props.businessMainUpdate({prop: 'photoSelectedKey', value: key});
    this.props.businessMainUpdate({prop: 'photoSelected', value: this.props.photos[key-1]});
  }

  renderItem(item, itemSize){
  //    this.props.photos.map((photo, key) => {
    if(item){
        return (
          <TouchableHighlight
          style={{opacity: item.id === this.props.photoSelectedKey ? 0.5 : 1, width: itemSize, height: itemSize}}
          key={item.id}
          underlayColor='transparent'
          onPress={()=> this.setSelectedPromo(item.id)}>
            <Image resizeMode = 'cover' style = {{ flex: 1 }} source = {{ uri: item.src }}  />
          </TouchableHighlight>
        );
      }
    //  })
  }

  modalContinuePromo(option){
    this.props.createPromoStateUpdate({prop: 'promo_media', value: this.props.photoSelected.src});
    //this.props.businessMainUpdate({prop: 'showPhotosPromo', value: false});
    this.closeModalPromo(option);

  }

  renderModalButtons(){
    const { photoSelectedKey, uploadLoading } = this.props;
   if (photoSelectedKey){
      return (
        <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
                    <Button onPress={() => {this.closeModalPromo('cancel')}} overStyle={{ width: 150 }}>Cancel</Button>
                    <Button onPress={() => {this.modalContinuePromo('selected')}} overStyle={{ width: 150 }}>Continue</Button>
        </View>
      );} else {
      return (
        <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
          <Button overStyle={{  width: 150 }} onPress={()=> this.closeModalPromo('cancel')} >
          Cancel
          </Button>
          <Button disbaled overStyle={{ backgroundColor: 'gray', borderColor: 'gray', width: 150 }} >
          Continue
          </Button>
        </View>
            );
    }
  }

    renderModal(){
      return (
        <Modal transparent={false} animationType={'slide'} visible={this.props.showPhotosPromo}>
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
            {this.renderModalButtons()}
          </View>
        </Modal> );
    }

    openModalPromo(){
      CameraRoll.getPhotos({
          first: 20,
          assetType: 'All',
      })
      .then(response => {
          var paths = response.edges;
          var photos = [];
          photos = paths.map((photo , key) => {
            return { id: key+1, src: photo.node.image.uri }
          });
          this.props.businessMainUpdate({prop: 'showPhotosPromo', value: true});
          this.props.businessMainUpdate({prop: 'photos', value: photos});

      })
      .catch((err) => {
        console.log(err);
      });
    }

    closeModalPromo(option){
      if(option === 'cancel'){
      this.props.businessMainUpdate({prop: 'showPhotosPromo', value: false});
      this.props.businessMainUpdate({prop: 'showPhotosPromo', value: false});
      this.props.businessMainUpdate({prop: 'photoSelected', value: null});
      this.props.businessMainUpdate({prop: 'photoSelectedKey', value: null});
    }
    else{
      this.props.businessMainUpdate({prop: 'showPhotosPromo', value: false});
    }
    }

    renderImageAttachedText(){
      if(this.createPromoState.promo_media){
        return(
          <Text style={{ alignSelf: 'flex-end', paddingLeft: 10, paddingBottom: 5 }}>Image Attached</Text>
        );
      }
    }

  onPress(){
    if (this.props.createPromoState.promo_text === ''){
      this.props.createPromoStateUpdate({ prop: 'error', value: 'Missing inputs'})
    }else {
    this.props.createPromo(this.props.createPromoState.promo_text,
      this.props.createPromoState.promo_media, this.props.user.businessName, this.props.uid, this.props.user.category, this.props.user.image);
}
  }

  renderButton(){
    if(this.props.createPromoState.loading){
      return (
        <Spinner size='large' />
      );
    }
    else {
      return <Button onPress={this.onPress.bind(this)} overStyle={{ width: 150, marginTop: 15, borderColor: '#fff', marginBottom: 10 }}>Post</Button>;
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

  renderError() {
    if (this.props.createPromoState.error) {
      return (
          <Text style={styles.errorTextStyle}>
            {this.props.createPromoState.error}
          </Text>
      );
    }
  }

  renderImageAttachedText(){
    if(this.props.createPromoState.promo_media){
      return(
        <Text style={{ alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 5 }}>Image Attached</Text>
      );
    }
  }

  render() {
    const { user, createPromoState } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.backgroundStyle}>
            {this.renderModal()}
        <View style={{ flex: 5, justifyContent: 'center'}}>
              <View style={{ flex: 8, justifyContent: 'center'}}>
              {this.renderIcon(user.image)}
              </View>
              <View style={{ flex: 2 , flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: -30 }}>
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{user.businessName}</Text>
              </View>
        </View>
        <View style={{ flex: 9, justifyContent: 'center'}}>
        <View style={{ flex: 5, justifyContent: 'center'}}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center'}} >
          <Text style={{ paddingLeft: 5, fontSize: 18, alignSelf:'flex-start' }}>Whats your promo?</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={()=> {this.renderModal();this.openModalPromo()}}>
            <Icon name='ios-camera' size= {25} color='#299cc5' style={{ alignSelf: 'flex-end', paddingRight: 15 }} />
          </TouchableWithoutFeedback>
        </View>
        </View>
        <View style={{ flex: 8, justifyContent: 'center'}}>
        <InputBox
          onChangeText={value => this.props.createPromoStateUpdate({ prop: 'promo_text', value })}
          numberOfLines={5}
          maxLength={150}
          multiline
          placeholderTextColor='gray'
          placeholder='Promo Text'
          selectionColor='#0084b4'
          overStyle={{ color: '#000', backgroundColor: '#fff' }}
          value={createPromoState.promo_text}
        />
        {this.renderImageAttachedText()}
        {this.renderError()}
        {this.renderButton()}
        </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'center'}}>
        </View>
        </View>
        </View>
        </TouchableWithoutFeedback>
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
errorTextStyle: {
  fontSize: 20,
  alignSelf: 'center',
  color: '#f97171'
}
}

const mapStateToProps = state => {
  const { createPromoState, user, uid, photos, photoSelectedKey, showPhotosPromo, photoSelected } = state.businessMain;
  return { createPromoState, user, uid, photos, photoSelectedKey, showPhotosPromo, photoSelected};
}

export default connect(mapStateToProps, { createPromoStateUpdate, createPromo, businessMainUpdate })(CreatePromo);
