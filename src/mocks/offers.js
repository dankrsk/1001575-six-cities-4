const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

const TYPES = [
  `Apartment`,
  `Room`,
  `House`,
  `Hotel`,
];

const TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

const COORDINATES = [
  [48.8534, 2.3488],
  [50.9333, 6.95],
  [50.8504, 4.34878],
  [52.38333, 4.9],
  [53.5753, 10.0153],
  [51.2217, 6.77616],
  [48.86, 2.35],
  [50.94, 6.96],
  [50.86, 4.35],
  [52.39, 4.96],
  [53.58, 10.02],
  [51.23, 6.78],
];

const getOffer = (i) => {
  return {
    id: Math.round(Math.random() * 10000),
    city: CITIES[i % 6],
    type: TYPES[Math.round(Math.random() * 3)],
    title: TITLES[Math.round(Math.random() * 4)],
    price: Math.round(Math.random() * 100),
    rating: Math.round(Math.random() * 5),
    isPremium: Math.random() > 0.5 ? true : false,
    photo: `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`,
    coordinates: COORDINATES[i % 12],
  };
};

export const getOffers = (count) => {
  return Array(count).fill(``).map((offer, i) => getOffer(i));
};
