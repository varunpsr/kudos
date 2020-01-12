import {
    AUTH_UPDATED,
    LOGIN_SUCCESS,
    RESET_AUTHENTICATION
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    user_id: null,
    first_name: null,
    last_name: null,
    organization_id: null,
    organization_name: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_UPDATED:
            return { ...state, token: action.payload.token, user_id: action.payload.user_id, name: action.payload.name, email: action.payload.email };
        case LOGIN_SUCCESS:
            return { ...state, token: action.payload, first_name: action.payload.first_name, last_name: action.payload.last_name, organization_id: action.payload.organization_id, organization_name: action.payload.organization_name };
        case RESET_AUTHENTICATION:
            return { ...state, ...INITIAL_STATE};
        default:
            return state;
    }
}