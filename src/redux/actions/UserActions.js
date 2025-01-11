import { userRegister } from "../../services/userApi";

export const registerUserRequest = () => ({
    type: 'REGISTER_USER_REQUEST'
});

export const registerUserSuccess = (user) => ({
    type: 'REGISTER_USER_SUCCESS',
    payload: user,
});

export const registerUserFailure = (user) => ({
    type: 'REGISTER_USER_FAILURE',
    payload: user,
});



export const register = (userData) => async (dispatch) => {
    try {
        const result = await userRegister(userData);
        dispatch({type: 'REGISTER_USER_SUCCESS', payload: result});
    } catch (error) {
        dispatch({type: 'REGISTER_USER_FAILURE', payload: error});
    }
};