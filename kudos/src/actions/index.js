import { AUTH_UPDATED, RESET_AUTHENTICATION } from './types';

export const updateAuth = (payload) => {
    return {
        type : AUTH_UPDATED,
        payload : payload
    }
}

export const resetAuth = () => {
    return {
        type: RESET_AUTHENTICATION,
        payload: {}
    }
}