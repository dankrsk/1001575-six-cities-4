import React from 'react';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';
import {getCalculatedRating} from '../../utils/offers.js';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const.js';

Card.propTypes = {
  offer: OFFER_PROP_TYPES.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
};

function Card(props) {
  const {offer: {id, type, title, price, rating, isPremium, photo, isFavorite}, onCardMouseOver, onFavoriteButtonClick, isNearPlaces} = props;
  const calculatedRating = getCalculatedRating(rating);
  const customClassForArticle = isNearPlaces ? `near-places__card` : `cities__place-card`;
  const customClassForImgWrapper = isNearPlaces ? `near-places__image-wrapper` : `cities__image-wrapper`;

  return (
    <article
      className={`place-card ${customClassForArticle}`}
      onMouseOver={() => {
        onCardMouseOver(id);
      }}
      onMouseOut={() => {
        onCardMouseOver();
      }}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`place-card__image-wrapper ${customClassForImgWrapper}`}>
        <a>
          <img className="place-card__image" src={photo} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${isFavorite ? ` place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={() => {
              onFavoriteButtonClick(id);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculatedRating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.OFFER}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
