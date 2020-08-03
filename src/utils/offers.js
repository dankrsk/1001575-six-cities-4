import {SortType} from '../reducer/app/app.js';

const CITIES_COUNT = 6;
const MULTIPLIER_FOR_RATING = 20;

export const getCitiesFromOffers = (offers) => {
  const cities = [];
  let i = 0;

  while (cities.length < CITIES_COUNT && i < offers.length) {
    const city = offers[i].city;

    if (!cities.includes(city)) {
      cities.push(city);
    }

    i++;
  }

  return cities;
};

export const getOfferById = (offers, id) => {
  return offers.find((offer) => {
    return offer.id === id;
  });
};

export const getCalculatedRating = (rating) => {
  return Math.round(rating) * MULTIPLIER_FOR_RATING;
};

export const getType = (str) => {
  switch (str) {
    case `room`:
      return `Private Room`;
    default:
      return str[0].toUpperCase() + str.slice(1);
  }
};

export const getSortType = (sortType) => {
  switch (sortType) {
    case SortType.LOW_TO_HIGH:
      return `Price: low to high`;
    case SortType.HIGH_TO_LOW:
      return `Price: high to low`;
    case SortType.TOP_RATED_FIRST:
      return `Top rated first`;
    default:
      return `Popular`;
  }
};
