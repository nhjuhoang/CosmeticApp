import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, Image,
  TouchableOpacity, ScrollView, Dimensions
} from 'react-native';

import { firebaseApp } from '../Api/firebaseConfig';

import Icon from 'react-native-vector-icons/Ionicons';
import HeaderLogin from './HeaderLogin';
import icLogo from '../../Assets/logo.png';
import SaveToken from '../Api/SaveToken';

import Activity from '../ActivityIndicator/Activity';


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      fullname: '',
      email: '',
      password: '',
      repassword: '',
      phone: '',
      error: '',
      isShowActivity: false
    }
    )
  }

  _GoHome() {
    this.props.navigation.navigate('HomeScreen');
  }

  _Register() {
    this.setState({ isShowActivity: true });
    const { email, password, phone, repassword, fullname } = this.state;

    var isvalid = false;

    if (password.toString().length > 0 && repassword.toString().length > 0 && email.toString().length > 0 && phone.toString().length > 0 && fullname.toString().length > 0) {
      if (repassword === password) {
        isvalid = true;
        this.setState({ error: '' });
      } else {
        isvalid = false;
        this.setState({ error: 'repassword and password is valid!' });
      }
    } else {
      isvalid = false;
      this.setState({ error: 'field is no requie' });
    }

    if (isvalid) {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          firebaseApp.auth().currentUser.updateProfile({
            displayName: fullname,
          })
          //create database
          firebaseApp.database().ref('users').child(user.uid).set({
            phone: phone,
            email: user.email,
            fullname: fullname
          })
          console.log('Register ---=-=-=-=-=-=-=--=-', user);
          // login
          firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
              SaveToken(user.uid);
              //console.log(SaveToken(user.uid));
              this.setState({ isShowActivity: false, error: '' });
              this._GoHome();
            })
          this.setState({ isShowActivity: false });
        }).catch((error) => {
          this.setState({ isShowActivity: false });
          this.setState({ error: error.message });
        })
    } else {
      this.setState({ isShowActivity: false });
    }
  }

  render() {
    const { container, inputbox, iconStyle,
      btnText, fromLogin, button,
      registerText, register, btnRegister } = styles;
    const { isShowActivity } = this.state;
    const textError = this.state.error ? <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'red' }}>{this.state.error}</Text> : null;
    const activity = isShowActivity ? <Activity animating={isShowActivity} /> : null;
    return (
      <View style={{ flex: 1 }}>
        <View style={container}>
          <View style={fromLogin}>
            <Image source={icLogo} style={iconStyle} />
            {isShowActivity ? activity : textError}

            <TextInput style={inputbox}
              placeholder='Full Name'
              placeholderTextColor='#ffffff'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              autoCorrect={false}
              editable={!this.state.isShowActivity}
              onChangeText={(text) => this.setState({ fullname: text })}
            />

            <TextInput style={inputbox}
              placeholder='Phone number'
              placeholderTextColor='#ffffff'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              dataDetectorTypes='phoneNumber'
              phone-pad='phone-pad'
              autoCorrect={false}
              editable={!this.state.isShowActivity}
              onChangeText={(text) => this.setState({ phone: text })}
            />

            <TextInput style={inputbox}
              placeholder='Email'
              keyboardType='email-address'
              placeholderTextColor='#ffffff'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              autoCorrect={false}
              editable={!this.state.isShowActivity}
              onChangeText={(text) => this.setState({ email: text })}
            />

            <TextInput style={inputbox}
              placeholder='Password'
              secureTextEntry={true}
              placeholderTextColor='#ffffff'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              autoCorrect={false}
              editable={!this.state.isShowActivity}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <TextInput style={inputbox}
              placeholder='Password Confirm'
              secureTextEntry={true}
              placeholderTextColor='#ffffff'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              autoCorrect={false}
              editable={!this.state.isShowActivity}
              onChangeText={(text) => this.setState({ repassword: text })}
            />
            <TouchableOpacity style={button} onPress={() => this._Register()}>
              <Text style={btnText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={register}>
            <Text style={registerText}>already have an account. </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={btnRegister}>Login now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3B3B3',
    width: width,
    height: height
  },
  iconStyle: {
    width: 60,
    height: 80,
    marginBottom: 10
  },
  inputbox: {
    width: 300,
    height: 50,
    textAlign: 'center',
    borderRadius: 25,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#ffffff',
    fontSize: 16,
    marginVertical: 5
  },
  fromLogin: {
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
