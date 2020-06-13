import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.js';

const rentOffersCount = 312;

ReactDOM.render(
    <App
      rentOffersCount={rentOffersCount}
    />,
    document.querySelector(`#root`)
);
