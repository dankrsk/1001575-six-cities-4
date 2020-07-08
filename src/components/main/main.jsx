import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import CardList from '../card-list/card-list.jsx';
import CityList from '../city-list/city-list.jsx';
import {getOffersByCity} from '../../utils/offers.js';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
};

function Main(props) {
  const {currentCity, offers, onCityLinkClick} = props;
  const currentCityOffers = getOffersByCity(currentCity, offers);

  return (
    <React.Fragment>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <CityList
            currentCity={currentCity}
            offers={offers}
            onCityLinkClick={onCityLinkClick}
          />
          <CardList
            city={currentCity}
            offers={currentCityOffers}
          />
        </main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCity: state.city,
    offers: state.offers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCityLinkClick(city) {
      dispatch(ActionCreator.changeCity(city));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
