import {SortType} from '../reducer/app/app.js';

const getLowHighSort = (offers) => {
  return offers.sort((a, b) => {
    return a.price - b.price;
  });
};

const getHighLowSort = (offers) => {
  return offers.sort((a, b) => {
    return b.price - a.price;
  });
};

const getTopRatedFirstSort = (offers) => {
  return offers.sort((a, b) => {
    return b.rating - a.rating;
  });
};

export const getSortedOffers = (offers, sortType) => {
  switch (sortType) {
    case SortType.LOW_TO_HIGH:
      return getLowHighSort(offers);
    case SortType.HIGH_TO_LOW:
      return getHighLowSort(offers);
    case SortType.TOP_RATED_FIRST:
      return getTopRatedFirstSort(offers);
    default:
      return offers;
  }
};

export default getSortedOffers;
