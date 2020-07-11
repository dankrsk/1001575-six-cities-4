const CITIES_COUNT = 6;

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
