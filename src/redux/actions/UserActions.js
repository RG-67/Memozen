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