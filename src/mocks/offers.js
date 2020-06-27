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

const getOffer = () => {
  return {
    id: Math.round(Math.random() * 10000),
    type: TYPES[Math.round(Math.random() * 3)],
    title: TITLES[Math.round(Math.random() * 4)],
    price: Math.round(Math.random() * 100),
    rating: Math.round(Math.random() * 5),
    isPremium: Math.random() > 0.5 ? true : false,
    photo: `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`,
  };
};

export const getOffers = (count) => {
  return Array(count).fill(``).map(() => getOffer());
};
