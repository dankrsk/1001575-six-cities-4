import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './user.js';
import {mock} from '../../shared/test-mocks.js';

const mockAuthInfo = mock.authInfo;
const rawAuthInfo = mock.rawAuthInfo;

describe(`User reducer tests`, () => {
  it(`Reducer should change auth status`, () => {
    expect(reducer({
      authorizationStatus: `NO_AUTH`,
      authInfo: {},
    }, {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: `AUTH`
    })).toEqual({
      authorizationStatus: `AUTH`,
      authInfo: {},
    });
  });

  it(`Reducer should change authInfo`, () => {
    expect(reducer({
      authorizationStatus: `NO_AUTH`,
      authInfo: {},
    }, {
      type: ActionType.LOAD_AUTH_INFO,
      payload: mockAuthInfo,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
      authInfo: mockAuthInfo,
    });
  });

  it(`ActionCreators should return correct actions`, () => {
    expect(ActionCreator.changeAuthorizationStatus(`AUTH`)).toEqual({
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: `AUTH`,
    });
    expect(ActionCreator.loadAuthInfo(mockAuthInfo)).toEqual({
      type: ActionType.LOAD_AUTH_INFO,
      payload: mockAuthInfo,
    });
  });

  it(`Operation should make correct API call to /login`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authChecker = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, rawAuthInfo);

    return authChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: mockAuthInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTH_STATUS,
          payload: `AUTH`,
        });
      });
  });

  it(`Operation should make correct login`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginer = Operation.login({
      login: mockAuthInfo.email,
      password: `123`,
    });

    apiMock
      .onPost(`/login`, {
        email: mockAuthInfo.email,
        password: `123`,
      })
      .reply(200, rawAuthInfo);

    return loginer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: mockAuthInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTH_STATUS,
          payload: `AUTH`,
        });
      });
  });
});
