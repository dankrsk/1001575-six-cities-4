import React from 'react';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

Card.propTypes = {
  offer: OFFER_PROP_TYPES.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
};

const MULTIPLIER_FOR_RATING = 20;

function Card(props) {
  const {offer: {id, type, title, price, rating, isPremium, photo}, onCardMouseOver} = props;
  const calculatedRating = MULTIPLIER_FOR_RATING * rating;

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={() => {
        onCardMouseOver(id);
      }}
      onMouseOut={() => {
        onCardMouseOver(-1);
      }}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={photo} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
