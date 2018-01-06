import React, { Component } from 'react';
import { View, Text, Image, LayoutAnimation, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import { InputLine, Button, Spinner } from './common';
import { signUpUser, userSignUpUpdate } from './../actions';
import { 
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  HOMETOWN_REGEX
 } from './../constants';


class UserSignUpForm extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  render() {
    const { 
      containerStyle, 
      inputLineStyle,
      normalTextStyle,
      bigTextStyle,
      datePickerContainer,
      credentialsStyle,
      celphoneTextStyle
    } = styles;
    const {
      name, 
      email,
      password,
      repassword,
      birthdate,
      hometown,
      telephone,
      loading,
      error,
      user,
      type,
      userSignUpUpdate,
      userSignUp
    } = this.props;

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={containerStyle}>

        
          <Text style={normalTextStyle}>Make your</Text>
          <Text style={bigTextStyle}>Account</Text>
         
          <Text style={credentialsStyle}> __________________ Credentials __________________ </Text>


          <InputLine
            onChangeText={value => userSignUpUpdate({ prop: 'name', value })}
            maxLength={70}
            placeholder='Full Name' 
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
            value={name}
          />
          <InputLine 
            onChangeText={value => userSignUpUpdate({ prop: 'email', value })}
            placeholder='john.doe@gmail.com'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
            value={email}
          /> 
          <InputLine 
            secureTextEntry
            onChangeText={value => userSignUpUpdate({ prop: 'password', value })}
            placeholder='Password'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
            value={password}
          />
           <InputLine 
            secureTextEntry
            onChangeText={value => userSignUpUpdate({ prop: 'repassword', value })}
            placeholder='Re-type Password'
            placeholderTextColor='gray'
            overStyle={inputLineStyle}
            value={repassword}
          />
          <TextInputMask 
            onChangeText={value => userSignUpUpdate({ prop: 'telephone', value })}
            placeholder='Telephone'
            placeholderTextColor='gray'
            style={celphoneTextStyle}
            value={telephone}
            mask={"([000]) [000] [0000]"}
          />
          <InputLine 
            onChangeText={value => userSignUpUpdate({ prop: 'hometown', value })}
            placeholder='Hometown' 
            placehlderTextColor='gray'
            overStyle={inputLineStyle}
            value={hometown}
          />
          <View style={datePickerContainer}>
            <Text style={{fontSize: 18, alignSelf: 'flex-start'}}>Birthdate</Text>
            <DatePicker 
              onDateChange={value => userSignUpUpdate({ prop: 'birthdate', value })}
              style={{width: 200, paddingLeft: 20 }}
              mode="date"
              placeholder="select date"
              androidMode='spinner'
              format="YYYY-MM-DD"
              minDate="1918-01-01"
              maxDate="2000-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={birthdate}
            />
          </View>
          {this.renderError()}
          {this.renderFooter()}
      </View>
      </ScrollView>
    );
  }

  renderFooter() {
    if(this.props.loading){
      return (
        <View>
          <Spinner size='large' />
        </View>
      );
    } else {
      return (
        <View>
          <Button onPress={this.SubmitForm.bind(this)}>Submit</Button>
        </View>
      );
    }
  }

  renderError () {
    if(this.props.error){
       return (
        <Text style={styles.errorMessageStyle}>{this.props.error}</Text>
       );
    }
  }

  passwordMatch () {
    return this.props.password === this.props.repassword;
  }
  SubmitForm(){

    const {
      name,
      email,
      password,
      repassword,
      telephone,
      hometown,
      birthdate,
      points,
      type,
      level
    } = this.props

    if(name&&email&&password&&telephone&&hometown&&birthdate&&repassword){
       if(EMAIL_REGEX.test(email)){
         if(NAME_REGEX.test(name)){
            if(PHONE_REGEX.test(telephone)){
              if(PASSWORD_REGEX.test(password)){
                   if(HOMETOWN_REGEX.test(hometown)){
                       if(this.passwordMatch()){
                         this.props.signUpUser({name,email,password,telephone,hometown,birthdate,type,points,level});
                       }
                       this.props.userSignUpUpdate({ prop: 'error', value: 'Not Matching Password' });
                       this.props.userSignUpUpdate({ prop: 'password', value: ''});
                       this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
                   }
                   else{
                    this.props.userSignUpUpdate({ prop: 'error', value: 'Not Valid Hometown' });
                    this.props.userSignUpUpdate({ prop: 'password', value: ''});
                    this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
                   }
              }
              else{
                this.props.userSignUpUpdate({ prop: 'error', value: 'Password Must Contain At Least:\n 1 Number\n 1 Special Character' });
                this.props.userSignUpUpdate({ prop: 'password', value: ''});
                this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
              }
            }
            else {
              this.props.userSignUpUpdate({ prop: 'error', value: 'Not Valid Phone' });
              this.props.userSignUpUpdate({ prop: 'password', value: ''});
              this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
            }
         }
         else {
          this.props.userSignUpUpdate({ prop: 'error', value: 'Not Valid Name' });
          this.props.userSignUpUpdate({ prop: 'password', value: ''});
          this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
         }
      }
      else {
        this.props.userSignUpUpdate({ prop: 'error', value: 'Not Valid Email' });
        this.props.userSignUpUpdate({ prop: 'password', value: ''});
        this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
      }
    }
    else{
      this.props.userSignUpUpdate({ prop: 'error', value: 'Missing Fields' });
      this.props.userSignUpUpdate({ prop: 'password', value: ''});
      this.props.userSignUpUpdate({ prop: 'repassword', value: ''});
    }
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
  },
  errorMessageStyle: {
    color: 'red',
    fontSize: 20,
    marginTop: 15
  },
  celphoneTextStyle: {
    borderBottomColor: '#0084b4', 
    color: '#0084b4',
    fontSize: 18,
    borderBottomWidth: 1,
    width: 330,
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
    type,
    points,
    level,
    repassword,
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
    type,
    points,
    level,
    repassword
  }
}

export default connect(mapStateToProps, { signUpUser, userSignUpUpdate })(UserSignUpForm);
