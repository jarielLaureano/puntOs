import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likePost, unlikePost, setExpired } from '../actions';
import { Card, CardSection, Button } from './common';
var moment = require('moment');

class PostItem extends Component {
    hasUniqueIconImage(image) {
        if (image) {
            return (
              <Image style={styles.authorIconStyle} source={{uri: image }} />
            );
        }
        else {
        return ( <Image style={styles.authorIconStyle} source={require('../assets/no-user-image.gif')} />);
        }
        //if not, return default icon
    }

    renderImage(image) {
        if (image) {
            return (
                <View style={postImageStyle}>
                    <Image source={{uri: image }} />
                </View>
            );
        }
    }

    getLikes(likedBy, uid, pid) {
        if (this.isLikedByUser(likedBy, uid)) {
            return (
                <Icon.Button
                name="heart"
                color="red"
                backgroundColor="white"
                onPress={() => this.props.unlikePost(uid, pid)}
                >
                    <Text style={styles.postFooterButtonTextStyle}>{this.renderLikes(likedBy)}</Text>
                </Icon.Button>
            );
        }
        return (
            <Icon.Button name="heart-o" color="red" backgroundColor="white"
            onPress={() => this.props.likePost(uid, pid)}
            >
                <Text style={styles.postFooterButtonTextStyle}>{this.renderLikes(likedBy)}</Text>
            </Icon.Button>
        );
    }

    isLikedByUser(likes, uid) {
        //console.log(likes);
      if (likes) {
        for (like in likes) {
            if (like == uid) {
                //console.log(like == uid);
                return true;
            }
        }
      }
        return false;
    }

    renderLikes(likes) {
      return Object.keys(likes).length;
    }

    renderClaims(claimedBy, isCoupon){
      if (isCoupon) {
      if(!claimedBy){
        return (
          <View style={{ flexDirection: 'column', marginLeft: 5, marginTop: 15, marginBottom: 10 }}>
          <Text style={{ alignSelf: 'center', fontSize: 30 }}>0</Text>
          <Text style={{ alignSelf: 'center', fontSize: 14 }}>claims</Text>
          </View>
        );
      }
      else{
        return (
          <View style={{ flexDirection: 'column', marginLeft: 5, marginRight: 5, marginTop: 15, marginBottom: 10 }}>
          <Text style={{ alignSelf: 'center', fontSize: 30 }}>Object.keys(claimedBy).length</Text>
          <Text style={{ alignSelf: 'center', fontSize: 14 }}>claims</Text>
          </View>
        );
      }
    }
  }

    // TODO
    renderClaimButton(isCoupon, expired, expires, pointsValue, pid, uid) {
        if(isCoupon){
          if(expired){
            return (
              <View style={{ flex:1, backgroundColor: '#f97171', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Expired</Text>
              <Text style={{ alignSelf: 'center', fontSize: 14, color: 'white' }}>{pointsValue} points</Text>
              </View>
            );
          }
          else{
            const expires_date = moment(new Date(expires));
            const _today = moment(new Date());
            const minutes_diff = _today.diff(expires_date, 'minutes');
          if(minutes_diff>0){
              this.props.setExpired(pid);
              return (
                <View style={{ flex:1, backgroundColor: '#f97171', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Expired</Text>
                <Text style={{ alignSelf: 'center', fontSize: 14, color: 'white' }}>{pointsValue} points</Text>
                </View>
              );
            }
            else {
              return (
              <TouchableOpacity>
                <View style={{ flex:1, backgroundColor: '#299cc5', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Claim</Text>
                <Text style={{ alignSelf: 'center', fontSize: 14, color: 'white' }}>{pointsValue} points</Text>
                </View>
              </TouchableOpacity>
              );
            }
          }
        }
    }

    // TODO
    renderShares(share) {

    }

    renderDate(date) {
      const post_date = moment(new Date(date));
      const _today = moment(new Date());
      const minutes_diff = _today.diff(post_date, 'minutes');
      //console.log(minutes_diff)
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

    render() {
        const {pid,icon,name,date,text,image,likedBy,isCoupon,claimedBy,sharedBy, claimLimit,expires, expired, pointsValue } = this.props.item;
        const { uid } = this.props;

        const {authorIconStyle,authorNameStyle,postDateTextStyle,postTextStyle,postFooterStyle,overStyle,postFooterButtonTextStyle} = styles;
        return (
            <Card>
                <CardSection>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{paddingLeft: 5, paddingTop: 10}}>
                            {this.hasUniqueIconImage(icon)}
                        </View>
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <Text style={authorNameStyle}>
                                {name}
                            </Text>
                            <Text style={postDateTextStyle}>
                                {this.renderDate(date)}
                            </Text>
                        </View>
                    </View>
                </CardSection>

                <CardSection>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {this.renderClaims(claimedBy, isCoupon)}
                        <Text style={postTextStyle}>
                            {text}
                        </Text>
                    </View>
                </CardSection>

                <CardSection style={{ borderBottomWidth: 1, padding: 5 }}>
                    {this.renderImage(image)}
                </CardSection>

                <CardSection>
                    <View style={postFooterStyle}>
                        {this.getLikes(likedBy, uid, pid)}
                        <Icon.Button name="share" color="black" backgroundColor="white">
                            <Text style={postFooterButtonTextStyle}>Share</Text>
                        </Icon.Button>
                    </View>
                </CardSection>
                  {this.renderClaimButton(isCoupon, expired, expires, pointsValue, pid, uid)}
            </Card>
        );
    }
}

const styles = {
    authorIconStyle: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ababab',
        resizeMode: 'contain'
    },
    authorNameStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    postDateTextStyle: {
        fontSize: 14,
        marginLeft: 10,
    },
    postTextStyle: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5
    },
    postImageStyle: {
        flex: 1,
        height: 150,
        width: null,
    },
    postFooterStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    postFooterButtonTextStyle: {
        alignSelf: 'center',
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
    },
}

const mapStateToProps = state => {
  var { uid, type } = state.businessMain;
  return { uid, type };
}

export default connect(mapStateToProps, { likePost, unlikePost, setExpired }) (PostItem);
