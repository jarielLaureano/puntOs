import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getSocialPosts } from '../actions';
import UserSocialItem from './UserSocialItem';

class UserSocialList extends Component {

    componentWillMount() {
        console.log(this.props.uid);
        this.props.getSocialPosts(this.props.uid);
      }
    
    render() {
        console.log(this.props.socials);
        return (
            <FlatList
                data={this.props.socials}
                renderItem={({item}) => <UserSocialItem socials={item} />}
            />
        );
    }
}

const mapStateToProps = state => {
    var { user, uid } = state.userMain;
    const socials = _.map(state.userMain.socials, (val, key) => {
        return {...val, key};
    });
    return { uid, socials };
}

export default connect(mapStateToProps, { getSocialPosts }) (UserSocialList);