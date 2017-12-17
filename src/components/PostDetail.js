import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userLikePost, userUnlikePost, businessMainUpdate } from '../actions';
import { Card, CardSection } from './common/index';
import * as actions from '../actions';
import { Actions } from 'react-native-router-flux';

class PostDetail extends Component {
    
    hasUniqueIconImage(image) {
        if (image) {
            return (
                <Image source={image} />
            );
        }
        //if not, return default icon
    }

    renderImage(image) {
        if (image) {
            return (
                <View style={postImageStyle}>
                    <Image source={image} />
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
                onPress={this.unlike(uid, pid)}
                >
                    <Text style={styles.postFooterButtonTextStyle}>{this.renderLikes(likedBy)}</Text>
                </Icon.Button>
            );
        }
        return (
            <Icon.Button name="heart-o" color="red" backgroundColor="white"
            onPress={this.like(uid, pid)}
            >
                <Text style={styles.postFooterButtonTextStyle}>{this.renderLikes(likedBy)}</Text>
            </Icon.Button>
        );
    }

    isLikedByUser(likes, uid) {
        //console.log(likes);
        //console.log(uid);
        for (like in likes) {
            if (like == uid) {
                //console.log(like == uid);
                return true;
            }
        }
        return false;
    }

    like(uid, pid) {
        return () => {
            this.props.userLikePost(uid, pid);
        }
    }

    unlike(uid, pid) {
        return () => {
            this.props.userUnlikePost(uid, pid);
        }
    }

    // TODO
    renderLikes(likes) {

    }

    // TODO
    renderClaimButton(coupon) {

    }

    // TODO
    renderShares(share) {

    }

    render() {
        const {
            pid,
            uid,
            icon,
            name,
            date,
            text,
            image,
            likedBy,
            isCoupon,
            claimedBy,
            sharedBy
        } = this.props

        const {
            authorIconStyle,
            authorNameStyle,
            postDateTextStyle,
            postTextStyle,
            postFooterStyle,
            overStyle,
            postFooterButtonTextStyle
        } = styles;
        return (
            <Card>
                <CardSection>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={authorIconStyle}>
                            {this.hasUniqueIconImage(this.props.icon)}
                        </View>
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <TouchableOpacity
                                onPress={() =>{
                                    Actions.UserBusinessProfile()
                                }}
                            >
                            <Text style={authorNameStyle}>
                                {this.props.name}
                            </Text>
                            </TouchableOpacity>
                            <Text style={postDateTextStyle}>
                                {this.props.date}
                            </Text>
                        </View>
                    </View>
                </CardSection>
    
                <CardSection>
                    <View>
                        <Text style={postTextStyle}>
                            {this.props.text}
                        </Text>
                    </View>
                </CardSection>

                <CardSection style={{ borderBottomWidth: 1, padding: 5 }}>
                    {this.renderImage(this.props.image)}
                </CardSection>

                <CardSection>
                    <View style={postFooterStyle}>
                        {this.getLikes(this.props.likedBy, this.props.uid, this.props.pid)}
                        <Icon.Button name="share" color="black" backgroundColor="white">
                            <Text style={postFooterButtonTextStyle}>Share</Text>
                        </Icon.Button>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    authorIconStyle: {
        height: 40,
        width: 40,
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#ababab'
    },
    authorNameStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10

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

}

export default connect(null, { userLikePost, userUnlikePost }) (PostDetail);
