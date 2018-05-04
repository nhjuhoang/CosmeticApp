import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, ScrollView,
  Modal, ActivityIndicator
} from 'react-native';

import Header from '../Header/Header';
import firebase, { firebaseApp } from '../Api/firebaseConfig';
import Banner from './Banner';
import Category from './Category';
import FeatureProduct from './FeatureProduct';
import NewarrivalProduct from './NewarrivalProduct';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.rootRef = firebaseApp.database();
    this.state = {
      ListCategory: [],
      featureProductList: [],
      loading: true
    }
  }

  componentWillMount() {
    // get category banner
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
        ListCategory: list,
        loading : false
      });
    });
    // get featureProduct
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
        list.sort((a, b) => b.view - a.view);
      });
      for (let i = 0; i < 6; i++) {
        temp.push(list[i]);
      };
      this.setState({
        featureProductList: temp,
        loading : false
      });
    });
  }

  _OpenMenu() {
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    const { loading, ListCategory, featureProductList } = this.state;
    return (
      <View style={styles.container}>
        <Header openMenu={this._OpenMenu.bind(this)} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <Banner ListCategory={ListCategory} />
          <Category navigate={this.props.navigation} isloading={loading} />
          <FeatureProduct navigate={this.props.navigation} featureProductList={featureProductList} />
          <NewarrivalProduct navigate={this.props.navigation} isloading={loading} />
        </ScrollView>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          onRequestClose={() => { console.log('close modal') }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={loading} />
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }

});
