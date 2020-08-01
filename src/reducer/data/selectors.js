import {createSelector} from 'reselect';
import {getCurrentCity, getSortType} from '../app/selectors.js';
import {getSortedOffers} from '../../utils/sort.js';
import NameSpace from '../../const.js';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    getSortType,
    (offers, city, sortType) => {
      return getSortedOffers(offers.filter((offer) => {
        return offer.city === city;
      }), sortType);
    }
);

export const getStatus = (state) => {
  return state[NameSpace.DATA].status;
};

export const getRawComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getComments = createSelector(
    getRawComments,
    (comments) => {
      return comments.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
);

export const getFavoriteOffers = createSelector(
    getOffers,
    (offers) => {
      const favoriteOffers = {};
      offers.forEach((offer) => {
        if (offer.isFavorite) {
          if (favoriteOffers.hasOwnProperty(offer.city)) {
            favoriteOffers[offer.city].push(offer);
          } else {
            favoriteOffers[offer.city] = new Array(offer);
          }
        }
      });
      return favoriteOffers;
    }
);

export const getNearPlaces = (state) => {
  return state[NameSpace.DATA].nearPlaces;
};
