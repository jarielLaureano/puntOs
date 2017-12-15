import React, { Component } from 'react';
import { ListView, FlatList } from 'react-native';
import PostItem from './PostItem';
import { getPosts } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';

class PostList extends Component {
  componentWillMount() {
    this.props.getPosts(this.props.uid);
  }

  render() {
    return (
      <FlatList
        data={this.props.promos}
        renderItem={({item}) => <PostItem item={item} />}
      />
    );
  }
}
const mapStateToProps = state => {
  var { uid } = state.businessMain;
  const promos = _.map(state.businessMain.promos, (val, key) => {
    return {...val, key};
  });
  return { uid, promos };
}

export default connect(mapStateToProps, { getPosts })(PostList);
