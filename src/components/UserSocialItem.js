import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { userLikeItem, userUnlikeItem, userSetExpired } from '../actions';
import { Card, CardSection, Button } from './common';
var moment = require('moment');

class UserSocialItem extends Component {

    renderReview(isReview) {
        if (isReview) {
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: 5 }}>
                <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={rating}
                        starSize={40}
                        starColor={'#f2d733'}
                    />
                    <Text style={{ fontSize: 20, alignSelf: 'center' }}>{rating}</Text>
                </View>
            </View>
        }
    }

    render() {
        <Card>
            <CardSection>
            </CardSection>

            <CardSection>
            </CardSection>
        </Card>
    }
}

const mapStateToProps = state => {
    var { uid, type } = state.userMain;
    return { uid, type };
  }

export default connect(mapStateToProps, {  }) (UserSocialItem);