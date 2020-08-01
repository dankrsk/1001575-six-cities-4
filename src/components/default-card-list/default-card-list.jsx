import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

DefaultCardList.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
};

function DefaultCardList(props) {
  const {offers, onFavoriteButtonClick, onCardMouseOver, pageName} = props;
  const customClass = pageName ? `near-places__list` : `cities__places-list tabs__content`;

  return (
    <div className={`places__list ${customClass}`}>
      {offers.map((offer) => {
        return (
          <Card
            key={offer.id}
            offer={offer}
            onCardMouseOver={onCardMouseOver}
            onFavoriteButtonClick={onFavoriteButtonClick}
            pageName={pageName}
          />
        );
      })}
    </div>
  );
}

export default DefaultCardList;
