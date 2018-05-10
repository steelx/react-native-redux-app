import firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font, AppLoading } from "expo";
import Routes from './src/Routes';
import { Root } from 'native-base';
import { Actions } from 'react-native-router-flux';
import store from './src/configureStore';
import config from './firebase.config';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
    Actions.home();

    //firebase
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loaded: true });
      console.log("user", user);
      if (user) {
        store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      } else {
        Actions.signin();
      }
    });
  }
  render() {
    return (
      <Root>
        {this.state.loading ? <AppLoading /> : <Routes />}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
