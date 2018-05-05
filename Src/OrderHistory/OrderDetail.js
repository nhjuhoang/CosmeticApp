import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions, FlatList, TouchableOpacity,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { firebaseApp } from '../Api/firebaseConfig';
export default class OrderDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.title
        }
    };

    constructor(props) {
        super(props);
        this.rootRef = firebaseApp.database();
        this.state = { arrProduct: [], arrCart: [] };
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const id = params ? params.idbill : null;
        this._getBillDetail(id);
    }

    _getBillDetail(id) {
        this.rootRef.ref('billDetails').on('value', (snaps) => {
            const list = [];
            snaps.forEach(element => {
                if (element.toJSON().idBill === id) {
                    list.push({
                        key: element.key,
                        product: element.toJSON().product,
                        quantity: element.toJSON().quantity,
                        price: element.toJSON().price,
                    });
                }
            });
            this.setState({ arrCart: list });
        });
    }

    _ObjectToArray(obj) {
        if (obj != null) {
            var arr = Object.keys(obj).map(key => obj[key]);
            let list = [];
            arr.forEach(element => {
                list.push(element);
            });
            return list;
        } else {
            return 0;
        }
    }


    render() {
        const { container, body, productContainer, productImage, produceName, producePrice, viewNamePrice } = styles;
        const { arrCart } = this.state;
        return (
            <View style={container}>
                <FlatList
                    contentContainerStyle={body}
                    numColumns={1}
                    data={arrCart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={productContainer}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={{ uri: `${item.product.images.i1.src}` }} style={productImage} />
                            </View>
                            <View style={viewNamePrice}>
                                <Text style={produceName} numberOfLines={2}>{item.product.name}</Text>
                                <Text style={producePrice}>{item.product.price}$</Text>
                                <Text style={produceName}>Quantity : {item.quantity}</Text>
                                <Text style={produceName}>Total : <Text style={producePrice}>{item.price}$</Text></Text>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}
const { width, height } = Dimensions.get('window');
const produtWidth = width / 2.5;
const productImageHeight = (produtWidth / 400) * 430;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    body: {
        flexDirection: 'column',
        width: width,
        paddingBottom: 6,
        marginLeft: 0,
    },
    productContainer: {
        flexDirection: 'row',
        shadowColor: '#2E272B',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 5,
        backgroundColor: '#F3FBFF',
        borderBottomWidth: 1,
        borderColor: '#B3B3B3'
    },
    viewNamePrice: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // width: width
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: 'black',
        fontWeight: '500',
        width: (width + 40) / 2
    },
    producePrice: {
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#FC4B38',
        fontWeight: '500',
        fontSize: 16
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight,
        borderRadius: 7
    }
});
