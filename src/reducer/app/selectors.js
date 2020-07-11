import NameSpace from '../name-space.js';

export const getCurrentCity = (state) => {
  return state[NameSpace.APP].city;
};

export const getAllCities = (state) => {
  return state[NameSpace.APP].allCities;
};
