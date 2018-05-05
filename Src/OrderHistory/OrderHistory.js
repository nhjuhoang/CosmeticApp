import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions, FlatList, TouchableOpacity,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import GetToken from '../Api/GetToken';
import firebase, { firebaseApp } from '../Api/firebaseConfig';
export default class OrderHistory extends Component {

    constructor(props) {
        super(props);
        this.rootRef = firebaseApp.database();
        this.state = { arrOrder: [] };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const email = params ? params.email : null;
        console.log(email)
        this._getBillsUser(email);
    }

    _getBillsUser(email) {
        this.rootRef.ref('bills').on('value', (snaps) => {
            const list = [];
            snaps.forEach(element => {
                if (element.toJSON().email === email) {
                    list.push({
                        key: element.key,
                        email: element.toJSON().email,
                        address: element.toJSON().address,
                        date: element.toJSON().date,
                        phone: element.toJSON().phone,
                        total: element.toJSON().total,
                        status: element.toJSON().status,
                    });
                }
            });
            this.setState({ arrOrder: this._ObjectToArray(list) })
        });
    }

    _goOrderDetail(id,title) {
        this.props.navigation.navigate('OrderdetailScreen', { idbill: id, title: title });
    }

    _ObjectToArray(obj) {
        if (obj != null) {
            var arr = Object.keys(obj).map(key => obj[key]);
            let list = [];
            arr.forEach(element => {
                list.push(element);
            });
            return list;
        } else {
            return 0;
        }
    }


    render() {
        const { container, body, itemContainer, itemStyle } = styles;
        const { arrOrder } = this.state;
        const listOrder = arrOrder ? arrOrder : null;
        //console.log(listOrder);
        return (
            <View style={container}>
                <FlatList
                    contentContainerStyle={body}
                    numColumns={1}
                    data={listOrder}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={itemContainer} onPress={()=> this._goOrderDetail(item.key, item.key)}>
                            <View style={itemStyle}>
                                <Text>ID :</Text>
                                <Text>{item.key}</Text>
                            </View>
                            <View style={itemStyle}>
                                <Text>Date Order :</Text>
                                <Text>{item.date}</Text>
                            </View>
                            <View style={itemStyle}>
                                <Text>Total :</Text>
                                <Text style={{ color: '#FC4B38' }}>{item.total} $</Text>
                            </View>
                            <View style={itemStyle}>
                                <Text>Status :</Text>
                                <Text>{item.status}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
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
    body: {
        flexDirection: 'column',
        width: width
    },
    itemContainer: {
        width: width,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: '#F5F5F5',
        shadowOpacity: 0.2,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: '#FC4C39'

    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginRight: 10
    }
});
