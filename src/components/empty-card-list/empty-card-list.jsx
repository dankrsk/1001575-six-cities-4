import React from 'react';
import PropTypes from 'prop-types';

EmptyCardList.propTypes = {
  city: PropTypes.string.isRequired,
};

function EmptyCardList(props) {
  const {city} = props;

  return (
    <div classNameName="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property availbale at the moment in {city}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}

export default EmptyCardList;
