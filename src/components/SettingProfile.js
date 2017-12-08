import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Spinner } from './common';
import { settingProfileUpdate, getProfile, logoutUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class SettingProfile extends Component {
  componentWillMount() {
    this.props.getProfile(this.props.uid);
  }

  renderButton(){
    if(this.props.error != ''){
      return (<View style={styles.containerStyle}>
      <Button onPress={() => {
        Actions.login({ type: 'reset' })
        this.props.logoutUser();
      }
      } >Back to Login</Button>
      </View>);
    }

  }

  renderProgress(){
    if(this.props.loading){
      return (
        <View style={styles.containerStyle}>
        <Text style={styles.normalTextStyle}>
        Gathering your profile information.
        </Text>
        <Spinner />
        </View>
      );
    }
  }

  renderError(){
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.normalTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
  }
}

  render() {
    return (
      <View style={styles.backgroundStyle}>
      <Text style={styles.logoStyle}>
      puntOs
      </Text>
      {this.renderError()}
      {this.renderProgress()}
      {this.renderButton()}
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
  }
}
const mapStateToProps = state => {
  const {
    user,
    uid,
    loading,
    error} = state.profileSet;
  return {
    user,
    uid,
    loading,
    error
  };
};

export default connect(mapStateToProps, {settingProfileUpdate, getProfile, logoutUser})(SettingProfile);
