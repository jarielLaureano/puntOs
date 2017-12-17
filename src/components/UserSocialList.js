import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import UserSocialPost from './UserSocialPost';

class UserSocialList extends Component {

    componentWillMount() {
        this.props.getSocialPosts(this.props.uid);
      }
    
    render() {
        return (
            <FlatList
                data={this.props.socials}
                renderItem={({item}) => <UserSocialItem item={item} />}
            />
        );
    }
}

const mapStateToProps = state => {
    var { uid } = state.userMain;
    const socials = _.map(state.userMain.reviews, (val, key) => {
      return {...val, key};
    });
    return { uid, reviews };
  }