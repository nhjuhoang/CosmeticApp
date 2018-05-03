import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class About extends Component {
  render() {
    const { container, mapContainer, infoContainer, rowInfoContainer,imageStyle,infoText } = styles;
    return (
      <View style={container}>
        <View style={infoContainer}>
        <View style={[rowInfoContainer,{justifyContent: 'center'}]}>
          <Text style={{fontSize: 19, color: '#FC4C39', textAlign: 'center', fontWeight: 'bold'}}>About US</Text>
        </View>
          <View style={rowInfoContainer}>
            <Icon name='map-marker' size={22} style={imageStyle} />
            <Text style={infoText}>118/88 street, ward 24, binh thanh district</Text>
          </View>
          <View style={rowInfoContainer}>
            <Icon name='phone' size={22} style={imageStyle} />
            <Text style={infoText}>(+84) 971742301</Text>
          </View>
          <View style={rowInfoContainer}>
          <Icon name='at' size={22} style={imageStyle}/>
            <Text style={infoText}>nhjuhoang@gmail.com</Text>
          </View>
          <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
          <Icon name='mobile' size={22} style={imageStyle}/>
            <Text style={infoText}>(+84) 655626901</Text>
          </View>
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
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOpacity: 0.2
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D6D6D6'
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#E35E5E',
    fontWeight: '500'
  }
});
