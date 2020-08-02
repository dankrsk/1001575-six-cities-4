import React from 'react';
import {StringRating} from '../../const.js';
import PropTypes from 'prop-types';

ReviewForm.propTypes = {
  isSubmitButtonDisabled: PropTypes.bool.isRequired,
  handleTextInputChange: PropTypes.func.isRequired,
  handleRadioGroupChange: PropTypes.func.isRequired,
  onReviewFormSubmit: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  isAllFieldDisabled: PropTypes.bool.isRequired,
  disableFormFields: PropTypes.func.isRequired,
  enableFormFields: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

const NUMBER_OF_RATING_STARS = 5;

const getRatingInputs = (isAllFieldDisabled) => {
  const markup = [];
  for (let i = NUMBER_OF_RATING_STARS; i > 0; i--) {
    markup.push(
        <React.Fragment key={i}>
          <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio" disabled={isAllFieldDisabled} required />
          <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title={StringRating[i - 1]}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
    );
  }
  return markup;
};

function ReviewForm(props) {
  const {
    isSubmitButtonDisabled,
    handleTextInputChange: onTextInputChange,
    handleRadioGroupChange: onRadioGroupChange,
    onReviewFormSubmit,
    offerId,
    isAllFieldDisabled,
    disableFormFields,
    enableFormFields,
    setError,
    isError,
  } = props;

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    evt.persist();
    disableFormFields();

    const formData = new FormData(evt.target);
    onReviewFormSubmit(
        offerId,
        {
          comment: formData.get(`review`),
          rating: formData.get(`rating`),
        },
        () => {
          evt.target.reset();
          enableFormFields();
          setError(false);
        },
        () => {
          enableFormFields();
          setError(true);
        }
    );
  };

  return (
    <React.Fragment>
      {isError
        && <p
          className="reviews__label form__label"
          style={{
            color: `red`,
          }}
        >
          Oops. Something went wrong. Try to submit your comment again...
        </p>
      }
      <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating" onChange={(evt) => {
          onRadioGroupChange(evt);
        }}>
          {getRatingInputs(isAllFieldDisabled)}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="50"
          maxLength="300"
          onChange={(evt) => {
            onTextInputChange(evt);
          }}
          disabled={isAllFieldDisabled}
          required
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled || isAllFieldDisabled}>Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default ReviewForm;
