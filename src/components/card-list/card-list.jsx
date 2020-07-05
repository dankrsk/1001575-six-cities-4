import React from 'react';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';
import EmptyCardList from '../empty-card-list/empty-card-list.jsx';
import DefaultCardList from '../default-card-list/default-card-list.jsx';


CardList.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
};

function CardList(props) {
  const {city, offers} = props;

  const getComponentByOffers = (length) => {
    switch (length) {
      case 0:
        return <EmptyCardList city={city} />;
      default:
        return <DefaultCardList city={city} offers={offers} />;
    }
  };

  return (
    <div className="cities">
      {getComponentByOffers(offers.length)}
    </div>
  );
}

export default CardList;
