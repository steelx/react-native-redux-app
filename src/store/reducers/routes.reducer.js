import { ActionConst } from 'react-native-router-flux';

const initialState = {
    scene: {},
};

export default function routesReducer(state = initialState, action = {}) {
    switch (action.type) {
        // focus action is dispatched when a new screen comes into focus
        case ActionConst.FOCUS:
            console.log(action);
            return {
                ...state,
                scene: action.scene,
            };

        // ...other actions

        default:
            return state;
    }
}
