import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView,Animated
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import firebase, { firebaseApp } from '../Api/firebaseConfig';

export default class NewarrivalProduct extends Component {

    constructor(props) {
        super(props);
        this.rootRef = firebaseApp.database();
        this.state = {
            NewarrivalList: [],
        }
    }

    componentWillMount() {

        this.rootRef.ref('products').on('value', (snaps) => {
            const list = [];
            const temp = [];
            snaps.forEach(element => {
                list.push({
                    key: element.key,
                    name: element.toJSON().name,
                    price: element.toJSON().price,
                    images: element.toJSON().images,
                    tag: element.toJSON().tags,
                    createDay: element.toJSON().created_at,
                    origin: element.toJSON().origin,
                    view: element.toJSON().view,
                    colors: element.toJSON().color,
                    description: element.toJSON().description
                });
                list.sort((a, b) => new Date(b.createDay) - new Date(a.createDay));
            });
            for (let i = 0; i < 6; i++) {
                temp.push(list[i]);
            };
            this.setState({
                NewarrivalList: temp
            });
            //console.log('new new new new ',temp)
        });
    }

    render() {
        // console.log(navigate)
        const { navigate } = this.props;
        const {
            container,
            titleContainer,
            title,
            body,
            productContainer,
            productImage,
            produceName,
            producePrice
        } = styles;
        const imageDefault = (<Image source={require('../../Assets/defaultImage.png')} style={productImage} />);
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>New Arrival</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 10, marginTop: 5, fontFamily: 'AvenirNext-Heavy', }}>Show all >></Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={false}>
                    <FlatList
                        contentContainerStyle={body}
                        numColumns={1}
                        data={this.state.NewarrivalList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={productContainer} onPress={() => navigate.navigate('ProductDetailScreen', { product: item })}>
                                {this.state.NewarrivalList.length ? <Image source={{ uri: `${item.images.i1.src}` }} style={productImage} /> : imageDefault}
                                <Text style={produceName} numberOfLines={2}>{item.name}</Text>
                                <Text style={producePrice}>{item.price.toFixed(2)}$</Text>
                            </TouchableOpacity>
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

// orientation must fixed
// const SCREEN_WIDTH = width < height ? width : height;
// // const SCREEN_HEIGHT = width < height ? height : width;
// const isSmallDevice = SCREEN_WIDTH <= 414;
// const numColumns = isSmallDevice ? 2 : 3;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    titleContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20,
        fontFamily: 'AvenirNext-Heavy',
    },
    body: {
        flexDirection: 'row',
        //flexDirection: 'column',
        paddingBottom: 6
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 5
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: 'black',
        fontWeight: '500',
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#FC4B38',
        fontWeight: '500',
        fontSize: 16
    }
});
