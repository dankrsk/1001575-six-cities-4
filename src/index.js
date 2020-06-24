import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {getOffers} from './mocks/offers.js';

const rentOffersCount = 4;
const offers = getOffers(rentOffersCount);

ReactDOM.render(
    <App
      rentOffersCount={rentOffersCount}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
