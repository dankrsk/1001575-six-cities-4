import React from 'react';
import {getOfferById, getCalculatedRating} from '../../utils/offers.js';
import {getType} from '../../utils/offers.js';
import Header from '../header/header.jsx';
import ReviewList from '../review-list/review-list.jsx';
import DefaultCardList from '../default-card-list/default-card-list.jsx';
import OffersMap from '../offers-map/offers-map.jsx';
import customHistory from '../../history.js';
import {AppRoutes} from '../../const.js';
import ReviewForm from '../review-form/review-form.jsx';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES, AUTH_INFO_PROP_TYPES, COMMENTS_PROP_TYPES} from '../../shared/types.js';
import withForm from '../../hocs/with-form/with-form.jsx';

const MAX_NUMBER_OF_IMAGES = 6;
const MAX_NUMBER_OF_OFFERS_ON_MAP = 3;

const getImagesItems = (images, title) => {
  let i = 0;
  const items = [];
  while (i < MAX_NUMBER_OF_IMAGES) {
    items.push(
        <div key={images[i]} className="property__image-wrapper">
          <img className="property__image" src={images[i]} alt={title} />
        </div>
    );
    i++;
  }
  return items;
};

const ReviewFormWrapped = withForm(ReviewForm);

class Offer extends React.PureComponent {
  componentDidMount() {
    this.props.loadComments(this.props.match.params.id);
    this.props.loadNearPlaces(this.props.match.params.id);
  }

  render() {
    const {match: {params: {id}}, offers, authInfo, isAuth, comments, onFavoriteButtonClick, nearPlaces, onReviewFormSubmit} = this.props;
    const offer = getOfferById(offers, Number.parseInt(id, 10));
    const {title, isPremium, isFavorite, images, rating, type, bedrooms, maxAdults, price, goods, host: {avatarUrl, name, isPro}, description, city, id: offerId} = offer;
    const calculatedRating = getCalculatedRating(rating);
    const mapOffers = [].concat(nearPlaces.slice(0, MAX_NUMBER_OF_OFFERS_ON_MAP), offer);

    return (
      <div className="page">
        <Header authInfo={authInfo} isAuth={isAuth} />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {getImagesItems(images, title)}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && <div className="property__mark"><span>Premium</span></div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                    onClick={() => {
                      if (isAuth) {
                        onFavoriteButtonClick(offerId);
                      } else {
                        customHistory.push(AppRoutes.LOGIN);
                      }
                    }}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33" style={isFavorite ? {fill: `#4481c3`} : {}}>
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${calculatedRating}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {getType(type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((stuff) => {
                      return (
                        <li key={stuff} className="property__inside-item">
                          {stuff}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper${isPro ? ` property__avatar-wrapper--pro` : ``}`}>
                      <img className="property__avatar user__avatar" src={`/${avatarUrl}`} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewList comments={comments} />
                  {isAuth
                    && <ReviewFormWrapped
                      onReviewFormSubmit={onReviewFormSubmit}
                      offerId={offerId}
                    />
                  }
                </section>
              </div>
            </div>
            {nearPlaces.length > 0 && <OffersMap
              city={city}
              offers={mapOffers}
              activeCardId={offerId}
              isNearPlaces={true}
            />
            }
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <DefaultCardList
                offers={nearPlaces}
                onCardMouseOver={() => {}}
                onFavoriteButtonClick={(cardId) => {
                  onFavoriteButtonClick(cardId);
                  this.props.loadNearPlaces(this.props.match.params.id);
                }}
                pageName={AppRoutes.OFFER}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Offer.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  nearPlaces: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  authInfo: AUTH_INFO_PROP_TYPES.isRequired,
  isAuth: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(COMMENTS_PROP_TYPES).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  loadNearPlaces: PropTypes.func.isRequired,
  onReviewFormSubmit: PropTypes.func.isRequired,
};

export default Offer;
