import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

    renderSocialPost(username, businessName, date, etype, rating) {
        var type_color = '';
        var type_text = '';
        var type_icon = '';
        var action_text = '';
        var action_icon = '';
        var action_color = '';
         if (etype === "checkIn") {
           type_color = '#0084b4';
           type_text = username + ' checked in at ' + businessName + '.';
           type_icon = 'md-home';
           action_text = 'checked-in';
           action_icon = 'md-pin';
           action_color = '#ee5050';
         }
         else if (etype === "likePromo") {
           type_color = '#0084b4';
           type_text = username + ' liked a promo from ' + businessName + '.';
           type_icon = 'md-megaphone';
           action_text = 'liked';
           action_icon = 'md-heart';
           action_color = '#ee5050';
         }
         else if (etype === "likeCoupon") {
           type_color = '#0084b4';
           type_text = username + ' liked a coupon from ' + businessName + '.';
           type_icon = 'md-pricetag';
           action_text = 'liked';
           action_icon = 'md-heart';
           action_color = '#ee5050';
         }
         else if (etype === "redeem") {
           type_color = '#0084b4';
           type_text = username + ' claimed a coupon from ' + businessName + '.';
           type_icon = 'md-pricetag';
           action_text = 'claimed';
           action_icon = 'md-hand';
           action_color = 'grey';
         }
         else if(etype === 'sharePromo'){
           type_color = '#0084b4';
           type_text = username + ' shared a promo from ' + businessName + '.';
           type_icon = 'md-megaphone';
           action_text = 'shared';
           action_icon = 'md-share-alt';
           action_color = 'grey';
         }
         else if(etype === 'shareCoupon'){
           type_color = '#0084b4';
           type_text = username + ' shared a coupon from ' + businessName + '.';
           type_icon = 'md-pricetag';
           action_text = 'shared';
           action_icon = 'md-share-alt';
           action_color = 'grey';
         }
         else if(etype === 'review'){
           type_color = '#0084b4';
           type_text = username + ' gave ' + rating + ' stars to ' + businessName + '.';
           type_icon = 'md-create';
           action_text = 'rated';
           action_icon = 'md-star-half';
           action_color = 'grey';
         }

         return(
           <View>
               <Card>
                   <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 5, paddingBottom: 5, alignSelf: 'stretch' }}>
                       <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 5, flex: 1 }}>
                         <Text style={{fontSize: 10}}>{this.renderDate(date)}</Text>
                       </View>
                       <View style={{ flex: 4, flexDirection: 'row', backgroundColor: '#fff', paddingTop: 5, paddingBottom: 5 }}>
                         <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flex: 1 }}>
                         <Icon name={type_icon} size= {40} color={type_color} style={{ alignSelf: 'center' }} />
                         </View>
                         <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flex: 6 }}>
                             <Text style={{
                               fontSize: 16,
                               flex: 1}}>{type_text}</Text>
                         </View>
                         <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, flex: 2, paddingRight: 10 }}>
                         <Icon name={action_icon} size= {35} color={action_color} style={{ alignSelf: 'center' }} />
                         <Text style={{fontSize: 12}}>{action_text}</Text>
                         </View>
                       </View>
                   </View>
               </Card>
           </View>
         );
    }

    render() {
        const { username, businessName, date, eventType, rating } = this.props.socials;
        return this.renderSocialPost(username, businessName, date, eventType, rating);
    }
}

export default UserSocialItem;
