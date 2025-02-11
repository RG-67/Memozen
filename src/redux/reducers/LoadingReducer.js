


const initialState = { isLoading: false }



export const loadingReducer = (state = initialState, action) => {
    if (action.type.endsWith('_REQUEST')) {
        return { isLoading: true };
    }
    if (action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
        return { isLoading: false };
    }
    return state;
}