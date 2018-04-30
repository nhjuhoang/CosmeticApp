import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import HeaderListProduct from '../Header/HeaderListProduct';
import ListProductItem from './ListProductItem';
import firebase, { firebaseApp } from '../Api/firebaseConfig';

const { width } = Dimensions.get('window');

export default class ListProduct extends Component {

    _GoBackHome() {
        this.props.navigation.goBack();
    }

    constructor(props) {
        super(props);
        this.rootRef = firebaseApp.database();
        this.state = {
            ListProductByType: [],
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        let type = (params.type == 'Lipstick' ? 'Lips' :  params.type);

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
                    type: element.toJSON().product_type,
                    origin: element.toJSON().origin,
                    view: element.toJSON().view,
                    colors: element.toJSON().color,
                    description: element.toJSON().description
                });
                //list.sort((a, b) => b.view - a.view);
            });
            list.forEach(item => {
                if(type == item.type){
                    temp.push(item);
                }
            });
            console.log(temp)
            
            this.setState({
                ListProductByType: temp
            });
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const { container, BannerImage } = styles;
        const Image_Banner = (
            params.type == 'Lipstick' ?
                <Image source={require('../../Assets/LipsCG.jpg')} style={BannerImage} />
                : params.type == 'Nails' ?
                    <Image source={require('../../Assets/NailsCG.jpg')} style={BannerImage} />
                    : params.type == 'Face' ?
                        <Image source={require('../../Assets/FaceCG.jpg')} style={BannerImage} />
                        : <Image source={require('../../Assets/EyeCG.jpeg')} style={BannerImage} />
        );
        return (
            <View style={container}>
                <HeaderListProduct goBack={this._GoBackHome.bind(this)} titleCategory={params.type} />
                <ScrollView>
                    {Image_Banner}
                    <ListProductItem ListProductByType={this.state.ListProductByType} navigate={this.props.navigation}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    BannerImage: {
        width: width - 20,
        height: width / 2,
        backgroundColor: 'white',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        borderRadius: 20,
        padding: 10,
        paddingTop: 0
    },
});
