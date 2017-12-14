import React, { Component } from 'react';
import { Card, CardSection } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserProfile extends Component {
    render() {
        return (
            <Card>

                <CardSection>
                    <View>
                        <View>
                        </View>

                        <View>
                        </View>

                        <View>
                        </View>
                    </View>
                </CardSection>

                <CardSection>
                    <View>
                        <Icon.Button name="compass" color="gray" backgroundColor="white">
                        </Icon.Button>

                        <Icon.Button name="trophy" color="gray" backgroundColor="white">
                        </Icon.Button>

                        <Icon.Button name="book" color="gray" backgroundColor="white">
                        </Icon.Button>
                    </View>
                </CardSection>

                <CardSection>
                </CardSection>

            </Card>
        );
    }
}

export default UserProfile;
