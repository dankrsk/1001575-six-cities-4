import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {mock} from '../../shared/test-mocks.js';

const offers = mock.offers;
const rawOffers = mock.rawOffers;

describe(`Data reducer tests`, () => {
  it(`Reducer should change offers`, () => {
    expect(reducer({
      offers: [offers[0], offers[1]],
      status: `OK`,
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [offers[1], offers[2]],
    })).toEqual({
      offers: [offers[1], offers[2]],
      status: `OK`,
    });
  });

  it(`Reducer should change status`, () => {
    expect(reducer({
      offers: [],
      status: `LOADING`,
    }, {
      type: ActionType.CHANGE_STATUS,
      payload: `OK`,
    })).toEqual({
      offers: [],
      status: `OK`,
    });
  });

  it(`Reducer should update offer`, () => {
    const newOffer = Object.assign({}, offers[0], {
      isFavorite: !offers[0].isFavorite,
    });

    expect(reducer({
      offers: [offers[0], offers[1], offers[3]],
      status: `OK`,
    }, {
      type: ActionType.UPDATE_OFFER,
      payload: newOffer,
    })).toEqual({
      offers: [newOffer, offers[1], offers[3]],
      status: `OK`,
    });
  });

  it(`ActionCreators should return correct actions`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
    expect(ActionCreator.updateOffer(offers[0])).toEqual({
      type: ActionType.UPDATE_OFFER,
      payload: offers[0],
    });
    expect(ActionCreator.changeStatus(`OK`)).toEqual({
      type: ActionType.CHANGE_STATUS,
      payload: `OK`,
    });
  });

  it(`Operation should make correct API call to /hotels`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, rawOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [offers[0]],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_STATUS,
          payload: `OK`,
        });
      });
  });

  it(`Operation should change favorite field`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const updaterFavoriteField = Operation.updateFavoriteField(1);

    apiMock
      .onPost(`/favorite/1/0`)
      // eslint-disable-next-line
      .reply(200, Object.assign({}, rawOffers[0], {is_favorite: false}));

    return updaterFavoriteField(dispatch, () => {
      return {
        DATA: {
          offers: [offers[0]],
        },
      };
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER,
          payload: Object.assign({}, offers[0], {isFavorite: false}),
        });
      });
  });
});
