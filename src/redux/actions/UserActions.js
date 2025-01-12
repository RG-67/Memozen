import { userLogin, userRegister } from "../../services/userApi";

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_USER_REQUEST' });
        const result = await userRegister(userData);
        dispatch({type: 'REGISTER_USER_SUCCESS', payload: result});
        return result;
    } catch (error) {
        dispatch({type: 'REGISTER_USER_FAILURE', payload: error});
        throw error;
    }
};



export const login = (userData) => async (dispatch) => {
    try {
        dispatch({type: 'LOGIN_USER_REQUEST'});
        const result = await userLogin(userData);
        dispatch({type: 'LOGIN_USER_SUCCESS', payload: result});
        return result;
    } catch (error) {
        dispatch({type: 'LOGIN_USER_FAILURE', payload: error});
        throw error;
    }
}