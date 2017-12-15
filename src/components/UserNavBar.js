import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions, Router, Scene } from 'react-native-router-flux';

class UserNavBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>HB</Text>
                    <Text style={styles.textStyle}>10,000 P</Text>
                    <Text style={styles.textStyle}>Lv.14</Text>
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
        height: 30,
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

export default UserNavBar;