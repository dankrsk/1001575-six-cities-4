import React from 'react';
import {getCalculatedRating} from '../../utils/offers';
import {Months} from '../../const.js';
import PropTypes from 'prop-types';
import {COMMENTS_PROP_TYPES} from '../../shared/types.js';

ReviewList.propTypes = {
  comments: PropTypes.arrayOf(COMMENTS_PROP_TYPES).isRequired,
};

const MAX_NUMBER_OF_COMMENTS = 10;

const getComments = (comments) => {
  return comments.map((comment) => {
    const date = new Date(comment.date);

    return (
      <li key={comment.id} className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {comment.user.name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${getCalculatedRating(comment.rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment.comment}
          </p>
          <time className="reviews__time" dateTime={comment.date.slice(0, 10)}>{`${Months[date.getMonth()]} ${date.getFullYear()}`}</time>
        </div>
      </li>
    );
  });
};

function ReviewList(props) {
  const {comments} = props;

  return (
    <React.Fragment>
      <h2 className="reviews__title">
        Reviews &middot;<span className="reviews__amount">{comments.length}</span>
      </h2>
      {comments.length > 0 && <ul className="reviews__list">{getComments(comments.slice(0, MAX_NUMBER_OF_COMMENTS))}</ul>}
    </React.Fragment>
  );
}

export default ReviewList;
