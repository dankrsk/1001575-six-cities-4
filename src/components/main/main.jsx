import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator as AppActionCreator} from '../../reducer/app/app.js';
import CardList from '../card-list/card-list.jsx';
import CityList from '../city-list/city-list.jsx';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES, AUTH_INFO_PROP_TYPES} from '../../shared/types.js';
import {getCityOffers} from '../../reducer/data/selectors.js';
import {getAllCities, getCurrentCity, getSortType} from '../../reducer/app/selectors.js';
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors.js';
import Header from '../header/header.jsx';
import {checkAuth} from '../../utils/common.js';
import OffersMap from '../offers-map/offers-map.jsx';
import Sort from '../sort/sort.jsx';
import withMenu from '../../hocs/with-menu/with-menu.jsx';

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  allCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: AUTH_INFO_PROP_TYPES,
  handleCardAction: PropTypes.func.isRequired,
  activeCardId: PropTypes.number.isRequired,
  sortType: PropTypes.string.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

const SortWrapped = withMenu(Sort);

function Main(props) {
  const {
    authInfo,
    authorizationStatus,
    currentCity,
    offers: currentCityOffers,
    allCities,
    onCityLinkClick,
    onFavoriteButtonClick,
    handleCardAction: onCardMouseOver,
    activeCardId,
    sortType,
    onSortTypeChange,
  } = props;

  return (
    <React.Fragment>
      <div className="page page--gray page--main">
        <Header authInfo={authInfo} isAuth={checkAuth(authorizationStatus)} />
        <main className="page__main page__main--index">
          <CityList
            currentCity={currentCity}
            allCities={allCities}
            onCityLinkClick={onCityLinkClick}
          />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {currentCity}</b>
                <SortWrapped
                  sortType={sortType}
                  onSortTypeChange={onSortTypeChange}
                />
                <CardList
                  city={currentCity}
                  offers={currentCityOffers}
                  onFavoriteButtonClick={onFavoriteButtonClick}
                  onCardMouseOver={onCardMouseOver}
                />
              </section>
              <div className="cities__right-section">
                <OffersMap
                  city={currentCity}
                  offers={currentCityOffers}
                  activeCardId={activeCardId}
                  isNearPlaces={false}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state),
    offers: getCityOffers(state),
    allCities: getAllCities(state),
    authorizationStatus: getAuthorizationStatus(state),
    authInfo: getAuthInfo(state),
    sortType: getSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCityLinkClick(city) {
      dispatch(AppActionCreator.changeCity(city));
    },
    onSortTypeChange(sortType) {
      dispatch(AppActionCreator.changeSortType(sortType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
