import React from 'react';
import {getCitiesFromOffers} from '../../utils/offers.js';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

CityList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
};

function CityList(props) {
  const {currentCity, offers, onCityLinkClick} = props;

  return (
    <React.Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {getCitiesFromOffers(offers).map((city) => {
              return (
                <li key={city} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item${city === currentCity ? ` tabs__item--active` : `` }`}
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onCityLinkClick(city);
                    }}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
}

export default CityList;
