import React, { Component } from 'react';
import { ListView, FlatList } from 'react-native';
import firebase from 'firebase';
import UserPromoItem from './UserPromoItem';
import { userGetPromos } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';
var orderedPromos;

class UserPromoList extends Component {
  componentWillMount() {
    //currentUser = firebase.auth().currentUser.uid;
    this.props.userGetPromos(this.props.uid);
  }

  render() {
    console.log(this.props.promos);
    return (
      <FlatList
        data={this.props.promos}
        renderItem={({item}) => <UserPromoItem item={item} />}
      />
    );
  }
}
const mapStateToProps = state => {
  var { uid } = state.userMain;
  console.log(state.userMain)
  const promos = _.map(state.userMain.promos, (val, key) => {
    return {...val, key};
  });
  return { uid, promos };
}

export default connect(mapStateToProps, { userGetPromos })(UserPromoList);
