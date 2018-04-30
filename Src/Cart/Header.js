import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions
} from 'react-native';

export default class Header extends Component {
    render() {
        const { container, welcome, totalPrice,
            txtprice } = styles;
        return (
            <View style={container}>
                <Text style={welcome}>
                    My cart
                </Text>
                <View style={totalPrice}>
                    <Text style={{fontSize: 15, }}>Total Price :</Text>
                    <Text style={txtprice}>{this.props.total}$</Text>
                </View>
            </View>
        );
    }
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#B3B3B3'
    },
    welcome: {
        fontSize: 19,
        textAlign: 'center',
        margin: 2,
        fontFamily: 'Cochin',
    },
    totalPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    txtprice: {
        fontWeight: '700',
        fontSize: 17,
        color: '#FC4C39'
    },
});
