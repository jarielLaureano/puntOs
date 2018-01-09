import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class LeaderboardItem extends Component {

    renderItem(rank, image, name, points, level) {
        const { textStyle, viewStyle } = styles
        
        return (
            <View>
                <Card>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View style={viewStyle}>
                            <Text style={textStyle}>{rank}</Text>
                        </View>

                        <View style={{ borderRadius:40, height:40, width:40, alignContent:'center', backgroundColor: 'red'}}>
                            <View>
                            </View>
                        </View>

                        <View style={viewStyle}>
                            <Text style={textStyle}>{name}</Text>
                        </View>

                        <View style={viewStyle}>
                            <Text style={textStyle}>{points}</Text>
                        </View>

                        <View style={viewStyle}>
                            <Text style={textStyle}>{level}</Text>
                        </View>

                    </View>
                </Card>
            </View>
        );
    }

    render() {
        const {rank, image, name, points, level} = this.props.lbentries;
        return (
            <View>
                {this.renderItem(rank, image, name, points, level)}
            </View>
        );
    }

}

const styles = {
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    viewStyle: {
        marginLeft:15,
        padding: 10
    }
}

  export default LeaderboardItem;