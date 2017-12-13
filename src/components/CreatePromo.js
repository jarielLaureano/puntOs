import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputBox, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { createPromoStateUpdate, createPromo } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

class CreatePromo extends Component {

  onPress(){
    this.props.createPromo(this.props.createPromoState.promo_text, this.props.createPromoState.promo_media, this.props.user.businessName, this.props.uid);
  }

  renderButton(){
    if(this.props.createPromoState.loading){
      return (
        <Spinner size='large' />
      );
    }
    else {
      return <Button onPress={this.onPress.bind(this)} overStyle={{ width: 150, marginTop: 15, borderColor: '#fff' }}>Post</Button>;
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
  render() {
    const { user, createPromoState } = this.props;
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex: 5, justifyContent: 'center'}}>
              <View style={{ flex: 8, justifyContent: 'center'}}>
              <Image
              style={styles.thumbnailStyle}
              source={{uri: user.image }}
              defaultSource={require('../assets/no-user-image.gif')}
              />
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
          <Icon name='ios-camera' size= {30} color='#299cc5' style={{ alignSelf: 'flex-end', paddingRight: 15 }} />
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
        {this.renderError()}
        {this.renderButton()}
        </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'center'}}>
        </View>
        </View>
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
errorTextStyle: {
  fontSize: 20,
  alignSelf: 'center',
  color: '#f97171'
}
}

const mapStateToProps = state => {
  const { createPromoState, user, uid } = state.businessMain;
  return { createPromoState, user, uid};
}

export default connect(mapStateToProps, { createPromoStateUpdate, createPromo })(CreatePromo);
