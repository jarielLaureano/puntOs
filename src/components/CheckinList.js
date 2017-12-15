import React, { Component } from 'react';
import { FlatList } from 'react-native';
import CheckinItem from './CheckinItem';
import { getCheckins } from '../actions';
import _ from 'lodash';
import firebase from 'firebase';
import { connect } from 'react-redux';

class CheckinList extends Component {
  componentWillMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.props.getCheckins(currentUser);
    console.log('the id is: ' + currentUser);
    console.log(this.props.checkins)
  }

  render() {
    return (
      <FlatList
        data={this.props.checkins}
        renderItem={({item}) => <CheckinItem checkin={item} />}
      />
    );
  }
}
const mapStateToProps = state => {
  var { user } = state.userMain;
  console.log(user)
  console.log(state.userMain.checkins)
  const checkins = _.map(state.userMain.checkins, (val, key) => {
    return {...val, key};
  });
  return { user, checkins };
}

export default connect(mapStateToProps, { getCheckins })(CheckinList);
