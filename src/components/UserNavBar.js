import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions';

class UserNavBar extends Component {

    componentWillMount() {
        this.props.getUserProfile(this.props.uid);
      }

    render() {
        return (
            <View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>HB</Text>
                    <Text style={styles.textStyle}>{this.props.user.points} P</Text>
                    <Text style={styles.textStyle}>Lv. {this.props.user.level}</Text>
                </View>
                <View style={styles.lineSeparatorStyle}></View>
            </View>
        )
    }
}

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#00b0f0',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        paddingTop: 20
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    lineSeparatorStyle: {
        backgroundColor: 'white',
        height: 2,
        shadowColor: 'white',
    },
}

const mapStateToProps = state => {
  const { user, name, points, level, checkins, userProfileState, uid } = state.userMain;
  console.log(state.userMain);
  return { user, name, points, level, checkins, userProfileState, uid };
};

export default connect(mapStateToProps, { getUserProfile })(UserNavBar);
