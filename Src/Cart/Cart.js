import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Platform, StyleSheet, Text,
  View, Image, FlatList,
  Dimensions, TouchableOpacity, TextInput, Alert
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import Header from './Header';

import globalCart from '../globalCart';
import Getcart from '../Api/Getcart';
import SaveCart from '../Api/SaveCart';
import GetToken from '../Api/GetToken';
import { firebaseApp } from '../Api/firebaseConfig';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = { arrCart: [], user: null }
  }

  componentWillReceiveProps() {
    Getcart().then(res => { this.setState({ arrCart: res }) });
    GetToken().then(token => {
      if (token !== '') {
        this._getuser(token)
      }
    })
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }

  componentWillMount() {
    Getcart().then(res => { this.setState({ arrCart: res }) });
    GetToken().then(token => {
      if (token !== '') {
        this._getuser(token)
      }
    })
      .catch(err => console.log('LOI CHECK LOGIN', err));

  }

  _getuser(id) {
    firebaseApp.database().ref('/users/' + id).once('value')
      .then((snaps) => {
        if (snaps !== 'null') {
          this.setState({
            user: snaps.toJSON(),
          });
        } else {
          this.setState({
            user: null
          });
        }
      })
  }


  incrQuantity(key) {
    globalCart._incrQuantity(key);
  }

  decrQuantity(key) {
    globalCart._decrQuantity(key);
  }

  removeProduct(key) {
    globalCart._removeProduct(key);
  }

  clearAllcart() {
    globalCart._ClearAll();
  }

  _GoShopNow() {
    this.props.navigation.navigate('Shop_tab');
  }

  _GoConfirmCart(arr, total) {
    this.props.navigation.navigate('ConfirmCartScreen', { arr: arr, total: total });
  }

  _GoLogIn() {
    this.props.navigation.navigate('logInScreen');
  }

  _alertConfirm(product) {
    Alert.alert(
      'Are you sure?',
      'Delete ' + product.name,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.removeProduct(product.key) },
      ],
      { cancelable: false }
    )
  }

  _alertConfirmClearAll() {
    Alert.alert(
      'Are you sure?',
      'Delete all product in cart',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.clearAllcart() },
      ],
      { cancelable: false }
    )
  }

  _alertConfirmNext(arr, total) {
    Alert.alert(
      'You are not logged in?',
      'Login or Next to confirm cart.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Login', onPress: () => this._GoLogIn() },
        { text: 'Next', onPress: () => this._GoConfirmCart(arr, total) },
      ],
      { cancelable: false }
    )
  }

  _ConfirmCart(arr, total) {
    let func = null;
    GetToken().then(token => {
      if (token !== '') {
        func = this._GoConfirmCart(arr, total);
      } else {
        func = this._alertConfirmNext(arr, total);
      }
    }).catch(err => console.log('LOI CHECK LOGIN', err));
    return func;
  }






  render() {

    const { arrCart } = this.state;
    const { container, body, productContainer,
      productImage, produceName, producePrice,
      btnincrdescr, viewNamePrice, btnAddSub,
      btnOrder, noProduct, shopNow } = styles;

    const arrTotal = arrCart.map(e => e.product.price * e.quantity);
    const total = (arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0).toFixed(2);

    const header = (
      <Header total={total} />
    )

    var BGcolorBtn = (arrCart.length ? '#1FED1F' : '#B3B3B3') //background button confirm order
    var BGcolorBtnNext = (arrCart.length ? '#FC6666' : '#B3B3B3') //background button confirm order

    const footer = (
      <View style={btnOrder}>
        <TouchableOpacity
          onPress={() => this._alertConfirmClearAll()}
          disabled={arrCart.length ? false : true}
          style={{ padding: 10, backgroundColor: `${BGcolorBtnNext}`, width: width / 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._ConfirmCart(arrCart, total)}
          disabled={arrCart.length ? false : true}
          style={{ padding: 10, backgroundColor: `${BGcolorBtn}`, width: width / 2, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text>
        </TouchableOpacity>
      </View>
    )

    const fatlist = (
      arrCart.length > 0 ? <FlatList
        contentContainerStyle={body}
        numColumns={1}
        data={arrCart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={productContainer}>
            {arrCart.length ? <Image source={{ uri: `${item.product.images.i1.src}` }} style={productImage} /> : imageDefault}
            <View style={viewNamePrice}>
              <Text style={produceName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={producePrice}>{item.product.price}$</Text>
              <View style={btnincrdescr}>
                <TouchableOpacity style={btnAddSub} onPress={() => this.incrQuantity(item.product.key)}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.quantity}</Text>
                <TouchableOpacity style={btnAddSub} onPress={() => this.decrQuantity(item.product.key)}>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => this._alertConfirm(item.product)}>
                <Ionicons name='md-close' size={18} style={{ color: '#FC4C39', marginRight: 2 }} />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
        : (
          <View>
            <Ionicons name='md-sad' size={50} color='#B3B3B3' style={noProduct} />
            <Text style={noProduct}>No product in cart</Text>
            <TouchableOpacity onPress={() => this._GoShopNow()}>
              <Text style={shopNow}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )
    )

    return (
      <View style={container}>
        {header}
        {fatlist}
        {footer}
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const produtWidth = width / 3.5;
const productImageHeight = (produtWidth / 400) * 430;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'column',
    width: width,
    paddingBottom: 6,
    marginLeft: 0,
  },
  productImage: {
    width: produtWidth,
    height: productImageHeight,
    borderRadius: 10
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
  viewNamePrice: {
    flexDirection: 'column',
    // width: width
  },
  btnincrdescr: {
    width: 100,
    height: productImageHeight / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(179, 179, 179, 0.1)',
    borderRadius: 25,
  },
  btnAddSub: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  btnOrder: {
    justifyContent: 'space-between',
    width: width,
    marginBottom: 5,
    flexDirection: 'row',
  },
  noProduct: {
    textAlign: 'center',
    width: width
  },
  shopNow: {
    textAlign: 'center',
    color: '#FC4C39',
    fontWeight: 'bold',

  }
});


export default Cart;