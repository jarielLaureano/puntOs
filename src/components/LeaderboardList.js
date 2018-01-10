import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getLeaderboard } from '../actions';
import LeaderboardItem from './LeaderboardItem';

class LeaderboardList extends Component {

    componentWillMount() {
        this.props.getLeaderboard(this.props.uid);
      }

    render() {
        console.log(this.props.lbentries);
        return (
            <FlatList
                data={this.props.lbentries}
                renderItem={({item}) => <LeaderboardItem lbentries={item} />}
            />
        );
    }
}

const mapStateToProps = state => {
    var { user, uid } = state.userMain;
    const lbentries = _.map(state.userMain.lbentries, (val, key) => {
        return {...val, key};
    });
    return { uid, lbentries };
}

export default connect(mapStateToProps, { getLeaderboard }) (LeaderboardList);
