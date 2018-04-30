import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, AsynchStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';
import { UserHomeScreen } from './userhome.js';
import SignUp from './signup.js';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import store, {auth} from '../store';
import { Permissions, Notifications } from 'expo';


// const AuthForm = (props) => {

  // const {name, displayName, login, error} = props 


class AuthLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  // componentDidMount() {
  //   // this._loadInitialState().done();
  // }

  // _loadInitialState = async () => {
  //   let value = await AsynchStorage.getitem('user');
  //   if (value !== null) {
  //     this.props.navigation.navigate('UserHome')
  //   }
  // }

componentDidUpdate() {
  if(this.props.user.email){

    const PUSH_ENDPOINT = 'http://172.16.25.113:8080/api/users/2/push-token'
    // 'http://192.168.1.179:8080/api/users/2/push-token';

    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      let pushToken = await Notifications.getExpoPushTokenAsync()
      console.log('pushtoken is:', pushToken)

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      return axios.put(PUSH_ENDPOINT, {pushToken: String(pushToken)})
            // .then(res => dispatch(updateSpaceship(res.data)))
            .then(res => console.log(res.data.email))
            .catch(err => console.error(`FAILED`, err))
    };
    this.props.navigation.navigate('UserHome')
  } 
}

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <ImageBackground source={{uri: 'https://www.gannett-cdn.com/-mm-/42fefce23c2bcbab374417e65446e85656a30577/c=0-329-2400-1685&r=x803&c=1600x800/local/-/media/2016/11/01/DetroitFreePress/DetroitFreePress/636136355295808894-080216-voting-polls-rg-03.jpg'}} style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text style={styles.header}>Welcome to VoteAlert!</Text>
            <TextInput
              style={styles.TextInput} placeholder='Email' placeholderTextColor="#fff"
              onChangeText={ (email) => this.setState({email}) }
              value={this.state.email}
            />
            <TextInput
              style={styles.TextInput} placeholder='Password' placeholderTextColor="#fff"
              onChangeText={ (password) => this.setState({password}) }
              secureTextEntry={true} value={this.state.password}
            />
            <LinearGradient
              colors={['#306dac', '#3477bb', '#275a8d']}
              style={styles.btngradient}>
              <TouchableOpacity
                onPress={this.login}>
                <Text style={styles.btntext}>Log in</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignUp')}>
              <View>
                <Text style={styles.linktext}>Sign Up</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>

      </KeyboardAvoidingView>
    );
  }



  // <View colors={['#00A5D2', '#f9feff']} style={styles.container}>

//          <View style={styles.innercontainer}>

  // login = () => {
  //   axios.post('http://192.168.1.179:8080/auth/login', { email: this.state.email, password: this.state.password })
  //   .then((res) => res.data)
  //   .then((res1) => {
  //     this.props.navigation.navigate('UserHome')
  //   })
  //   .done()
  // }


// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {

  signUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  login = () => {
        // alert(this.state.email)
        // evt.preventDefault()
        // const formName = evt.target.name
        // const email = evt.target.email.value
        // const password = evt.target.password.value
      store.dispatch(auth(this.state.email, this.state.password))
      this.setState({email: '', password: ''})
  }


}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user,
  }
}

export const Login = connect(mapLogin)(AuthLogin)

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // // resizeMode: 'cover',
    // alignItems: 'center',
    // justifyContent: 'center',
    // // backgroundColor: '#E8EBF0',
    // paddingLeft: 40,
    // paddingRight: 40,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#E8EBF0',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  innercontainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#C6D2D0',
    borderLeftColor: '#F60045',
    borderTopColor: '#F60045',
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    // borderTopWidth: 1,
    backgroundColor: '#F8F9FB',
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 40,
    marginTop: 100,
    borderRadius: 4,

  },
  header: {
    opacity: 0.8,
    fontSize: 30,
    marginBottom: 40,
    marginTop: 40,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 4,

  },
  TextInput: {
    opacity: 0.7,
    alignSelf: 'stretch',
    fontWeight: 'bold',
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderLeftColor: '#F60045',
    // borderLeftWidth: 1,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    color: '#fff',
    fontSize: 18
  },
  btngradient: { 
    padding: 15, 
    alignSelf: 'stretch', 
    alignItems: 'center', 
    borderRadius: 4,
    marginTop: 10,
  },
  btntext: {
    color: '#fff',
    alignSelf: 'stretch',
    fontSize: 18,
  },
  linktext: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 80,
    alignSelf: 'center',
  },
})
