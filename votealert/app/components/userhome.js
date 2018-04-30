import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, AsynchStorage } from 'react-native';
import {ListItem, Card, Header} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';
import axios from 'axios';
import {connect} from 'react-redux';
import store, {logout} from '../store';

class UserHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: [{'date': 'June 26, 2018', 'description': 'Federal Primary Election'}, {'date': 'September 13, 2018', 'description': 'State/Local Primary Election'}, {'date': 'November 6, 2018', 'description':'General Election'}]
    }
  }

  componentDidUpdate() {
    if(!this.props.user.email){
      this.props.navigation.navigate('Home')
    } 
  }

  render() {
    return (
      <View>
        <Header
          placement="left"
          centerComponent={{ text: 'Upcoming Elections', style: { color: '#fff', fontWeight: 'bold' } }}
          rightComponent={<TouchableOpacity style={styles.signoutbtn} onPress={this.signout}>
          <Text style={styles.signoutbtn}>Sign Out</Text>
        </TouchableOpacity>}
          backgroundColor='#306dac'
        />
        <ListItem
          title='June 26, 2018'
          subtitle='Federal Primary Election'
        />
        <ListItem
          title='September 13, 2018'
          subtitle='State/Local Primary Election'
        />
        <ListItem
          title='November 6, 2018'
          subtitle='General Election'
        />
      </View>
    );
  }

  signout = () => {
        // alert(this.state.email)
        // evt.preventDefault()
        // const formName = evt.target.name
        // const email = evt.target.email.value
        // const password = evt.target.password.value
      store.dispatch(logout(this.state.email, this.state.password))
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    user: state.user,
  }
}

export const UserHomeScreen = connect(mapStateToProps)(UserHome)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
    marginTop: 40,
  },
  text: {
    color: 'black'
  },
  signoutbtn: {
    color: 'white'
  }
})
