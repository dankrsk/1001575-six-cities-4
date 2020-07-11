import {createSelector} from 'reselect';
import {getCurrentCity} from '../app/selectors.js';
import NameSpace from '../name-space.js';

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
