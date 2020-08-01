import React from 'react';
import Header from '../header/header.jsx';
import {checkAuth} from '../../utils/common.js';
import Card from '../card/card.jsx';
import {AppRoutes} from '../../const.js';
import {Link} from 'react-router-dom';
import {AUTH_INFO_PROP_TYPES} from '../../shared/types.js';
import PropTypes from 'prop-types';

Favorites.propTypes = {
  authInfo: AUTH_INFO_PROP_TYPES.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.shape().isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

const getItems = (offers, onFavoriteButtonClick) => {
  const itemsMarkup = [];

  for (const key in offers) {
    if (Object.prototype.hasOwnProperty.call(offers, key)) {
      itemsMarkup.push(
          <li key={offers[key][0].city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{offers[key][0].city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {offers[key].map((offer) => {
                return (
                  <Card
                    key={offer.id}
                    offer={offer}
                    onCardMouseOver={() => {}}
                    onFavoriteButtonClick={onFavoriteButtonClick}
                    pageName={AppRoutes.FAVORITES}
                  />
                );
              })}
            </div>
          </li>
      );
    }
  }

  return itemsMarkup;
};

function Favorites(props) {
  const {authInfo, authorizationStatus, offers, onFavoriteButtonClick} = props;

  return (
    <div className="page">
      <Header authInfo={authInfo} isAuth={checkAuth(authorizationStatus)} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {getItems(offers, onFavoriteButtonClick)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoutes.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
