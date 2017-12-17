import React, { Component } from 'react';
import { View, Text, Image, Slider, ScrollView, LayoutAnimation, Keyboard, TouchableWithoutFeedback,
TouchableHighlight, CameraRoll, Modal } from 'react-native';
import { InputBox, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { createCouponStateUpdate, createCoupon, businessMainUpdate } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { SegmentedControls } from 'react-native-radio-buttons';
import PhotoGrid from 'react-native-photo-grid';
import { Actions } from 'react-native-router-flux';

class CreateCoupon extends Component {

  constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);
}

  setSelected(key){
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
        onPress={()=> this.setSelected(item.id)}>
          <Image resizeMode = 'cover' style = {{ flex: 1 }} source = {{ uri: item.src }}  />
        </TouchableHighlight>
      );
    }
  //  })
}

modalContinue(option){
  this.props.createCouponStateUpdate({prop: 'coupon_media', value: this.props.photoSelected.src});
  //this.props.businessMainUpdate({prop: 'showPhotosCoupon', value: false});
  this.closeModal(option);

}

renderPhotosButtons(){
  const { photoSelectedKey, uploadLoading } = this.props;
 if (photoSelectedKey){
    return (
      <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
                  <Button onPress={() => {this.closeModal('cancel')}} overStyle={{ width: 150 }}>Cancel</Button>
                  <Button onPress={() => {this.modalContinue('selected')}} overStyle={{ width: 150 }}>Continue</Button>
      </View>
    );} else {
    return (
      <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
        <Button overStyle={{  width: 150 }} onPress={()=> this.closeModal('cancel')} >
        Cancel
        </Button>
        <Button disbaled overStyle={{ backgroundColor: 'gray', borderColor: 'gray', width: 150 }} >
        Continue
        </Button>
      </View>
          );
  }
}

  renderCamModal(){
    return (
      <Modal transparent={false} animationType={'slide'} visible={this.props.showPhotosCoupon}>
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
          {this.renderPhotosButtons()}
        </View>
      </Modal> );
  }

  openModal(){
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
        this.props.businessMainUpdate({prop: 'showPhotosCoupon', value: true});
        this.props.businessMainUpdate({prop: 'photos', value: photos});

    })
    .catch((err) => {
      console.log(err);
    });
  }

  closeModal(option){
    if(option === 'cancel'){
    this.props.businessMainUpdate({prop: 'showPhotosCoupon', value: false});
    this.props.businessMainUpdate({prop: 'showPhotosCoupon', value: false});
    this.props.businessMainUpdate({prop: 'photoSelected', value: null});
    this.props.businessMainUpdate({prop: 'photoSelectedKey', value: null});
  }
  else{
    this.props.businessMainUpdate({prop: 'showPhotosCoupon', value: false});
  }
  }

  onPress(){
    if (this.props.createCouponState.coupon_text === '' || this.props.createCouponState.coupon_title === '') {
      this.props.createCouponStateUpdate({ prop: 'error', value: 'Missing inputs'})
    }
    else{
    this.props.createCoupon(this.props.createCouponState, this.props.user.businessName,
      this.props.uid, this.props.user.category, this.props.user.image);
  }
  }

  renderButton(){
    if(this.props.createCouponState.loading){
      return (
        <Spinner size='large' />
      );
    }
    else {
      return <Button onPress={this.onPress.bind(this)} overStyle={{ width: 150, marginTop: 15, borderColor: '#fff', marginBottom: 10 }}>Create</Button>;
    }
  }

  changeCouponExpirationType(type_selected){
    //console.log(type_selected)
    if( type_selected === 'minutes'){
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration_type', value: type_selected})
      this.props.createCouponStateUpdate({ prop: 'expiration_max', value: 59 })
      this.props.createCouponStateUpdate({ prop: 'expiration_step', value: 10})
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration', value: 10})
    } else if( type_selected === 'hours'){
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration_type', value: type_selected})
      this.props.createCouponStateUpdate({ prop: 'expiration_max', value: 23 })
      this.props.createCouponStateUpdate({ prop: 'expiration_step', value: 1})
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration', value: 1})

    } else if( type_selected === 'days') {
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration_type', value: type_selected})
      this.props.createCouponStateUpdate({ prop: 'expiration_max', value: 30 }) //mx value
      this.props.createCouponStateUpdate({ prop: 'expiration_step', value: 1}) //time step
      this.props.createCouponStateUpdate({ prop: 'coupon_expiration', value: 1}) //min value
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
    if (this.props.createCouponState.error) {
      return (
          <Text style={styles.errorTextStyle}>
            {this.props.createCouponState.error}
          </Text>
      );
    }
  }

  renderImageAttachedText(){
    if(this.props.createCouponState.coupon_media){
      return(
        <Text style={{ alignSelf: 'flex-end', paddingLeft: 10, paddingBottom: 5 }}>Image Attached</Text>
      );
    }
  }

  render() {
    const { user, createCouponState } = this.props;
    options = ['minutes', 'hours', 'days'];
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.backgroundStyle}>
            <View style={{ flex: 5, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#000'}}>
                  <View style={{ flex: 8, justifyContent: 'center'}}>
                  {this.renderIcon(user.image)}
                  </View>
                  <View style={{ flex: 2 , flexDirection: 'column', justifyContent: 'center', marginTop: -30 }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{user.businessName}</Text>
                  </View>
            </View>
            <View style={{ flex: 12, justifyContent: 'center'}}>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: -10, marginTop: 10 }}>
                    {this.renderImageAttachedText()}
                  <View style={{ flex: 1, justifyContent: 'center'}}>
                    <TouchableWithoutFeedback onPress={()=> {this.openModal()}}>
                      <Icon name='ios-camera' size= {30} color='#299cc5' style={{ alignSelf: 'flex-end', paddingRight: 15 }} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View style={{ flex: 12, justifyContent: 'center'}}>
                  <View style={{ justifyContent: 'center' }}>
                    <InputBox
                      onChangeText={value => this.props.createCouponStateUpdate({ prop: 'coupon_title', value })}
                      multiline={false}
                      numberOfLines={1}
                      maxLength={25}
                      placeholderTextColor='gray'
                      placeholder='Coupon Title'
                      selectionColor='#0084b4'
                      onSelection={ this.changeCouponExpirationType.bind(this) }
                      overStyle={{ color: '#000', backgroundColor: '#fff', height: 30 }}
                      value={createCouponState.coupon_title}
                    />
                  </View>
                  <View style={{ flex: 5, justifyContent: 'center'}}>
                    <View style={{ height: 150, flexDirection: 'row' }}>
                      <InputBox
                        onChangeText={value => this.props.createCouponStateUpdate({ prop: 'coupon_text', value })}
                        multiline={true}
                        numberOfLines={5}
                        placeholderTextColor='gray'
                        placeholder='Promo Text'
                        selectionColor='#0084b4'
                        overStyle={{ color: '#000', backgroundColor: '#fff' }}
                        value={createCouponState.coupon_text}
                      />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                      <Text style={{ flex: 1, alignSelf: 'flex-start', paddingLeft: 5, fontSize: 15, fontWeight: 'bold' }}>Time to expire:</Text>
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                      <SegmentedControls
                        tint={'#299cc5'}
                        selectedTint= {'white'}
                        backTint= {'white'}
                        options={ options }
                        allowFontScaling={ false } // default: true
                        selectedOption={ createCouponState.coupon_expiration_type }
                        onSelection={ this.changeCouponExpirationType.bind(this) }
                        optionStyle={{ fontSize: 22 }}
                        optionContainerStyle={{ flex: 1 }}
                        containerStyle={{ borderRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 10, marginBottom: 10 }}
                      />
                      </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Slider maximumValue={createCouponState.expiration_max} minimumValue={createCouponState.expiration_step}
                        step={createCouponState.expiration_step} value={createCouponState.coupon_expiration}
                        style={{ marginRight: 5, marginLeft: 15, flex:5, alignSelf: 'flex-start' }} onValueChange={value => this.props.createCouponStateUpdate({ prop: 'coupon_expiration', value })}/>
                        <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'flex-end', justifyContent: 'center'}}>
                          <Text style={{ paddingRight: 5, alignSelf: 'center', fontSize: 20 }} >{createCouponState.coupon_expiration}</Text>
                          <Text style={{ paddingRight: 5, alignSelf: 'center' }}>{createCouponState.coupon_expiration_type}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                      <Text style={{ flex: 1, alignSelf: 'flex-start', paddingLeft: 5, fontSize: 15, fontWeight: 'bold' }}>Claim limit:</Text>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Slider maximumValue={100} step={10}  minimumValue={10} value={createCouponState.claim_limit}
                        style={{ marginRight: 5, marginLeft: 15, flex:5, alignSelf: 'flex-start' }} onValueChange={value => this.props.createCouponStateUpdate({ prop: 'claim_limit', value })}/>
                        <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'flex-end', justifyContent: 'center'}}>
                          <Text style={{ paddingRight: 5, alignSelf: 'center', fontSize: 20 }} >{createCouponState.claim_limit}</Text>
                          <Text style={{ paddingRight: 5, alignSelf: 'center' }}>claims</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                      <Text style={{ flex: 1, alignSelf: 'flex-start', paddingLeft: 5, fontSize: 15, fontWeight: 'bold' }}>Points value:</Text>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Slider maximumValue={1000} step={50} minimumValue={50} value={createCouponState.points_value}
                        style={{ marginRight: 5, marginLeft: 15, flex:5, alignSelf: 'flex-start' }} onValueChange={value => this.props.createCouponStateUpdate({ prop: 'points_value', value })}/>
                        <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'flex-end', justifyContent: 'center'}}>
                          <Text style={{ paddingRight: 5, alignSelf: 'center', fontSize: 20 }} >{createCouponState.points_value}</Text>
                          <Text style={{ paddingRight: 5, alignSelf: 'center' }}>points</Text>
                        </View>
                      </View>
                    </View>
                    {this.renderError()}
                    {this.renderButton()}
                  </View>
                </View>
                </ScrollView>
            </View>
            {this.renderCamModal()}
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
  const { createCouponState, user, uid, photos, photoSelectedKey, showPhotosCoupon, photoSelected } = state.businessMain;
  return { createCouponState, user, uid, photos, photoSelectedKey, showPhotosCoupon, photoSelected};
}

export default connect(mapStateToProps, { createCouponStateUpdate, createCoupon, businessMainUpdate })(CreateCoupon);
