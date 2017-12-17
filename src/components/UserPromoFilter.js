import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection, Button } from './common';


class UserPromoFilter extends Component {
    render() {
        <Card>
            <View>
                <CardSection>

                    <Icon.Button
                    name=''
                    onPress={()=> this.props.userProfileUpdate({prop:'primaryFilterSelected', value: 'Promos'})}
                    >
                    </Icon.Button>

                    <Icon.Button
                    name=''
                    onPress={()=> this.props.userProfileUpdate({prop:'primaryFilterSelected', value: 'Coupons'})}
                    >
                    </Icon.Button>

                </CardSection>
            </View>

            <View>
                <CardSection>
                    <ScrollView>
                        <Icon.Button
                            name=''
                            onPress={()=> this.props.userProfileUpdate({prop:'primaryFilterSelected', value: 'Promos'})}
                        >
                        </Icon.Button>

                        <Icon.Button
                            name=''
                            onPress={()=> this.props.userProfileUpdate({prop:'primaryFilterSelected', value: 'Coupons'})}
                        >
                        </Icon.Button>
                    </ScrollView>
                </CardSection>
            </View>
        </Card>
    }
}

const mapStateToProps = state => {
    const { uid, userFilterState } = state.businessMain;
    return { uid, userFilterState };
  }

export default UserPromoFilter;