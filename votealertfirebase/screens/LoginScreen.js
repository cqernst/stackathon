import React from 'react';
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';

export default class login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: '',
			loading: false,
		}
	}

	onLoginPress(){
			console.log('made it into onloginpress')
			this.setState({error:'', loading:true});

			const{email, password} = this.state;
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('made it through firebase')
				this.setState({errors:'', loading:false});
				this.props.navigation.navigate('Main');
			})
			.catch(() => {
				this.setState({error: 'Authentication failed', loading:false})
			} )
		}

	onSignUpPress(){
		this.setState({error:'', loading:true});
		const {email, password} = this.state;

		console.log('made it into onsignuppress, email is', email)
		console.log('password is', password)

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({errors:'', loading:false});
			this.props.navigation.navigate('Main');
		})
		.catch(() => {
			this.setState({error: 'Authentication failed', loading:false})
		} )
	}

	renderButtonOrLoading(){
		if(this.state.loading){
			return <Text> Loading </Text>
		}
		return <View>
			<Button
			onPress={this.onLoginPress.bind(this)}
			title='Login' />			
			<Button
			onPress={this.onSignUpPress.bind(this)}
			title='Sign Up' />
		</View>
	}

	render(){
		return(
			<View>
				<FormLabel>Email</FormLabel>
				<FormInput onChangeText={email => this.setState({email})} />
				<FormLabel>password</FormLabel>
				<FormInput onChangeText={password => this.setState({password})} />
				<Text>{this.state.error}</Text>
				{this.renderButtonOrLoading()}
			</View>
		)
	}
}


