import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, Image,
  TouchableOpacity, ActivityIndicator
} from 'react-native';

import { firebaseApp } from '../Api/firebaseConfig';
import SaveToken from '../Api/SaveToken';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderLogin from './HeaderLogin';
import icLogo from '../../Assets/logo.png';

import Activity from '../ActivityIndicator/Activity';

//import { connect } from 'react-redux';


export default class Login extends Component {

  _Goback() {
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    this.state = ({
      email: '',
      password: '',
      error: '',
      isShowActivity: false
    })
  }

  _Login() {
    this.setState({ isShowActivity: true });
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        SaveToken(user.uid);
       // console.log(SaveToken(user.uid));
        this.setState({ isShowActivity: false , error: ''});
        this._Goback();
      }).catch((error) => {
        this.setState({ isShowActivity: false });
        this.setState({ error: error.message });
      })
  }

  _GoRegister() {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const { isShowActivity } = this.state;
    const { container, inputbox, iconStyle,
      btnText, fromLogin, button,
      registerText, register, btnRegister } = styles;

    const textError = this.state.error ? <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'red' }}>{this.state.error}</Text> : null;
    const activity = isShowActivity ? <Activity animating={isShowActivity} /> : null;
    
    return (
      <View style={{ flex: 1 }}>
        <HeaderLogin goback={this._Goback.bind(this)} />
        <View style={container}>
          <View style={fromLogin}>
            <Image source={icLogo} style={iconStyle} />
            {isShowActivity ? activity : textError}
            <TextInput style={inputbox}
              placeholder='Email'
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
            <TouchableOpacity style={button} onPress={() => this._Login()}>
              <Text style={btnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={register}>
            <Text style={registerText}>Don't have account ? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              <Text style={btnRegister}>Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function StateToProps(state) {
  return {
    USER: state.user
  };
}
// connect(StateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#ffffff',
    fontSize: 16,
    marginVertical: 10
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
