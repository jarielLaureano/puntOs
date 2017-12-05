import React, { Component } from 'react';
import { View, Text, Image, ScrollView, LayoutAnimation } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { InputLine, Button, Spinner } from './common';
import { businessFormUpdate, businessSignUp } from '../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class BusinessSignUpForm extends Component {
  componentWillUpdate() {
  LayoutAnimation.spring();
  }
  renderContent(){
    if (this.props.step === 1){
      return (
      <View style={styles.containerStyle}>
      <Text style={{ fontSize: 14,color: 'black', fontWeight: 'bold', paddingBottom: 10 }}>
      1 of 3
      </Text>
      <ProgressBar
      progress={0}
      width={300}
      color='#0084b4'
      />
      <Text style={{ fontSize: 20,color: 'black', fontWeight: 'bold', paddingTop: 30 }}>
      Credentials
      </Text>
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'businessName', value })}
        placeholder='Business Name'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.businessName}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'email', value })}
        placeholder='email@gmail.com'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.email}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'username', value })}
        placeholder='username'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.username}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'password', value })}
        secureTextEntry
        placeholder='password'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.password}
      />
      </View>
    );
    } else if (this.props.step === 2){
      return (
      <View style={styles.containerStyle}>
      <Text style={{ fontSize: 14,color: 'black', fontWeight: 'bold', paddingBottom: 10 }}>
      2 of 3
      </Text>
      <ProgressBar
      progress={0.33}
      width={300}
      color='#0084b4'
      />
      <Text style={{ fontSize: 20,color: 'black', fontWeight: 'bold', paddingTop: 30 }}>
      Contact Information
      </Text>
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'addressLine', value })}
        placeholder='AddressLine'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.addressLine}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'city', value })}
        placeholder='City'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.city}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'zipCode', value })}
        placeholder='Zipcode'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.zipCode}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'country', value })}
        placeholder='Country'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.country}
      />
      <InputLine
        onChangeText={value => this.props.businessFormUpdate({ prop: 'phoneNumber', value })}
        placeholder='Phone Number'
        placeholderTextColor='gray'
        selectionColor='#0084b4'
        overStyle={{ borderBottomColor: '#0084b4', color: '#0084b4' }}
        value={this.props.phoneNumber}
      />
      </View>
    );
    } else if (this.props.step === 3) {
      return (
      <View style={styles.containerStyle}>
      <Text style={{ fontSize: 14,color: 'black', fontWeight: 'bold', paddingBottom: 10 }}>
      3 of 3
      </Text>
      <ProgressBar
      progress={0.66}
      width={300}
      color='#0084b4'
      />
      <Text style={{ fontSize: 20,color: 'black', fontWeight: 'bold', paddingTop: 30 }}>
      Business Size
      </Text>
      </View>
    );
    }
  }

  onNextPress(){
    if (this.props.step === 1) {
      if (this.props.email != '' && this.props.password != '' && this.props.username != '' && this.props.businessName != ''){
        this.props.businessFormUpdate({ prop: 'step', value: 2})
        this.props.businessFormUpdate({ prop: 'error', value: ''})
      }
      else {
        this.props.businessFormUpdate({ prop: 'error', value: 'Missing Inputs' })
      }
    }
    else if (this.props.step === 2) {
      this.props.businessFormUpdate({ prop: 'step', value: 3 })
      this.props.businessFormUpdate({ prop: 'error', value: ''})
    }
    else {
      this.props.businessSignUp(this.props);
    }
  }

  onBackPress(){
    if (this.props.step === 2) {
        this.props.businessFormUpdate({ prop: 'step', value: 1})
        this.props.businessFormUpdate({ prop: 'error', value: ''})
    }
    if (this.props.step === 3) {
      this.props.businessFormUpdate({ prop: 'step', value: 2 })
      this.props.businessFormUpdate({ prop: 'error', value: ''})
    }
  }

  renderButtons(){
    if (this.props.loading){
      return (
        <Spinner size='large' />
      );} else if (this.props.step > 1) {
      return (  <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center'}}>
                  <Button onPress={this.onBackPress.bind(this)} overStyle={{ width: 150 }}>Back</Button>
                  <Button onPress={this.onNextPress.bind(this)} overStyle={{ width: 150 }}>Next</Button>
                </View>
            );
    }
    else {
      return (
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center'}}>
                  <Button disabled overStyle={{ backgroundColor: 'gray', borderColor: 'gray', width: 150 }}>Back</Button>
                  <Button onPress={this.onNextPress.bind(this)} overStyle={{ width: 150 }}>Next</Button>
                </View>
              );
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.backgroundStyle}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
          <Text style={styles.normalTextStyle}>
          Register your
          </Text>
          <Text style={styles.bigStyle}>
          Business
          </Text>
        </View>
      <View style={styles.containerStyle}>
          {this.renderContent()}
          {this.renderError()}
          {this.renderButtons()}
      </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#f97171'
  },
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  normalTextStyle: {
    fontSize: 20,
    color: 'black'
  },
bigStyle: {
  fontSize: 50,
  fontFamily: 'Futura',
  color: '#0084b4'
}
}

const mapStateToProps = state => {
  const {
    businessName,
    username,
    addressLine,
    city,
    country,
    zipCode,
    phoneNumber,
    email,
    password,
    gMaps,
    error,
    loading,
    step } = state.businessSignUp;
  return {
      businessName,
      username,
      addressLine,
      city,
      country,
      zipCode,
      phoneNumber,
      email,
      password,
      gMaps,
      error,
      loading,
      step };
};

export default connect(mapStateToProps, { businessFormUpdate, businessSignUp})(BusinessSignUpForm);
