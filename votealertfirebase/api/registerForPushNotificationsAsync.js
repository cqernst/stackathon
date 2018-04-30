import { Constants, Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDUhfHHATVE0yAe7BfqJCssNeYMOKrseJs",
    authDomain: "votealert-app.firebaseapp.com",
    databaseURL: "https://votealert-app.firebaseio.com",
    projectId: "votealert-app",
    storageBucket: "votealert-app.appspot.com",
    messagingSenderId: "1060469414269"
})

export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();



  userID = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userID).update({ token: token });

});