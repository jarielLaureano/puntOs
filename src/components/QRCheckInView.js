/*
 * Default Android example
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Linking,
  LayoutAnimation,
  NavigatorIOS,
  Platform,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { businessMainUpdate, checkin, userMainUpdate } from '../actions';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from 'firebase';
import { Spinner } from './common';

class QRCheckInView extends Component {
  componentDidMount(){
    if(!this.props.cameraActive){
      this.props.userMainUpdate({ prop: 'cameraActive', value: true });
      Actions.refresh();
    }

  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onSuccess(e) {
    if(e.data){
      this.props.businessMainUpdate({ prop: 'uid', value: e.data}); //Deberia verificar si existe ese uid
      this.props.userMainUpdate({ prop: 'cameraActive', value: false });
      Actions.UserBusinessProfile();
      //this.props.checkin(this.props.user_id, e.data, this.props.user.name);
    }
  }
     

  renderContent() {
    if(this.props.cameraActive){
      return (
        <View style={{ flex: 1 }}>
            
            { Platform.OS === 'android' && <QRCodeScanner
            ref={ (node) => { this.scanner = node } }
            onRead={this.onSuccess.bind(this)}
            topContent = {(
                <Text style={styles.centerText}>Scan QR Code to Check-in</Text>
            )}
            bottomContent = {(
              <TouchableOpacity onPress={() => {
                this.scanner.reactivate();
              }}>
                <Text style={styles.textBold}> Scan </Text>
              </TouchableOpacity>
            )}
              />}

            { Platform.OS === 'ios' && <NavigatorIOS
              initialRoute={{
                component: QRCodeScanner,
                title: 'Scan Code',
                passProps: {
                  onRead: this.onSuccess.bind(this),
                  topContent: (
                    <Text style={styles.centerText}>Scan QR Code to Check-in</Text>
                  ),
                  bottomContent: (
                    <TouchableOpacity onPress={() => {
                      this.scanner.reactivate();
                    }}>
                      <Text style={styles.textBold}> Scan </Text>
                    </TouchableOpacity>
                  ),
                  containerStyle: {
                    marginTop: 64
                  },
                },
              }}
              style={{ flex: 1 }}
             />}
        </View>
      ); 
   }
   else {
     return (
      <View> 
        <Spinner size='large' />
      </View>
     );
   }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        {this.renderContent()}
      </View>
    );
  }
   
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    paddingBottom: 10, 
    paddingTop: 20,
    color: 'rgb(0,122,255)',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
    fontSize: 18
  }
});

const mapStateToProps = state => {
  const { user, cameraActive } = state.userMain;
  return {
    user,
    cameraActive
 };
};

export default connect(mapStateToProps,{ businessMainUpdate, checkin, userMainUpdate })(QRCheckInView);