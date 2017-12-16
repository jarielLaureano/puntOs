import React, { Component } from 'react';
import { View, Text, Image, Slider, ScrollView, LayoutAnimation, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { InputBox, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { createCouponStateUpdate, createCoupon } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { SegmentedControls } from 'react-native-radio-buttons'
import { Actions } from 'react-native-router-flux';

class CreateCoupon extends Component {
  componentWillUpdate(){
    LayoutAnimation.spring();
  }
  onPress(){
    if (this.props.createCouponState.coupon_text === '' || this.props.createCouponState.coupon_title === '') {
      this.props.createCouponStateUpdate({ prop: 'error', value: 'Missing inputs'})
    }
    else{
    this.props.createCoupon(this.props.createCouponState, this.props.user.businessName, this.props.uid, this.props.user.category);
  }
  }

  renderButton(){
    if(this.props.createCouponState.loading){
      return (
        <Spinner size='large' />
      );
    }
    else {
      return <Button onPress={this.onPress.bind(this)} overStyle={{ width: 150, marginTop: 15, borderColor: '#fff' }}>Create</Button>;
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
                  <View style={{ flex: 1, justifyContent: 'center'}}>
                    <Icon name='ios-camera' size= {25} color='#299cc5' style={{ alignSelf: 'flex-end', paddingRight: 15 }} />
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
  const { createCouponState, user, uid } = state.businessMain;
  return { createCouponState, user, uid};
}

export default connect(mapStateToProps, { createCouponStateUpdate, createCoupon })(CreateCoupon);
