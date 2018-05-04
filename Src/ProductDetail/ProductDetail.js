import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, Dimensions, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { firebaseApp } from '../Api/firebaseConfig';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import HeaderProductDetail from '../Header/HeaderProductDetail';
import BannerImage from './BannerImage';

// import { connect } from 'react-redux';
// import { addToCart, removeFromCart } from '../Redux/CartAction';

import globalCart from '../globalCart';
import GetCart from '../Api/Getcart';

const { width } = Dimensions.get('window');

class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.rootRef = firebaseApp.database();
    this.state = {
      valueColor: '',
      product: null,
      isLoading: false
    }
    this.onSelect = this.onSelect.bind(this)
  }

  _GoBackHome() {
    this.props.navigation.goBack();
  }

  _addProductToCart() {
    const { params } = this.props.navigation.state;
    globalCart._addProductToCart(params.product);
  }

  onSelect(index, value) {
    this.setState({
      valueColor: value
    })
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

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params.product !== null) {
      this.setState({ isLoading: true, product: params.product });
    }
  }

  render() {

    const { product } = this.state;
    var obj = product.images;
    var arr = Object.keys(obj).map(key => obj[key]);
    let ArrayImage = [];
    arr.forEach(element => {
      ArrayImage.push(element.src);
    });
    const Proudct_name = product.name;
    const Proudct_price = product.price.toFixed(2);
    const Proudct_view = product.view;
    const Proudct_description = product.description;
    const Proudct_origin = product.origin;

    const arrcolor = this._ObjectToArray(product.colors);


    const colorRadioBtn = (arrcolor.length ?
      (
        <RadioGroup
          onSelect={(index, value) => this.onSelect(index, value)}
          style={{ flexDirection: 'row', width: 100, marginLeft: 10 }}
        >
          {
            arrcolor.map(item => (
              <RadioButton color={item.code} value={item.name} key={item.code} >

                <Text>{item.name}</Text>
              </RadioButton>
            ))
          }
        </RadioGroup>
      )
      : null
    );
    //console.log('OBJECT TO ARRAY', this._ObjectToArray(ArrayColor))


    //console.log(arrcolor)
    const { wrapper, Proname, Proprice, ColorView, description,
      ogirinView, btnCart, viewLoading } = styles;
    return (
      < View style={wrapper} >
        <HeaderProductDetail goBack={this._GoBackHome.bind(this)} />
        {
          this.state.isLoading ?
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              <BannerImage ListImage={ArrayImage} />
              <View style={{ backgroundColor: '#F4F4F4' }}>
                <Text style={Proname}>{Proudct_name}</Text>
                <Text style={Proprice}>{Proudct_price} $</Text>

                <View style={ColorView}>
                  <View>
                    {colorRadioBtn}
                  </View>
                  <TouchableOpacity style={btnCart} onPress={() => this._addProductToCart()}>
                    <Icon name='md-add-circle' color='white' size={22} /><Text style={{ textAlign: 'center', marginLeft: 5 }}>Add cart</Text>
                  </TouchableOpacity>
                </View>

                <View style={ogirinView}>
                  <Text>
                    Ogirin: {Proudct_origin == 'HQ' ? 'Korea' : Proudct_origin == 'USA' ? 'America' : other}
                  </Text>
                </View>

                <View style={description}>
                  <Text>
                    {Proudct_description}
                  </Text>
                </View>

              </View>
            </ScrollView>
            :
            <View style={viewLoading}>
              <ActivityIndicator size="large" color="#FC4C39" />
            </View>
        }
      </View >
    );
  }
}


const swiperWidth = width;
const swiperHeight = 300;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  Proname: {
    padding: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  Proprice: {
    fontFamily: 'Avenir',
    color: '#FC4B38',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17
  },
  ColorView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width
  },
  description: {
    width: width,
  },
  ogirinView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingBottom: 10,
    paddingTop: 10
  },
  btnCart: {
    flexDirection: 'row',
    backgroundColor: '#FC4C39',
    //width: 100,
    borderRadius: 4,
    borderBottomRightRadius : 30,
    borderTopRightRadius : 30,
    padding: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(179, 179, 179, 0.1)',
  }
});


export default ProductDetail;
