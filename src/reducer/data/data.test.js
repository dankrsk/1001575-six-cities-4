import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {mock} from '../../shared/test-mocks.js';

const offers = mock.offers;
const rawOffers = mock.rawOffers;
const rawComments = mock.rawComments;
const comments = mock.comments;

describe(`Data reducer tests`, () => {
  it(`Reducer should change offers`, () => {
    expect(reducer({
      offers: [offers[0], offers[1]],
      status: `OK`,
      comments,
      nearPlaces: offers,
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [offers[1], offers[2]],
    })).toEqual({
      offers: [offers[1], offers[2]],
      status: `OK`,
      comments,
      nearPlaces: offers,
    });
  });

  it(`Reducer should change comments`, () => {
    expect(reducer({
      offers,
      status: `OK`,
      comments: [comments[0]],
      nearPlaces: offers,
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: [comments[1]],
    })).toEqual({
      offers,
      status: `OK`,
      comments: [comments[1]],
      nearPlaces: offers,
    });
  });

  it(`Reducer should change near places`, () => {
    expect(reducer({
      offers,
      status: `OK`,
      comments,
      nearPlaces: [offers[0], offers[1]],
    }, {
      type: ActionType.LOAD_NEAR_PLACES,
      payload: [offers[1], offers[2]],
    })).toEqual({
      offers,
      status: `OK`,
      comments,
      nearPlaces: [offers[1], offers[2]],
    });
  });

  it(`Reducer should change status`, () => {
    expect(reducer({
      offers,
      status: `LOADING`,
      comments,
      nearPlaces: offers,
    }, {
      type: ActionType.CHANGE_STATUS,
      payload: `OK`,
    })).toEqual({
      offers,
      status: `OK`,
      comments,
      nearPlaces: offers,
    });
  });

  it(`Reducer should update offer`, () => {
    const newOffer = Object.assign({}, offers[0], {
      isFavorite: !offers[0].isFavorite,
    });
    expect(reducer({
      offers: [offers[0], offers[1], offers[2]],
      status: `OK`,
      comments,
      nearPlaces: offers,
    }, {
      type: ActionType.UPDATE_OFFER,
      payload: newOffer,
    })).toEqual({
      offers: [newOffer, offers[1], offers[2]],
      status: `OK`,
      comments,
      nearPlaces: offers,
    });
  });

  it(`ActionCreators should return correct actions`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    });
    expect(ActionCreator.loadNearPlaces(offers)).toEqual({
      type: ActionType.LOAD_NEAR_PLACES,
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
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [offers[0]],
        });
      });
  });

  it(`Operation should make correct API call to /comments`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, rawComments);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [comments[0]],
        });
      });
  });

  it(`Operation should upload new comment`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const data = {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      rating: 1,
    };
    const commentsUploader = Operation.uploadComment(1, data);

    apiMock
      .onPost(`/comments/1`, data)
      .reply(200, rawComments);

    return commentsUploader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [comments[0]],
        });
      });
  });

  it(`Operation should make correct API call to /hotels/{id}/nearby`, () => {
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearPlacesLoader = Operation.loadNearPlaces(1);

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, rawOffers);

    return nearPlacesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEAR_PLACES,
          payload: [offers[0]],
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
