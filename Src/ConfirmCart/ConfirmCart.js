import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions, TextInput,
    ScrollView, TouchableOpacity, FlatList,
    Image, ActivityIndicator
} from 'react-native';

import Header from './Header';
import GetToken from '../Api/GetToken';
import { firebaseApp } from '../Api/firebaseConfig';

export default class ConfirmCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            phone: '',
            address: '',
            note: '',
            user: null,
            isLoading: false
        }
    }

    _getuser(id) {
        firebaseApp.database().ref('/users/' + id).once('value')
            .then((snaps) => {
                if (snaps !== 'null')
                    this.setState({
                        user: snaps.toJSON(),
                        fullname: snaps.toJSON().fullname,
                        phone: snaps.toJSON().phone,
                        email: snaps.toJSON().email,
                        address: snaps.toJSON().address,
                    });
            })
    }

    componentWillReceiveProps() {
        GetToken()
            .then(token => {
                if (token !== '') {
                    console.log('abd abdha bsdbash dbadasdasdasahdbash bdhsbd', token)
                }
            })
            .catch(err => console.log('LOI CHECK LOGIN', err));
    }

    componentWillMount() {
        GetToken()
            .then(token => {
                if (token !== '') {
                    this._getuser(token)
                }
                this.setState({ isLoading: true })
            })
            .catch(err => console.log('LOI CHECK LOGIN', err));
    }

    _GoLogIn() {
        this.props.navigation.navigate('logInScreen');
    }

    _CreateBillDetail(id_bill, id_product, quantity, price) {
        var id = this._makeIdBilldetails();
        firebaseApp.database().ref('billDetails').child(id).set({
            idBill: id_bill,
            idProduct: id_product,
            quantity: quantity,
            price: price
        });
    }

    _CreateBill(email, phone, total, address, note, status, ARRCART = []) {
        var idbill = this._makeIdBills();
        var today = this._getToday();
        firebaseApp.database().ref('bills').child(idbill).set({
            email: email,
            phone: phone,
            date: today,
            total: total,
            address: address,
            note: note,
            status: status
        });
        ARRCART.forEach(item => {
            this._CreateBillDetail(idbill, item.product.key, item.quantity, (item.product.price * item.quantity));
        });
        alert('ok')
    }

    _makeIdBills() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return 'AUG' + text;
    }
    _makeIdBilldetails() {
        var text = "";
        var possible = "QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 9; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    _getToday() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;
        return today;
    }


    render() {
        const { container, mapContainer, fromConfirm,
            inputbox, btnConfirm, listProductInCart,
            body, productContainer, productImage,
            produceName, producePrice, viewLoading } = styles;

        const { params } = this.props.navigation.state;
        const total = params.total;
        const arrCart = params.arr;

        const { fullname, phone, email, address, note, user, isLoading } = this.state;

        console.log(user)

        const header = (<Header total={total} />);

        const content = (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={listProductInCart}>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Product in Cart</Text>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={false}>
                            <FlatList
                                contentContainerStyle={body}
                                numColumns={1}
                                data={arrCart}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View style={productContainer}>
                                        <Image source={{ uri: `${item.product.images.i1.src}` }} style={productImage} />
                                        <Text style={produceName} numberOfLines={2}>{item.product.name}</Text>
                                        <Text>Quantity : <Text style={producePrice}>{item.quantity}</Text></Text>
                                    </View>
                                }
                            />
                        </ScrollView>
                    </View>
                </View>

                <View style={fromConfirm}>
                    <TextInput style={inputbox}
                        placeholder='Full name'
                        placeholderTextColor='#B3B3B3'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ fullname: text })}
                        value={fullname}
                    />
                    <TextInput style={inputbox}
                        placeholder='Phone number'
                        placeholderTextColor='#B3B3B3'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ phone: text })}
                        value={phone}
                    />

                    <TextInput style={inputbox}
                        placeholder='Email'
                        placeholderTextColor='#B3B3B3'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={email}
                    />

                    <TextInput style={inputbox}
                        placeholder='Address'
                        placeholderTextColor='#B3B3B3'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ address: text })}
                        value={address}
                    />

                    <TextInput style={inputbox}
                        placeholder='Note'
                        placeholderTextColor='#B3B3B3'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ note: text })}
                        value={note}
                    />
                </View>
            </View>
        );
        const footer = (
            <View style={{ flexDirection: 'column', marginBottom: 5, }}>
                <TouchableOpacity style={btnConfirm} onPress={() => this._CreateBill(email, phone, total, address, note, 'pending', arrCart)}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Confirm Order</Text>
                </TouchableOpacity>
            </View>
        );
        return (
            isLoading ?
                <View style={container} >
                    {header}
                    {content}
                    {footer}
                </View >
                :
                <View style={viewLoading}>
                    <ActivityIndicator size="large" color="#FC4C39" />
                </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const produtWidth = (width - 160) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    fromConfirm: {
        flexDirection: 'column',
        width: width,
        marginBottom: 50
    },
    inputbox: {
        width: width,
        height: 50,
        textAlign: 'center',
        borderRadius: 10,
        paddingHorizontal: 0,
        color: 'black',
        fontSize: 16,
        marginVertical: 0,
        borderBottomWidth: 1,
        borderColor: '#B3B3B3'
    },
    btnConfirm: {
        backgroundColor: '#1FED1F',
        padding: 10,
        borderRadius: 10,
    },
    listProductInCart: {

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flexDirection: 'row',
        paddingBottom: 6
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 5,
        flexDirection: 'column',
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 2,
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
    },
    viewLoading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(179, 179, 179, 0.1)',
    }
});
