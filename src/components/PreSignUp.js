import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

class PreSignUp extends Component {
  render() {
    const { containerStyle, typeTextStyle, typeContainerStyle, thumbnailStyle } = styles;
    return (
      <View style={containerStyle}>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 60 }}>
            <Text style={{ flex: 1, fontSize: 18 }}>Please Select</Text>
            <Text style={{ flex: 1, fontSize: 25, fontWeight: 'bold' }}>Account Type</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 450}}>
            <TouchableWithoutFeedback onPress={() => Actions.userSignUp()}>
                <View style={typeContainerStyle}>
                  <Image
                  style={thumbnailStyle}
                  source={require('../assets/userImage.png')}
                  />
                  <Text style={typeTextStyle}>User</Text>
                </View>
            </TouchableWithoutFeedback>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Or</Text>
            <TouchableWithoutFeedback onPress={() => Actions.businessSignUp()}>
              <View style={typeContainerStyle}>
                <Image
                style={thumbnailStyle}
                source={require('../assets/pinImage.png')}
                />
                <Text style={typeTextStyle}>Business</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  typeContainerStyle: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  typeTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
  height: 200,
  width: 200,
  alignSelf: 'center',
  resizeMode: 'contain'
}

}

export default PreSignUp;
