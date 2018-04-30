import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions
} from 'react-native';

export default class Header extends Component {
    render() {
        const { container, mapContainer, txtTotal } = styles;
        return (
            <View style={container}>
                <View style={{flexDirection: 'row',justifyContent: 'space-between',marginLeft: 10, marginRight: 10, padding: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '300'}}>Total Cart :</Text>
                    <Text style={txtTotal}>{this.props.total}$</Text>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#1FED1F',
        borderRadius: 5
    },
    txtTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FC4C39',
    }
});
