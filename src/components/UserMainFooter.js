import React, {Component} from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class UserMainFooter extends Component {

    render () {
        const { viewStyle, checkInStyle } = styles;

        return (
            <View style={viewStyle}>
                <Icon.Button name="glass" color="gray" backgroundColor="white">
                </Icon.Button>

                <Icon.Button name="users" color="gray" backgroundColor="white">
                </Icon.Button>

                <Icon.Button name="compass" color="#0084b4" backgroundColor="white">
                </Icon.Button>


                <Icon.Button name="bell" color="gray" backgroundColor="white">
                </Icon.Button>

                <Icon.Button name="user" color="gray" backgroundColor="white">
                </Icon.Button>
            </View>
        );
    };
}

const styles = {
    viewStyle: {
        backgroundColor: 'white',
        borderTopColor: '#ababab',
        borderTopWidth: 2,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    checkInStyle: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: '#ababab',
        borderWidth: 2
    }
};

export default UserMainFooter;
