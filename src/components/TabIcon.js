import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  if(props.title === 'UserMain'){
    return(
      <Icon name="bullhorn" backgroundColor="white" color={props.focused ? '#0084b4' : 'grey'} size={25}/>
    );
  } else if(props.title === 'SocialFeed'){
      return(
        <Icon name="comments" backgroundColor="white" color={props.focused ? '#0084b4' : 'grey'} size={25}/>
      );
  } else if(props.title === 'Check-In'){
      return(
        <Icon name="compass" backgroundColor="white" color={props.focused ? '#0084b4' : 'grey'} size={25}/>
      );
  } else if(props.title === 'Notifications'){
      return(
        <Icon name="bell" backgroundColor="white" color={props.focused ? '#0084b4' : 'grey'} size={25}/>
      );
  } else if(props.title === 'MyProfile'){
      return(
        <Icon name="user" backgroundColor="white" color={props.focused ? '#0084b4' : 'grey'} size={25}/>
      );
  }
};

TabIcon.propTypes = propTypes;

export default TabIcon;
