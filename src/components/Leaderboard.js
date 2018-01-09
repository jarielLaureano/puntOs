import React, { Component } from 'react';
import { View, Text, Flatlist } from 'react-native';
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
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <LeaderboardList />
            </View>
        );
    }
}

const mapStateToProps = state => {
    var { user, uid } = state.userMain;
    return { user, uid };
  }

export default connect(mapStateToProps, { getUserProfile })(Leaderboard);
