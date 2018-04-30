import React from 'react';
import { StyleSheet, Image, View ,ImageBackground,Text} from 'react-native';

import ImageOverlay from './ImageOverlay';

export default class CustomImage extends React.Component {
    render() {
        let image = this.props.header ? 
        <Text style={styles.overlatHeader}>{this.props.header}</Text> : null;
        return (
            <ImageBackground source={this.props.imageSource}
                style={styles.image} >

                <ImageOverlay
                    header={this.props.header}
                    paragraph={this.props.paragraph} />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    }
});