import _ from 'lodash';
import firebase from 'firebase';
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { postDetailFetch, postDetailUpdate, userLikePost, userUnlikePost } from '../actions';
import PostDetail from './PostDetail';

var currentUser  = null;

class PostFeed extends Component {
    componentWillMount() {
        console.log("called auth")
        currentUser  = firebase.auth().currentUser.uid;
        this.props.postDetailUpdate();
        this.props.postDetailFetch();
    }

    renderItem(item) {
        console.log(this.props.key);
        return (
            <PostDetail
            uid={currentUser}
            pid={item.key}
            name={item.name}
            date={item.date}
            text={item.text}
            likedBy={item.likedBy}
        />
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.postDetails}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
}

const mapStateToProps = state => {
    const postDetails = _.values(state.postDetails, (val, uid) => {
        return { ...val, uid };
    });
    return { postDetails };
 };
 
export default connect(mapStateToProps, { postDetailFetch, postDetailUpdate, userLikePost, userUnlikePost }) (PostFeed);