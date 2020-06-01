import reducer from "./auth";
import * as actionTpyes from '../action/actionTypes';

describe('Auth Reucer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            userId: null,
            error: null,
            token: null,
            authRedirectPath: '/'
        })
    });

    it('should store token when login', () => {
        expect(reducer({
            loading: false,
            userId: null,
            error: null,
            token: null,
            authRedirectPath: '/'
        }, {
            type: actionTpyes.AUTH_SUCCESS,
            isToken: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            loading: false,
            userId: 'some-userId',
            error: null,
            token: 'some-token',
            authRedirectPath: '/'
        })
    })
})