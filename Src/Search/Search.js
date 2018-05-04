import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import firebase, { firebaseApp } from '../Api/firebaseConfig';

export default class Search extends Component {

  // _searchProducByName(keyword = '') {
  //   this.rootRef.ref('products').orderByChild('name').startAt(keyword).endAt(keyword + "\uf8ff").on('value', (snaps) => {
  //     const list = [];
  //     snaps.forEach(element => {
  //       list.push({
  //         key: element.key,
  //         name: element.toJSON().name,
  //         price: element.toJSON().price,
  //         images: element.toJSON().images,
  //         tag: element.toJSON().tags,
  //         type: element.toJSON().product_type,
  //         origin: element.toJSON().origin,
  //         view: element.toJSON().view,
  //         colors: element.toJSON().color,
  //         description: element.toJSON().description
  //       });
  //     });
  //     this.setState({
  //       ListProductByName: list
  //     });
  //   });
  // }

  _searchProducByName(keyword) {

    let ProductsByname = keyword !== '' ? this.state.ListProduct.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase())) : [];
    this.setState({
      ListProductByName: ProductsByname
    });
  }

  _GoDetailProduct(item) {
    this.props.navigation.navigate('ProductDetailScreen', { product: item })
  }

  constructor(props) {
    super(props);
    this.rootRef = firebaseApp.database();
    this.state = {
      ListProduct: [],
      ListProductByName: [],
    }
  }

  componentWillMount() {
    this.rootRef.ref('products').on('value', (snaps) => {
      const list = [];
      snaps.forEach(element => {
        list.push({
          key: element.key,
          name: element.toJSON().name,
          price: element.toJSON().price,
          images: element.toJSON().images,
          tag: element.toJSON().tags,
          type: element.toJSON().product_type,
          origin: element.toJSON().origin,
          view: element.toJSON().view,
          colors: element.toJSON().color,
          description: element.toJSON().description
        });
      });
      this.setState({
        ListProduct: list
      });
    });
  }

  render() {
    const imageDefault = (<Image source={require('../../Assets/defaultImage.png')} style={productImage} />);
    const { container, inputSearch, ViewinputSearch, body, productContainer, productImage, produceName, producePrice, viewNamePrice, contentContainer } = styles;

    return (
      <View style={container}>
        <View style={ViewinputSearch}>
          <TextInput
            style={inputSearch}
            placeholder="Search product by name"
            placeholderTextColor='#D4915F'
            keyboardType='web-search'
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(text) => {
              this._searchProducByName(text);
            }}
          />
        </View>

        <ScrollView contentContainerStyle={contentContainer}>
          <FlatList
            contentContainerStyle={body}
            numColumns={1}
            data={this.state.ListProductByName}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <TouchableOpacity style={productContainer} key={item.key} onPress={() => this._GoDetailProduct(item)} >
                {this.state.ListProductByName.length ? <Image source={{ uri: `${item.images.i1.src}` }} style={productImage} /> : imageDefault}
                <View style={viewNamePrice}>
                  <Text style={produceName} numberOfLines={2}>{item.name}</Text>
                  <Text style={producePrice}>{item.price.toFixed(2)}$</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </ScrollView>
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
  },
  ViewinputSearch: {
    backgroundColor: '#F4F4F4',
    height: 50,
    borderRadius: 25,
  },
  inputSearch: {
    height: 50,
    width: width,
    padding: 10,
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
    margin: 2,
    padding: 1,
    backgroundColor: '#F3FBFF',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  productImage: {
    width: produtWidth,
    height: productImageHeight,
    borderRadius: 10
  },
  produceName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: 'black',
    fontWeight: '500',
    width: (width + 100) / 2
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
    width: width
  },
  contentContainer: {
  }

});
