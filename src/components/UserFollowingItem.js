import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from './common';

class UserFollowingItem extends Component {

    renderIcon(image) {
        if (image) {
            return (
              <Image
              style={styles.iconStyle}
              source={{uri: image }}
              />
            );
        }
        else {
          return(
            <Image
            style={styles.iconStyle}
            source={require('../assets/no-user-image.gif')}
            />
          );
        }
    }

    render() {

        const { name, icon } = this.props.following;

        return (
            <Card>

                <View style={styles.itemContainer}>

                    <View>
                        {this.renderIcon(icon)}
                    </View>
                    <View style={{marginLeft: 15, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
                    </View>

                </View>

            </Card>
        );
    }
}

const styles = {
    iconStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        resizeMode: 'contain',
        borderColor: '#ababab',
    },
    itemContainer:{
        flex: 1,
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 5
      }
}

export default UserFollowingItem;
