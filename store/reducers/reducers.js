import * as actionTypes from "../types";

const initialState = {
    user:{isLoggedIn:false},
    mode: false,
}
const reducer =  (state = initialState , action)=>{
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.value
            }      
        case actionTypes.SET_MODE:
            return {
                ...state,
                mode: !state.mode
            }      
        case actionTypes.REHYDRATE:
            const rehydrated = (action && action.value) || {}
            return { ...state, ...rehydrated }        
    }
    return state;
}

export default reducer;