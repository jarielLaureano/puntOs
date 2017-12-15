import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class CheckinItem extends Component {
    render() {
        const { name, businessID } = this.props.checkin;

        return (
            <Card>
                <CardSection>
                    <Text>{name} was in {businessID}.</Text>
                </CardSection>

                <CardSection>
                    <Text>Checked in!</Text>
                </CardSection>

                <CardSection>
                </CardSection>
            </Card>
        );
    }
}

export default CheckinItem;