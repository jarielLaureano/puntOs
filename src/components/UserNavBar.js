import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getUserProfile, userMainUpdate } from '../actions';

class UserNavBar extends Component {

    componentWillMount() {
        this.props.getUserProfile(this.props.uid);
      }

    render() {
        return (
            <View>
                <View style={styles.viewStyle}>
                <View style={{ flex: 1, justifyContent: 'center'}} >
                <TouchableWithoutFeedback onPress={() => {
                  Actions.drawerOpen();
              }}>
                <Icon name='ios-menu' size= {30} color='#fff' style={{ alignSelf: 'flex-start', paddingLeft: 5 }} />
                </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 1, justifyContent: 'center'}} >
                  <Text style={[styles.textStyle, {alignSelf: 'center'} ]}>{this.props.user.points} P</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center'}} >
                  <Text style={[styles.textStyle, {alignSelf: 'flex-end', paddingRight:5} ]}>Lv.{this.props.user.level}</Text>
                </View>
                </View>
            </View>
        )
    }
}

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#0084b4',
        alignSelf: 'stretch',
        height: 55,
        paddingTop: 15
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    }
}

const mapStateToProps = state => {
  const { user, name, points, level, checkins, userProfileState, uid, openMenu } = state.userMain;
  //console.log(state.userMain);
  return { user, name, points, level, checkins, userProfileState, uid, openMenu };
};

export default connect(mapStateToProps, { getUserProfile, userMainUpdate })(UserNavBar);
