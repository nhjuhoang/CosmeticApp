import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet, Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import icLogo from '../../Assets/logo.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {

    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.openMenu}>
                        <Icon name="bars" size={22} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Cosmetic Shopping</Text>
                    <Image source={icLogo} style={iconStyle} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 12,
        backgroundColor: '#F6F6F6',
        padding: 10,
        justifyContent: 'space-around',
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    textInput: {
        height: height / 23,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingVertical: 0
    },
    titleStyle: { 
        color: 'black', 
        fontFamily: 'Papyrus', 
        fontSize: 20, 
        justifyContent: 'center' 
    },
    iconStyle: { width: 34, 
        height: 34 
    }
});