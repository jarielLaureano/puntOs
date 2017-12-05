import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, overStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, overStyle]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignItems: 'center',
    width: 250,
    height: 45,
    alignSelf: 'center',
    backgroundColor: '#0084b4',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 25
  }
};

export { Button };
