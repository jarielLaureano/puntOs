import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection } from './common';
var moment = require('moment');

class UserSocialItem extends Component {

    renderDate(date) {
        const post_date = moment(new Date(date));
        const _today = moment(new Date());
        const minutes_diff = _today.diff(post_date, 'minutes');
        if( minutes_diff < 59) {
          return minutes_diff + 'm ago';
        } else if ( minutes_diff < 1439 ) {
          const hours = (minutes_diff/60).toFixed(0);
          return hours + 'h ago';
        } else if ( minutes_diff < 44639 ) {
          const days = (minutes_diff/1440).toFixed(0);
          return days + 'd ago';
        } else if ( minutes_diff < 525599 ) {
          const months = (minutes_diff/44640).toFixed(0);
          return months + 'm ago';
        } else {
          const years = (minutes_diff/525600).toFixed(0);
          return years + 'y ago';
        }
    }

    renderSocialPost(username, businessName, date, etype) {
         if (etype == "checkIn") {
             return(
                <View>
                    <Icon name="location-arrow" backgroundColor="white" />
                    <Text>{username} checked in at {businessName}.</Text>
                    <Text>{this.renderDate(date)}</Text>
                </View>
             );
         }
         else if (etype == "likePromo") {
            return(
                <View>
                    <Icon name="heart" backgroundColor="white" />
                    <Icon name="bullhorn" backgroundColor="white" />
                    <Text>{username} liked a promo from {businessName}.</Text>
                    <Text>{this.renderDate(date)}</Text>
                </View>
             );
         }
         else if (etype == "likeCoupon") {
            return(
                <View>
                    <Icon name="heart" backgroundColor="white" />
                    <Icon name="list-alt" backgroundColor="white" />
                    <Text>{username} liked a coupon from {businessName}.</Text>
                    <Text>{this.renderDate(date)}</Text>
                </View>
             );
         }
         else if (etype == "redeem") {
            return(
                <View>
                    <Icon name="list-alt" backgroundColor="white"/>
                    <Text>{username} redeemed a coupon a {businessName}.</Text>
                    <Text>{this.renderDate(date)}</Text>
                </View>
             );
         }
         else {
            return(
                <View>
                    <Icon name="book" backgoundColor="white" />
                    <Text>{username} claimed a coupon from {businessName}.</Text>
                    <Text>{this.renderDate(date)}</Text>
                </View>
             );
         }
    }

    render() {
        const { username, businessName, date, eventType } = this.props.socials;
        return(
            <Card>
                <CardSection>
                    {this.renderSocialPost(username, businessName, date, eventType)}
                </CardSection>
            </Card>
        );
    }
}

export default UserSocialItem;
