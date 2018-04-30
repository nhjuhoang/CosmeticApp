import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

import Swiper from 'react-native-swiper';

import firebase, { firebaseApp } from '../Api/firebaseConfig';

const { width } = Dimensions.get('window');

import ImageOverlay from '../CustomComponent/ImageOverlay';


export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.rootRef = firebaseApp.database();
        this.state = {
            ListCategory: []
        }
    }

    componentWillMount() {
        this.rootRef.ref('category').on('value', (snaps) => {
            const list = [];
            snaps.forEach(element => {
                list.push({
                    key: element.key,
                    name: element.toJSON().name,
                    image: element.toJSON().image,
                    type: element.toJSON().type

                });
            });
            this.setState({
                ListCategory: list
            });
        });

    }


    render() {
        //console.log(this.state.ListCategory)

        const { types } = this.props;
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const imageDefault = (<Image source={require('../../Assets/defaultImage.png')} style={imageStyle} />);
        const swiper = (
            <Swiper showsPagination width={imageWidth} height={imageHeight} autoplay
                dot={<View style={{ backgroundColor: '#d3d1d3', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                activeDot={<View style={{ backgroundColor: '#ff96f9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
            >
                {
                    this.state.ListCategory.map(item => (
                        <TouchableOpacity key={item.key}>
                            <ImageBackground
                                source={{ uri: `${item.image}` }}
                                style={imageStyle}
                            >
                                <ImageOverlay
                                    header={item.name}
                                />
                            </ImageBackground>

                        </TouchableOpacity>
                    ))
                }
            </Swiper>
        );
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'flex-end', flex: 4 }}>
                    {this.state.ListCategory.length ? swiper : imageDefault}
                </View>
            </View>
        );
    }
}

//933 x 465
const imageWidth = width;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        backgroundColor: '#FFF',
        margin: 0,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#ff96f9',
        fontFamily: 'Courier-BoldOblique',
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'GillSans-UltraBold',
        fontWeight: 'bold',
        color: '#ff96f9',
        position: 'absolute',
        height: 40,
        left: 10,
        top: imageHeight - 30
    }
});