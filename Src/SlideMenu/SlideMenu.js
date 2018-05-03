import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../Api/firebaseConfig';
import GetToken from '../Api/GetToken';
import SaveToken from '../Api/SaveToken';

export default class SlideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, arrCart: [] };
  }

  _Logout() {
    firebaseApp.auth().signOut().then(() => {
      this.setState({ user: null })
      SaveToken('');
    }).catch(function (error) {
      // An error happened.
    });
  }

  _getuser(id) {
    firebaseApp.database().ref('/users/' + id).once('value')
      .then((snaps) => {
        if (snaps !== 'null')
          this.setState({ user: snaps.toJSON() });
      })
  }

  componentWillReceiveProps() {
    GetToken()
      .then(token => {
        if (token !== '') {
          this._getuser(token)
        }
      })
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }

  componentWillMount() {
    GetToken()
      .then(token => {
        if (token !== '') {
          this._getuser(token)
        }
      })
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }


  render() {
    const {
      container, profile, btnStyle, btnText,
      btnSignInStyle, btnTextSignIn, loginContainer,
      username, iconStyle
    } = styles;
    const { user } = this.state;
    //console.log(user)
    const logoutJSX = (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={btnStyle} onPress={() => this.props.navigation.navigate('logInScreen')} >
          <Text style={btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
    const loginJSX = (
      <View style={loginContainer}>
        <Text style={username}>{user ? user.fullname : null}</Text>
        <View>
          <TouchableOpacity style={btnSignInStyle} onPress={() => this.props.navigation.navigate('OrderScreen', { email: user.email })}>
            <Text style={btnTextSignIn}><Icon name="md-time" color="white" size={23} style={iconStyle} />  Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnSignInStyle}>
            <Text style={btnTextSignIn}><Icon name="ios-create" color="white" size={23} style={iconStyle} />  Infomation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnSignInStyle} onPress={() => this._Logout()} >
            <Text style={btnTextSignIn}><Icon name="md-log-out" color="white" size={23} style={iconStyle} />  Log out</Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
    const mainJSX = this.state.user ? loginJSX : logoutJSX;
    return (
      <View style={container}>
        <Image source={{ uri: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/14495439_892702627529004_3179013264007747771_n.jpg?_nc_cat=0&oh=79f68b6394ee4b637275aff60bb909a6&oe=5B616719' }} style={profile} />
        {mainJSX}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3B3B3',
    borderRightWidth: 3,
    borderColor: '#fff',
    alignItems: 'center'
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20
  },
  btnStyle: {
    height: 50,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 70
  },
  btnText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  btnSignInStyle: {
    height: 50,
    width: 200,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnTextSignIn: {
    color: 'white',
    fontSize: 15
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  username: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 15
  },
  iconStyle: {
    paddingTop: 10
  }

});
