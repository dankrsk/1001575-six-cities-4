import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const rentOffersCount = 312;
const offers = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
  },
  {
    title: `Wood and stone place`,
    price: 80,
  },
  {
    title: `Canal View Prinsengracht`,
    price: 132,
  },
  {
    title: `Nice, cozy, warm big bed apartment`,
    price: 180,
  },
  {
    title: `Wood and stone place`,
    price: 80,
  }
];

ReactDOM.render(
    <App
      rentOffersCount={rentOffersCount}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
