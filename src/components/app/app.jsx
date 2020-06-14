import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

App.propTypes = {
  rentOffersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
};

function App(props) {
  const {rentOffersCount, offers} = props;

  return (
    <Main
      rentOffersCount={rentOffersCount}
      offers={offers}
    />
  );
}

export default App;
