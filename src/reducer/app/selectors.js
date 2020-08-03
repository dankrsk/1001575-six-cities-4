import NameSpace from '../../const.js';

export const getCurrentCity = (state) => {
  return state[NameSpace.APP].city;
};

export const getAllCities = (state) => {
  return state[NameSpace.APP].allCities;
};

export const getSortType = (state) => {
  return state[NameSpace.APP].sortType;
};
