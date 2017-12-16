import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserMainFilterHeader = (props) => {
    const { viewStyle,
            carouselStyle,
            lineSeparatorStyle,
            textStyle,
            filterButtonStyle
        } = styles;

    return (
        /*
        <View>
            <View style={viewStyle}>
                <Text style={textStyle}>HB</Text>
                <Text style={textStyle}>10,000 P</Text>
                <Text style={textStyle}>Lv.14</Text>
            </View>
            <View style={lineSeparatorStyle}></View>
        */
        <View>
            <View>
                <ScrollView 
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                centerContent={true}
                contentContainerStyle={carouselStyle}
                >
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                    <View style={filterButtonStyle}></View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#00b0f0',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 30,
    },
    lineSeparatorStyle: {
        backgroundColor: 'white',
        height: 2,
        shadowColor: 'white',
    },
    carouselStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        backgroundColor: '#00b0f0',
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    filterButtonStyle: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 50,
    }
};

export default UserMainFilterHeader;
