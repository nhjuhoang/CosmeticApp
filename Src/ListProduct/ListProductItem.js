import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class ListProductItem extends Component {

    render() {
        const imageDefault = (<Image source={require('../../Assets/defaultImage.png')} style={productImage} />);
        const { container, body, productContainer, productImage, produceName, producePrice } = styles;
        const { navigate } = this.props;
        console.log('asndasjdajsnd asdajsdahs as dhasdhasd', navigate)
        return (
            <View style={container}>
                <FlatList
                    contentContainerStyle={body}
                    numColumns={2}
                    data={this.props.ListProductByType}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={productContainer} onPress={() => navigate.navigate('ProductDetailScreen', { product: item })}>
                            {this.props.ListProductByType.length ? <Image source={{ uri: `${item.images.i1.src}` }} style={productImage} /> : imageDefault}
                            <Text style={produceName} numberOfLines={2}>{item.name}</Text>
                            <Text style={producePrice}>{item.price.toFixed(2)}$</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        flexDirection: 'column',
        paddingBottom: 6,
        marginLeft: 18
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        justifyContent: 'space-between',
        margin: 5
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: 'black',
        fontWeight: '500',
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#FC4B38',
        fontWeight: '500',
        fontSize: 16
    }
});
