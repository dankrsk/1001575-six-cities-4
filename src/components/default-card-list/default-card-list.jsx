import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';
import OffersMap from '../offers-map/offers-map.jsx';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

DefaultCardList.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  activeCardId: PropTypes.number.isRequired,
  handleCardAction: PropTypes.func.isRequired,
};

function DefaultCardList(props) {
  const {city, offers, handleCardAction: onCardMouseOver, activeCardId} = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
              Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => {
            return (
              <Card
                key={offer.id}
                offer={offer}
                onCardMouseOver={onCardMouseOver}
              />
            );
          })}
        </div>
      </section>
      <div className="cities__right-section">
        <OffersMap
          city={city}
          offers={offers}
          activeCardId={activeCardId}
        />
      </div>
    </div>
  );
}

export default DefaultCardList;
