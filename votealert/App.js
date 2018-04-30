import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Login } from './app/components/login.js';
import { UserHomeScreen } from './app/components/userhome.js';
import { SignUp } from './app/components/signup.js'
import { Provider } from 'react-redux';
import store from './app/store';

const Application = StackNavigator({
  Home: { screen: Login },
  UserHome: { screen: UserHomeScreen },
  SignUp: { screen: SignUp },

  }, {
    navigationOptions: {
      header: false,
    }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}


