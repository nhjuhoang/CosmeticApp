import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default class BannerImage extends Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
  }

  render() {
    const swiperImage = (
      <Swiper showsPagination width={swiperWidth} height={swiperHeight} autoplay
        dot={<View style={{ backgroundColor: '#d3d1d3', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
        activeDot={<View style={{ backgroundColor: '#ff96f9', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
      >
        {
          this.props.ListImage.map(item => (
            <ImageBackground
              key={item}
              source={{ uri: `${item}` }}
              style={styles.imageStyle}
            >
            </ImageBackground>
          ))
        }
      </Swiper>
    );

    return (
      <View style={styles.wrapper}>
        {swiperImage}
      </View>
    );
  }
}


const swiperWidth = width;
const swiperHeight = 350;

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    backgroundColor: '#FFF',
    margin: 0,
    justifyContent: 'center',
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  imageStyle: {
    height: swiperHeight,
    width: swiperWidth,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
