import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import firebase, { firebaseApp } from '../Api/firebaseConfig';
import Header from '../Header/Header';
import ImageOverlay from '../CustomComponent/ImageOverlay';

export default class Shop extends Component {

  _OpenMenu() {
    this.props.navigation.navigate('DrawerOpen');
  }

  constructor(props) {
    super(props);
    this.rootRef = firebaseApp.database();
    this.state = {
      ListCategoryContent: []
    }
  }

  componentWillMount() {
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
        ListCategoryContent: list
      });
    });

  }

  render() {
    const { container, BannerImage } = styles;

    const ListCategoryContent = (
      this.state.ListCategoryContent.map(item => (
        <TouchableOpacity key={item.key} onPress={() => this.props.navigation.push('ListProductScreen', { type: item.type })}>
          <ImageBackground
            borderRadius={10}
            source={{ uri: `${item.image}` }}
            style={BannerImage}
          >
            <ImageOverlay
              header={item.name}
            />
          </ImageBackground>
        </TouchableOpacity>
      ))
    )

    return (
      <View style={container}>
        <Header openMenu={this._OpenMenu.bind(this)} />
        <ScrollView>
          {
            ListCategoryContent
          }
        </ScrollView>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  BannerImage: {
    width: width - 20,
    height: width / 3,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    opacity: 0.9
  }
});
