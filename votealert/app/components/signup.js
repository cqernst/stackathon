import React from 'react';
import { StyleSheet, Text, Button, View, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, AsynchStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';
import UserHome from './userhome.js';
// import SignUp from './signup.js';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import store, {newUser} from '../store';
import { Permissions, Notifications } from 'expo';
import { FormLabel, FormInput } from 'react-native-elements';


// const PUSH_ENDPOINT = 'http://192.168.1.179:8080/api/users/1/push-token';

// async function registerForPushNotificationsAsync() {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;

//   // only ask if permissions have not already been determined, because
//   // iOS won't necessarily prompt the user a second time.
//   if (existingStatus !== 'granted') {
//     // Android remote notification permissions are granted during the app
//     // install, so this will only ask on iOS
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }

//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }

//   // Get the token that uniquely identifies this device
//   let pushToken = await Notifications.getExpoPushTokenAsync()
//   console.log('pushtoken is:', pushToken)

//   // POST the token to your backend server from where you can retrieve it to send push notifications.
//   return axios.put(PUSH_ENDPOINT, {pushToken: String(pushToken)})
//         // .then(res => dispatch(updateSpaceship(res.data)))
//         .then(res => alert(res.data.email))
//         .catch(err => console.error(`FAILED`, err))
// };


class signUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      loading: false,
      streetAddress: '',
      municipality: '',
      state: '',
      zip: '',
    }
  }

  onSignUpPress(){
    this.setState({error:'', loading:true});
    const {email, password, streetAddress, municipality, state, zip} = this.state;

    store.dispatch(newUser(this.state.email, 
      this.state.password, 
      this.state.streetAddress,
      this.state.municipality,
      this.state.state,
      this.state.zip))
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then(() => {
    //   this.setState({errors:'', loading:false});
    //   this.props.navigation.navigate('Main');
    // })
    .catch(() => {
      this.setState({error: 'Authentication failed', loading:false})
    } )
  }

  renderButtonOrLoading(){
    if(this.state.loading){
      return <Text> Loading </Text>
    }
    return <View>    
      <LinearGradient
      colors={['#306dac', '#3477bb', '#275a8d']}
      style={styles.btngradient}>
        <TouchableOpacity
          onPress={this.onSignUpPress.bind(this)}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>
      
    </View>
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.wrapper}>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={email => this.setState({email})} />
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={password => this.setState({password})} secureTextEntry={true}/>
          <FormLabel>Street Address</FormLabel>
          <FormInput onChangeText={streetAddress => this.setState({streetAddress})} />
          <FormLabel>City</FormLabel>
          <FormInput onChangeText={municipality => this.setState({municipality})} />
          <FormLabel>State</FormLabel>
          <FormInput onChangeText={state => this.setState({state})} />
          <FormLabel>Zip</FormLabel>
          <FormInput onChangeText={zip => this.setState({zip})} />
          <Text>{this.state.error}</Text>
          {this.renderButtonOrLoading()}
          </View>
      </KeyboardAvoidingView>
    )
  }
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


const mapLogin = (state) => {
  return {
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
    marginTop: 60,
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
    marginLeft: 20,
    marginRight: 20,
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
