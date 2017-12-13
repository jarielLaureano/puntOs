import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

class ReviewItem extends Component {

  render () {
    const { date, rating, text, username, image } = this.props.review;
    return (
        <View style={{ flexDirection: 'column', backgroundColor:'#fff', borderColor: 'grey', borderRightWidth: 0, borderLeftWidth: 0, borderWidth: 0.5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'flex-start', justifyContent: 'center', flexDirection: 'column', paddingLeft: 5, paddingTop: 10 }}>
            <Image
            style={styles.thumbnailStyle}
            source={{ uri: image }}
            defaultSource={require('../assets/no-user-image.gif')}
            />
            </View>
            <View style={{ flex: 6, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 5 }}>{username}</Text>
              <Text style={{ paddingTop: 5, fontSize: 15 }}>{text}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
            <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
              <StarRating
              disabled={true}
              maxStars={5}
              rating={rating}
              starSize={25}
              starColor={'#f2d733'}
              />
              <Text style={{ fontSize: 20, alignSelf: 'center' }}>{rating}</Text>
            </View>
          </View>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize:18,
    paddingLeft: 15
  },
  thumbnailStyle: {
  height: 40,
  width: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'black',
  resizeMode: 'contain'
  }
};

export default ReviewItem;
