import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsynchStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

export default class UserHome extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Made it!</Text>
      </View>
    );
  }

}


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
  text: {
    color: '#fff'
  }
})
