import {createSelector} from 'reselect';
import {getCurrentCity} from '../app/selectors.js';
import NameSpace from '../../const.js';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => {
      return offers.filter((offer) => {
        return offer.city === city;
      });
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
