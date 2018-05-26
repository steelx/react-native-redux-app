import firebase from 'firebase';
import React from 'react';
import {AppLoading, Font} from "expo";
import Routes from './src/Routes';
import {Root} from 'native-base';
import store from './src/store/configureStore';
import config from './firebase.config';
import {SIGN_IN_SUCCESS} from './src/store/actions/auth.actions';
import {setProfileLocation} from './src/store/actions/profile.actions';

// ignore firebase warn
console.ignoredYellowBox = [
    'Setting a timer'
];

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        //firebase
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged( (user) => {
            if (user !== null) {
                // await setProfileLocation({uid: user.uid})(store.dispatch);
                store.dispatch({type: SIGN_IN_SUCCESS, payload: user});
            }
        });
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        return (
            <Root>
                {this.state.loading ? <AppLoading/> : <Routes/>}
            </Root>
        );
    }
}
