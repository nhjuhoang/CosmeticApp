import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar, AsyncStorage
} from 'react-native';

import Login from './Src/Authentication/Login';
import globalCart from './Src/globalCart';
import { Menu } from './Router';
import { YellowBox } from 'react-native';
import Getcart from './Src/Api/Getcart';
import SaveCart from './Src/Api/SaveCart';


// import { Provider } from 'react-redux';

// import  store  from './Src/Redux/Store';


StatusBar.setHidden(true);
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { notifiCountcart: 0, arrCart: [] }
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillUpdate is deprecated',
      'Warning: isMounted(...) is deprecated',
      'Setting a timer'
    ]);

    globalCart._addProductToCart = this._addProductToCart.bind(this);
    globalCart._incrQuantity = this._incrQuantity.bind(this);
    globalCart._decrQuantity = this._decrQuantity.bind(this);
    globalCart._removeProduct = this._removeProduct.bind(this);
    globalCart._upDatenotifiCount = this._upDatenotifiCount.bind(this);
    globalCart._upDateRemovenotifiCount = this._upDateRemovenotifiCount.bind(this);
    globalCart._ClearAll = this._clearAll.bind(this);
  }

  componentWillMount() {
    //AsyncStorage.clear()
    Getcart().then(res => { this.setState({ notifiCountcart: res.length, arrCart: res }) });
  }

  _addProductToCart(product) {
    try {
      const isExist = this.state.arrCart.some(p => p.product.key === product.key);
      if (isExist) {
        const newCart = this.state.arrCart.map(e => {
          if (e.product.key !== product.key) return e;
          return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ arrCart: newCart },
          () => SaveCart(this.state.arrCart)
        );
      } else {
        this.setState
          (
          { arrCart: this.state.arrCart.concat({ product, quantity: 1 }) },
          () => SaveCart(this.state.arrCart)
          );
        globalCart._upDatenotifiCount();
      }
    } catch (error) {
      console.log(error);
    }
  }

  _incrQuantity(key) {
    try {
      const newCart = this.state.arrCart.map(p => {
        if (p.product.key !== key) return p;
        return { product: p.product, quantity: p.quantity + 1 };
      });
      this.setState({ arrCart: newCart },
        () => SaveCart(this.state.arrCart)
      );
    } catch (e) {
      console.log(e);
    }
  }

  _decrQuantity(key) {
    try {
      const newCart = this.state.arrCart.map(p => {
        if (p.product.key !== key) return p;
        return { product: p.product, quantity: p.quantity - 1 };
      });
      this.setState({ arrCart: newCart },
        () => SaveCart(this.state.arrCart)
      );
    } catch (e) {
      console.log(e);
    }

  }

  _removeProduct(key) {
    try {
      const newCart = this.state.arrCart.filter(p => p.product.key !== key);
      this.setState({ arrCart: newCart },
        () => SaveCart(this.state.arrCart)
      );
    } catch (e) {
      console.log(e);
    }
    globalCart._upDateRemovenotifiCount();

  }

  _clearAll() {
    try {
      this.setState({ arrCart: [] },
        () => SaveCart(this.state.arrCart));
        globalCart._upDateRemovenotifiCount();
    } catch (e) {
      console.log(e);
    }
  }

  _upDatenotifiCount() {
    Getcart().then(res => { this.setState({ notifiCountcart: res.length + 1 }) });
  }

  _upDateRemovenotifiCount() {
    Getcart().then(res => { this.setState({ notifiCountcart: res.length  }) });
  }

  render() {
    const { notifiCountcart } = this.state;
    return (
      <Menu screenProps={{ notifiCount: notifiCountcart }} />
    );
  }
}