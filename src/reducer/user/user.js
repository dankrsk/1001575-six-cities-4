import {extend} from '../../utils/common.js';
import {getAdaptedAuthInfo} from '../../adapter.js';

export const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
};

export const ActionType = {
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`,
  LOAD_AUTH_INFO: `LOAD_AUTH_INFO`,
};

export const ActionCreator = {
  changeAuthorizationStatus: (status) => {
    return {
      type: ActionType.CHANGE_STATUS,
      payload: status,
    };
  },
  loadAuthInfo: (authInfo) => {
    return {
      type: ActionType.LOAD_AUTH_INFO,
      payload: authInfo,
    };
  },
};

export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
              .then(() => {
                dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
              })
              .catch((err) => {
                throw err;
              });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.loadAuthInfo(getAdaptedAuthInfo(response.data)));
      dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return extend(state, {
        status: action.payload,
      });
    case ActionType.LOAD_AUTH_INFO:
      return extend(state, {
        authInfo: action.payload,
      });
    default:
      return state;
  }
};
