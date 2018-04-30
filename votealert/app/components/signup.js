import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, AsynchStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';
import UserHome from './userhome.js';
// import SignUp from './signup.js';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import store, {auth} from '../store';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://192.168.1.179:8080/api/users/1/push-token';

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
        .then(res => alert(res.data.email))
        .catch(err => console.error(`FAILED`, err))
};


  // return fetch(PUSH_ENDPOINT, {
  //   method: 'PUT',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     pushToken: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });
// }

// const AuthForm = (props) => {

  // const {name, displayName, login, error} = props 


class signUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    // this.login = this.login.bind(this)
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

// componentDidUpdate() {
//   if(this.props.user.email){
//     this.props.navigation.navigate('UserHome')
//   } 
// }

  render() {
    return (
      <View style={styles.container}>
        <Text>Made it!</Text>
        <TouchableOpacity onPress={registerForPushNotificationsAsync()}>Set up push notifications</TouchableOpacity>
      </View>
    );
  }

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

// signUp = () => {
//   this.props.navigation.navigate('SignUp')

// }

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

// AuthLogin.propTypes = {
//   email: PropTypes.string.isRequired,
// }

export const SignUp = connect(mapLogin)(signUpForm)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EBF0',
    paddingLeft: 40,
    paddingRight: 40,
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
    fontSize: 30,
    marginBottom: 40,
    marginTop: 40,
    color: '#F60045',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 4,

  },
  TextInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderLeftColor: '#F60045',
    // borderLeftWidth: 1,
    borderBottomColor: '#F60045',
    borderBottomWidth: 2,
    color: '#F60045',
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
    color: '#F60045',
    marginTop: 10,
    marginBottom: 80,
  },
})
