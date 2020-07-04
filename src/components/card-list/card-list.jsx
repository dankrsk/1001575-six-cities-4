import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';
import Map from '../map/map.jsx';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverCardId: -1,
    };
    this.handleCardMouseOver = this.handleCardMouseOver.bind(this);
  }

  handleCardMouseOver(id) {
    this.setState({
      hoverCardId: id,
    });
  }

  render() {
    const {city, offers} = this.props;

    return (
      <div className="cities">
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
                return <Card key={offer.id} offer={offer} onCardMouseOver={this.handleCardMouseOver} />;
              })}
            </div>
          </section>
          <div className="cities__right-section">
            <Map offers={offers} />
          </div>
        </div>
      </div>
    );
  }
}

CardList.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
};
