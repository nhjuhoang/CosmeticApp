
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text,
    View, Dimensions, TextInput, TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { firebaseApp } from '../Api/firebaseConfig';
import GetToken from '../Api/GetToken';

export default class Infomation extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            fullname: '',
            email: '',
            phone: '',
            address: '',
            key: ''
        })
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const user = params.user;
        this.setState({
            fullname: user.fullname ? user.fullname : '',
            email: user.email ? user.email : '',
            phone: user.phone ? user.phone : '',
            address: user.address ? user.address : user.key,
        })
    }

    _ChangeInfomation(name, email, phone, address) {
        GetToken().then(
            token => {
                if (token !== '') {
                    firebaseApp.database().ref('users/' + token).set({
                        fullname: name,
                        email: email,
                        phone: phone,
                        address: address
                    })
                }
            });
        this.setState({
            fullname: name,
            email: email,
            phone: phone,
            address: address,
        })
        alert('success')
    }



    render() {
        const { container, fromchange, inputbox, btnText, button } = styles;
        const { fullname, email, phone, address } = this.state;
        return (
            <View style={container}>
                <View style={fromchange}>
                    <Text style={{ marginTop: 10 }}>Full name</Text>
                    <TextInput style={inputbox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={fullname}
                        //editable={!this.state.isShowActivity}
                        onChangeText={(text) => this.setState({ fullname: text })}
                    />

                    <Text>Email</Text>
                    <TextInput style={inputbox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        //editable={!this.state.isShowActivity}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <Text>Phone</Text>
                    <TextInput style={inputbox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={phone}
                        //editable={!this.state.isShowActivity}
                        onChangeText={(text) => this.setState({ phone: text })}
                    />

                    <Text>Address</Text>
                    <TextInput style={inputbox}
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={address}
                        //editable={!this.state.isShowActivity}
                        onChangeText={(text) => this.setState({ address: text })}
                    />
                </View>
                <View>
                    <TouchableOpacity style={button} onPress={() => this._ChangeInfomation(fullname, email, phone, address)}>
                        <Text style={btnText}>Change Infomation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#B3B3B3',
    },
    iconStyle: {
        width: 80,
        height: 100,
        marginBottom: 100
    },
    inputbox: {
        width: 300,
        height: 50,
        textAlign: 'center',
        borderRadius: 15,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 3
    },
    fromchange: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    button: {
        width: 300,
        borderRadius: 25,
        paddingHorizontal: 16,
        backgroundColor: '#333333',
        marginVertical: 10,
        paddingVertical: 12
    },
    register: {
        flexDirection: 'row'
    },
    registerText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
    },
    btnRegister: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700'
    }
});
