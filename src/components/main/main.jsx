import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator as AppActionCreator} from '../../reducer/app/app.js';
import CardList from '../card-list/card-list.jsx';
import CityList from '../city-list/city-list.jsx';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';
import {getCityOffers, getStatus} from '../../reducer/data/selectors.js';
import {getAllCities, getCurrentCity} from '../../reducer/app/selectors.js';
import {ConnectStatus} from '../../reducer/data/data.js';

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  allCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

function Main(props) {
  const {status, currentCity, offers: currentCityOffers, allCities, onCityLinkClick} = props;

  const getScreen = () => {
    switch (status) {
      case ConnectStatus.OK:
        return (
          <React.Fragment>
            <CityList
              currentCity={currentCity}
              allCities={allCities}
              onCityLinkClick={onCityLinkClick}
            />
            <CardList
              city={currentCity}
              offers={currentCityOffers}
            />
          </React.Fragment>
        );
      case ConnectStatus.LOADING:
        return (
          <p className="property__name">Loading...</p>
        );
      default:
        return (
          <p className="property__name">Oops. Something went wrong. Try reloading the page...</p>
        );
    }
  };

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
          {getScreen()}
        </main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state),
    offers: getCityOffers(state),
    status: getStatus(state),
    allCities: getAllCities(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCityLinkClick(city) {
      dispatch(AppActionCreator.changeCity(city));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
