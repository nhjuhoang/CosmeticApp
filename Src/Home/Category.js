import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import CustomImage from '../CustomComponent/CustomImage';

export default class Category extends React.Component {
    render() {
        const { navigate } = this.props;
        return (
            <View>
                <View style={styles.contentContainer}>
                    <View style={styles.col2}>
                        <TouchableOpacity onPress={() => navigate.navigate('ListProductScreen', { type: 'Lipstick' })}>
                            <CustomImage imageSource={require('../../Assets/LipsCG.jpg')} header="Lipstick" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.col1}>
                        <TouchableOpacity onPress={() => navigate.navigate('ListProductScreen', { type: 'Nails' })}>
                            <CustomImage imageSource={require('../../Assets/NailsCG.jpg')} header="Nail" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.col3}>
                        <TouchableOpacity onPress={() => navigate.navigate('ListProductScreen', { type: 'Face' })}>
                            <CustomImage imageSource={require('../../Assets/FaceCG.jpg')} header="Face" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.col4}>
                        <TouchableOpacity onPress={() => navigate.navigate('ListProductScreen', { type: 'Eye' })}>
                            <CustomImage imageSource={require('../../Assets/EyeCG.jpeg')} header="Eye" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    col1: {
        flex: 1,
        padding: 5,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
    },
    col2: {
        flex: 2,
        padding: 5,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
    },
    col3: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
    },
    col4: {
        flex: 2,
        paddingTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
    },
    contentBanner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
});