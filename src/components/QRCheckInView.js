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
  View
} from 'react-native';
import { connect } from 'react-redux';
import { businessMainUpdate, checkin, userMainUpdate } from '../actions';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from 'firebase';

class QRCheckInView extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onSuccess(e) {
    if(e.data){
      this.props.businessMainUpdate({ prop: 'uid', value: e.data}); //Deberia verificar si existe ese uid
      this.props.userMainUpdate({ prop: 'checkin', value: true });
      Actions.UserBusinessProfile();
      //this.props.checkin(this.props.user_id, e.data, this.props.user.name);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <QRCodeScanner
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    paddingBottom: 10, 
    paddingTop: 30,
    color: 'rgb(0,122,255)',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
    fontSize: 18
  }
});

const mapStateToProps = state => {
  const user_id = firebase.auth().currentUser.uid;
  const { user } = state.userMain;
  return {
    user_id,
    user
 };
};

export default connect(mapStateToProps,{ businessMainUpdate, checkin, userMainUpdate })(QRCheckInView);