import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputBox = ({ label, value, onChangeText, placeholder, secureTextEntry, overStyle, placeholderTextColor, selectionColor, maxLength, numberOfLines, multiline }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle, overStyle]}
        value={value}
        maxLength = {maxLength}
        numberOfLines = {numberOfLines}
        multiline={multiline}
        onChangeText={onChangeText}
        autoCapitalize='none'
        placeholderTextColor={placeholderTextColor}//'#c6e4f2'
        selectionColor= {selectionColor}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    alignSelf: 'stretch',
    borderColor: '#0084b4',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    textAlignVertical: 'top'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  }
};

export { InputBox };
