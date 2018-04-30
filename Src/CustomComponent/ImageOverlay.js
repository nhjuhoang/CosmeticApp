import React from 'react';
import { StyleSheet,View, Image,Text } from 'react-native';

export default class ImageOverlay extends React.Component {
    render() {

        let header = this.props.header ? 
        <Text style={styles.overlatHeader}>{this.props.header}</Text> : null;

        let paragraph = this.props.paragraph ? 
        <Text style={styles.overlayText}>{this.props.paragraph}</Text> : null;


        return (
            <View>
                {header}
                {paragraph}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    overlatHeader : {
        shadowColor : '#000',
        shadowOffset : {width: 0, height: 2},
        shadowOpacity : 0.1,
        shadowRadius : 10,

        alignSelf : 'center',
        fontSize : 28,
        color: '#292929',
        textAlign: 'center',
        padding : 10,
        backgroundColor : 'rgba(255,255,255, 0.6)',
        fontWeight : 'bold'
    },
    overlayText : {
        shadowColor : '#000',
        shadowOffset : {width: 0, height: 2},
        shadowOpacity : 0.6,
        shadowRadius : 3,
        elevation : 1,

        alignSelf : 'center',
        fontSize : 16,
        fontStyle : 'italic',
        color: '#292929',
        textAlign: 'center',
        padding : 10,
        backgroundColor : '#E7DBD7',
        marginTop : 8
    }
});