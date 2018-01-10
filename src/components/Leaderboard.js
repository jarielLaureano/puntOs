import React, { Component } from 'react';
import { View, Text, Flatlist, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getUserProfile } from '../actions';
import LeaderboardList from './LeaderboardList';
import { Card, CardSection } from './common';

class Leaderboard extends Component {

    componentWillMount(){
        currentUser = firebase.auth().currentUser.uid;
        this.props.getUserProfile(currentUser);
      }

      renderPoints(){
        if(this.props.user.points){
          return this.props.user.points;
        }
        else{
          return 0;
        }
      }

      renderImage(image) {
        if (image) {
            return (
              <Image
              style={styles.thumbnailStyle}
              source={{uri: image }}
              />
            );
        }
        else {
          return(
          <Image
          style={styles.thumbnailStyle}
          source={require('../assets/no-user-image.gif')}
          />);
        }
    }

    renderUserRank() {
        return (
            <View>
                <Card>
                    <CardSection>
                    </CardSection>

                    <CardSection>
                    </CardSection>

                    <CardSection>
                    </CardSection>
                </Card>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>
            <View style={{ flex: 4, flexDirection: 'column', backgroundColor: '#fff' }}>
              <View style={{ flex: 4, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Text style={{ alignSelf: 'center', fontSize: 30 }}>{this.renderPoints()}</Text>
                <Text style={{ alignSelf: 'center' }}>puntOs</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                  {this.renderImage(this.props.user.image)}
                </View>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Text style={{ alignSelf: 'center', fontSize: 30 }}>{this.props.user.level}</Text>
                <Text style={{ alignSelf: 'center'}}>Level</Text>
                </View>
              </View>
              <View style={{ flex: 1 , flexDirection: 'column', justifyContent: 'center', marginBottom: 10 }}>
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{this.props.user.name}</Text>
              <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25, color: '#0084b4' }}>Rank: {this.props.rank}</Text>
              </View>
            </View>
            <View style={{ flex:1, flexDirection: 'row', backgroundColor: '#0084b4',
            shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 1 }}>
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{color: '#fff'}}>Rank</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, flex: 5 }}>
                <Text style={{color: '#fff', textAlign: 'left'}}>User</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flex: 2 }}>
                <Text style={{color: '#fff'}}>Points</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, flex: 1 }}>
                <Text style={{color: '#fff'}}>Level</Text>
              </View>
            </View>
            </View>
              <View style={{ flex: 6}}>
                  <LeaderboardList />
              </View>
            </View>
        );
    }
}

const styles = {
  thumbnailStyle: {
  height: 100,
  width: 100,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'black',
  alignSelf: 'center',
  resizeMode: 'contain'
  }
};

const mapStateToProps = state => {
    var { rank, user, uid } = state.userMain;
    return { rank, user, uid };
  }

export default connect(mapStateToProps, { getUserProfile })(Leaderboard);
