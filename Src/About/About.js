import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, Dimensions
} from 'react-native';

export default class About extends Component {
  render() {
    const { container, mapContainer } = styles;
    return (
      <View style={container}>
        <View style={mapContainer}>
        <Text>dadad</Text>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  }
});
