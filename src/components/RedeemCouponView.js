import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';
import { connect } from 'react-redux';
import { claimCoupon, updateCouponProfile } from '../actions'

class RedeemCouponView extends Component {
    render() {
        const { 
            imageContainerStyle,
            couponDescriptionContainerStyle,
            pointsStatusContainer,
            pointsStatusStyle,
            redeemButtonContainer,
            backgroundStyle,
            nameStyle,
            descriptionStyle,
            touchableStyle,
            buttonStyle
        } = styles

        const {
            name,
            text,
            pointsValue,
            image
        } = this.props.coupon;

        const { user, loading, message } = this.props;

        return (
            <ScrollView style={backgroundStyle}>
                <View style={imageContainerStyle}>
                    <Image style={{ height: 250 }}
                        source={{ uri: image }}
                    />
                </View>
                <View style={couponDescriptionContainerStyle}>
                    <Text style={nameStyle}>{name}</Text>
                    <Text style={descriptionStyle}>
                     {text}
                    </Text>
                </View>
                <View style={pointsStatusContainer}>
                    <Text style={pointsStatusStyle}>Value:  {pointsValue}</Text>
                    <Text style={pointsStatusStyle}>Available: {user.points}</Text>
                    <Text style={pointsStatusStyle}>{ calculatePointsAfterClaim(user, pointsValue)}</Text>
                    <TouchableHighlight style={touchableStyle} >
                        <Text style={buttonStyle}>Redeem Now!</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const  calculatePointsAfterClaim =(user, pointsValue) => {
      var result = user.points - pointsValue;
        if(result > 0){
            return "After:    "+result;
        }
        else {
            return "Not Sufficient Funds!"
        }
    }



const styles = {
    backgroundStyle: {
        backgroundColor: '#fff'
    },
    imageContainerStyle: {
        flex: 1, 
        alignItems: 'stretch',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    couponDescriptionContainerStyle: {
        flex: 2,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#808080',
    },
    pointsStatusContainer: {
        flex: 3,
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,

    },
    pointsStatusStyle: {
        fontSize: 20,
        paddingLeft: 10,
        paddingBottom: 15
    },
    touchableStyle: {
        backgroundColor: '#0084b4',
        alignItems: 'center',
        marginRight: 15
    },
    nameStyle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#0084b4'
    },
    descriptionStyle: {
        fontSize: 18,
        color: 'white',
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20, 
    },
    buttonStyle: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white'
    }
}

const mapStateToProps = state => {
    const { coupon, loading, message } = state.redeemCoupon;
    const { user } = state.userMain;

    return {
        coupon,
        loading,
        message,
        user
    };

};

export default connect(mapStateToProps,{ claimCoupon, updateCouponProfile })(RedeemCouponView);