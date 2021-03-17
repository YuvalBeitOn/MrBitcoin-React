import { userService } from '../../services/UserService';


export function loadUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getUser();
            dispatch({ type: 'SET_USER', user });
            return user
        } catch (err) {
            console.error('Can not load user!', err);
        }
    };
}

export function addUser(newUser) {
    console.log('user is user actions:', newUser);

    return async (dispatch) => {
        try {
            const user = await userService.signup(newUser);
            dispatch({ type: 'SAVE_USER', user })
        } catch (err) {
            console.error('Can not add user!', err);
        }
    }
}

export function addMove(move) {
    return async (dispatch) => {
        try {
            const user = await userService.addMove(move);
            dispatch({ type: 'SAVE_USER', user })
        } catch (err) {
            console.error('Can not add move to user!', err);
        }
    }
}