import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback, 
    LayoutAnimation, 
    ScrollView,
    CameraRoll,
    Modal
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { InputBox, InputLine, Button } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { postReviewChange, submitReview } from '../actions'

class PostReviewView extends Component {


 componentWillUpdate() {
        LayoutAnimation.spring();
  }

  onReviewSubmission () {
      this.props.submitReview({
          businessID: this.props.businessID,
          uid: this.props.uid,
          username: this.props.username,
          image: this.props.image,
          rating: this.props.rating,
          date: this.props.date,
          caption: this.props.caption,
          text: this.props.text
      })
  }

  render() {

      const { 
          thumbnailStyle, 
          containerStyle, 
          textStyle, 
          ratingContainer, 
          backgroundStyle,
          lineInputOverstyle,
          inputBoxOverstyle,
          scrollStyle,
          modalStyle
         } = styles;

      const {
          postReviewChange,
          submitReview
      } = this.props

    return (
      <ScrollView style={backgroundStyle}>
        <View style={containerStyle}>
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback>
                    <Image
                        style={thumbnailStyle} 
                        source={require('../assets/uploadImageVector.png')}
                    />
                </TouchableWithoutFeedback>
                <Text style={textStyle}>Upload Image</Text>         
            </View>
            <View style={{ flex: 2, flexDirection: 'row', marginTop: 10}}>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={this.props.rating}
                starSize={30}
                starStyle={{ paddingLeft: 5 }}
                selectedStar={(value) => postReviewChange({ prop: 'rating', value})}
                starColor={'#f2d733'}
                halfStarEnabled={true}
                />
                <Text style={{ fontSize: 23, paddingLeft: 5 }}>{this.props.rating}</Text>
            </View>
            <View style={{ flex: 3, alignSelf: 'stretch', marginTop: 10 }}>
               <View style={{ alignSelf: 'stretch' }}>
                <InputLine
                    onChangeText={value => postReviewChange({ prop: 'caption', value })}
                    placeholder='Caption' 
                    placeholderTextColor='gray'
                    overStyle={lineInputOverstyle}
                    value={this.props.caption}
                />
                <InputBox
                    onChangeText={value => postReviewChange({ prop: 'text', value })}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={150}
                    placeholderTextColor='gray'
                    placeholder='Review'
                    overStyle={inputBoxOverstyle}
                    value={this.props.text}
                />
                </View>
            </View>
            <View style={{ flex: 4 }}>
                <Button onPress={() => this.onReviewSubmission()  }>
                    Post It 
                </Button>
            </View>
       </View>   
      </ScrollView>
    );
  }
}

//Stylesheet
const styles = {
    thumbnailStyle: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    containerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      },
    textStyle: {
        fontSize: 16,
        color: '#0084b4'
    },
    ratingContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
      },
    lineInputOverstyle: {
        borderWidth: 3,
        borderColor: '#0084b4',
        borderBottomWidth: 3,
        borderBottomColor: '#0084b4',
        width: 330,    
    },
    inputBoxOverstyle: {
         color: '#000',
         width: 330, 
         backgroundColor: '#fff', 
         height: 200, 
         alignSelf: 'center', 
         marginTop:5,
         borderWidth: 3,
         borderColor: '#0084b4',
         borderBottomWidth: 3,
         borderTopWidth: 3,
         borderBottomColor: '#0084b4',
         borderRightWidth: 3,
         borderLeftWidth: 3,
    }
}

const mapStateToProps = state => {
 const {
    businessID,
    date,
    text,
    rating,
    caption,
    uid,
    username,
    image,
    loading,
    error
 } = state.postReview;

 return {
    businessID,
    date,
    text,
    rating,
    caption,
    uid,
    username,
    image,
    loading
 }

}
export default connect(mapStateToProps, { postReviewChange, submitReview })(PostReviewView);