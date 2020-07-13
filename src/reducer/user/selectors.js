import NameSpace from '../../const.js';

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getAuthInfo = (state) => {
  return state[NameSpace.USER].authInfo;
};
