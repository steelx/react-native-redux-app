import firebase from 'firebase';
import React from 'react';
import Main from './Main';
import Signup from './components/scenes/Signup';
import Signin from './components/scenes/Signin';
import { Stack, Scene, Router } from 'react-native-router-flux';

import { connect, Provider } from 'react-redux';
import configureStore from './configureStore';
import requireAuth from './utils/requireAuth.container';
const store = configureStore();
const RouterWithRedux = connect()(Router);

const Routes = () => (
    <Provider store={store}>
        <RouterWithRedux>
            <Stack key="root">
                <Stack key="auth">
                    <Scene key="signin" hideNavBar component={Signin} title="Please Sign in" />
                    <Scene key="signup" hideNavBar component={Signup} title="Register" />
                </Stack>
                <Stack key="main">
                    <Scene hideNavBar key="home" component={requireAuth(Main)} title="Home" />
                </Stack>
            </Stack>
        </RouterWithRedux>
    </Provider>
);

const styles = {
    navigationBarStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
};

export default Routes;