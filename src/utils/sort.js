import {SortType} from '../reducer/app/app.js';

const lowHighSort = (offers) => {
  return offers.sort((a, b) => {
    return a.price - b.price;
  });
};

const highLowSort = (offers) => {
  return offers.sort((a, b) => {
    return b.price - a.price;
  });
};

const topRatedFirstSort = (offers) => {
  return offers.sort((a, b) => {
    return b.rating - a.rating;
  });
};

export const getSortedOffers = (offers, sortType) => {
  switch (sortType) {
    case SortType.LOW_TO_HIGH:
      return lowHighSort(offers);
    case SortType.HIGH_TO_LOW:
      return highLowSort(offers);
    case SortType.TOP_RATED_FIRST:
      return topRatedFirstSort(offers);
    default:
      return offers;
  }
};

export default getSortedOffers;
