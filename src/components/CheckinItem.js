import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class CheckinItem extends Component {
    render() {
        const { name, businessName, date } = this.props.checkin;

        return (
            <Card>
                <CardSection>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>
                        {name} checked into {businessName} on {date}
                        </Text> 
                    </View>
                </CardSection>

                <CardSection>
                </CardSection>
            </Card>
        );
    }
}

export default CheckinItem;