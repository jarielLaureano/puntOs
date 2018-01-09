import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class UserPreScanner extends Component {

  render() {
    return (
      <View style={styles.backgroundStyle}>
      <Text style={styles.logoStyle}>
       puntOs
      </Text>
      <View style={styles.containerStyle}>
       <Icon name='ios-barcode-outline' size= {100} color='white' style={{ alignSelf: 'center' }}/>
       <Button onPress={() => Actions.QRCheckInView()} >Start Scanner</Button>
      </View>
      </View>
    );
  }
}

const styles = {
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#0084b4',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerStyle: {
    height: 300,
    backgroundColor: '#0084b4',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoStyle: {
    fontSize: 80,
    fontFamily: 'Futura',
    color: 'white',
    marginBottom: 50,
    paddingTop: 40
  },
  normalTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 30,
    color: 'white',
    fontWeight: 'normal',
    textAlign: 'justify'
  },
  topTextStyle: {
    fontSize: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    color: 'white',
    fontWeight: 'bold'
  }
}


export default UserPreScanner;