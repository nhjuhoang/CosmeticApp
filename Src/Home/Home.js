import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Header from '../Header/Header';
import Banner from './Banner';
import Category from './Category';
import FeatureProduct from './FeatureProduct';
import NewarrivalProduct from './NewarrivalProduct';

export default class Home extends Component {

  _OpenMenu() {
    this.props.navigation.navigate('DrawerOpen');
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Header openMenu={this._OpenMenu.bind(this)} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

          <Banner />
          <Category navigate={this.props.navigation} />
          <FeatureProduct navigate={this.props.navigation} />
          <NewarrivalProduct navigate={this.props.navigation} />

        </ScrollView>
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
  }
});
