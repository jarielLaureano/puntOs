import React, { Component } from 'react';
import { ListView, FlatList, View, Text, Image } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, CardSection } from './common/';
var moment = require('moment');

class MyCoupons extends Component {
  //componentWillMount() {
  //  this.props.getPosts(this.props.uid);
  //}

  renderUsed(used){
    if(used){
      return(
        <View style={{ flex:1, backgroundColor: '#f97171', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
        <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Used</Text>
        </View>
    );
    } else {
      return(
        <View style={{ flex:1, backgroundColor: '#60e591', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
        <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Not Used</Text>
        </View>
    );
    }
  }

  renderImage(image) {
      //console.log(image)
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
    if(this.props.my_coupons){
    return (
      <FlatList
        data={this.props.my_coupons}
        renderItem={({item}) =>
        <Card>
        <View style={{ backgroundColor: '#fff'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{paddingLeft: 5, paddingTop: 10}}>
              {this.renderImage(item.image)}
            </View>
            <View style={{flex:1, flexDirection: 'column'}}>
              <Text style={styles.authorNameStyle}>
              {item.businessName}
              </Text>
              <Text style={styles.postDateTextStyle}>
                {this.renderDate(item.date)}
              </Text>
              <Text style={styles.postTextStyle}>
                {item.text}
              </Text>
            </View>
          </View>
        </View>
        <CardSection>
        <View style={{ flex:1, flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
        <Text style={styles.codeStyle}>
          Code: {item.code}
        </Text>
        </View>
        </CardSection>
        <CardSection>
        {this.renderUsed(item.used)}
        </CardSection>
        </Card>
      }
      />
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold', color:'#e3e3e3' }}>No Coupons</Text>
      </View>
    );
  }
}
}

const styles ={
backgroundStyle: {
  flex: 1,
  backgroundColor: '#e3e3e3'
},
thumbnailStyle: {
height: 100,
width: 100,
borderRadius: 5,
borderWidth: 1,
borderColor: 'black',
alignSelf: 'center',
resizeMode: 'contain'
},
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
    marginTop: 5,
    flexWrap: 'wrap',
    flex: 1
},
codeStyle: {
    fontSize: 18,
    marginTop: 5,
    alignSelf: 'center',
    marginBottom: 5
}
}

const mapStateToProps = state => {
  var { uid } = state.userMain;
  const my_coupons = _.map(state.userMain.my_coupons, (val, key) => {
    return {...val, key};
  });
  return { uid, my_coupons };
}

export default connect(mapStateToProps, {})(MyCoupons);
