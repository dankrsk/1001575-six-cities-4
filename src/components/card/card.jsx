import React from 'react';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';
import {getCalculatedRating, getType} from '../../utils/offers.js';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const.js';

Card.propTypes = {
  offer: OFFER_PROP_TYPES.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
};

function Card(props) {
  const {offer: {id, type, title, price, rating, isPremium, photo, isFavorite}, onCardMouseOver, onFavoriteButtonClick, pageName} = props;
  const calculatedRating = getCalculatedRating(rating);

  let customClassForArticle = ``;
  let customClassForImgWrapper = ``;
  const mainImgSize = {
    width: `260`,
    height: `200`,
  };

  switch (pageName) {
    case AppRoutes.FAVORITES:
      customClassForArticle = `favorites__card`;
      customClassForImgWrapper = `favorites__image-wrapper`;
      mainImgSize.width = `150`;
      mainImgSize.height = `110`;
      break;
    case AppRoutes.OFFER:
      customClassForArticle = `near-places__card`;
      customClassForImgWrapper = `near-places__image-wrapper`;
      break;
    default:
      customClassForArticle = `cities__place-card`;
      customClassForImgWrapper = `cities__image-wrapper`;
  }

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
          <img className="place-card__image" src={photo} width={mainImgSize.width} height={mainImgSize.height} alt="Place image" />
        </a>
      </div>
      <div className={`place-card__info${pageName === AppRoutes.FAVORITES ? ` favorites__card-info` : ``}`}>
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
        <p className="place-card__type">{getType(type)}</p>
      </div>
    </article>
  );
}

export default Card;
