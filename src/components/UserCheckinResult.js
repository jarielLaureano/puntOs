import React, { Component } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { userMainUpdate } from '../actions';

class UserCheckinResult extends Component {
 

  componentWillUpdate(){
        LayoutAnimation.spring();
    }

  renderCheckinResult() {
      if(!this.props.checkinError){
          return (
            <View style={styles.backgroundStyle}>
            <Text style={styles.logoStyle}>
            puntOs
            </Text>
            <Text style={styles.topTextStyle}>
            Check-in Successful!
            </Text>
            <Text style={styles.normalTextStyle}>
            Please use continue button to complete check-in process.
            </Text>
            <View style={styles.containerStyle}>
            <Button onPress={() => { 
                this.props.userMainUpdate({ prop: 'checkinSuccessful', value: '' });
                this.props.userMainUpdate({ prop: 'checkinError', value: '' });
                Actions.UserBusinessProfile();
             }}>
             Continue
            </Button>
            </View>
            </View>
          );
      }
      else {
          return (
            <View style={styles.backgroundStyle}>
            <Text style={styles.logoStyle}>
            puntOs
            </Text>
            <Text style={styles.topTextStyle}>
            Check-in Failed!
            </Text>
            <Text style={styles.normalTextStyle}>
                {this.props.checkinError}
            </Text>
            <Text style={styles.tryAgainStyle}>
            </Text>
            <View style={styles.containerStyle}>
            <Button onPress={() => { 
                this.props.userMainUpdate({ prop: 'checkinSuccessful', value: '' });
                this.props.userMainUpdate({ prop: 'checkinError', value: '' });
                Actions.UserBusinessProfile();
            }} >
            Continue
            </Button>
            </View>
            </View>
          )
      }
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
            {this.renderCheckinResult()}
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
    paddingTop: 30
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
  },
  tryAgainStyle: {
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 30,
    color: 'red',
    fontWeight: 'normal',
    textAlign: 'justify'
  }
}

const mapStateToProps = state => {
    const { checkinSuccessful, checkinError, cameraActive } = state.userMain;
  
    return {
      checkinSuccessful, 
      checkinError,
      cameraActive
   };
  };


export default connect(mapStateToProps,{ userMainUpdate })(UserCheckinResult);