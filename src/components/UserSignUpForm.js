import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { InputLine } from './common';
import { Button } from './common';
import { signUpUser, userSignUpUpdate } from './../actions';


class UserSignUpForm extends Component {
  render() {
    const { 
      containerStyle, 
      inputLineStyle,
      normalTextStyle,
      bigTextStyle,
      datePickerContainer,
      credentialsStyle
    } = styles;
    return (
      <View style={containerStyle}>

        
          <Text style={normalTextStyle}>Make your</Text>
          <Text style={bigTextStyle}>Account</Text>
         
          <Text style={credentialsStyle}> __________________ Credentials __________________ </Text>


          <InputLine
            placeholder='Name' 
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
          />
          <InputLine 
            placeholder='Email'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
          /> 
          <InputLine 
            secureTextEntry
            placeholder='Password'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
          />
          <InputLine 
            placeholder='Telephone'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
          />
          <InputLine 
            placeholder='Hometown' 
            placehlderTextColor='gray'
            overStyle={inputLineStyle}
          />
          <View style={datePickerContainer}>
            <Text style={{fontSize: 18, alignSelf: 'flex-start'}}>Birthdate</Text>
            <DatePicker 
              style={{width: 200, paddingLeft: 20 }}
              date = "2017-01-01"
              mode="date"
              placeholder="select date"
              androidMode='spinner'
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
            />
          </View>
          <View>
            <Button>Submit</Button>
          </View>
      </View>
    );
  }

  

}


const styles = {
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
  inputLineStyle: {
    borderBottomColor: '#0084b4', 
    color: '#0084b4'
  },
  normalTextStyle: {
    fontSize: 20,
    color: 'black'
  },
  bigTextStyle: {
    fontSize: 50,
    fontFamily: 'Futura',
    color: '#0084b4'
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'

  },
  credentialsStyle: {
    color: 'black',
    fontSize: 16,
    marginTop: 10
  }
}

const mapStateToProps = state => {
  const {
    name, 
    email,
    password,
    birthdate,
    hometown,
    telephone,
    loading,
    error,
    user,
    type
  } = state.userSignUp;

  return {
    name,
    email,
    password,
    birthdate,
    hometown,
    telephone,
    loading,
    error,
    user,
    type
  }
}

export default connect(mapStateToProps, {signUpUser, userSignUpUpdate})(UserSignUpForm);
