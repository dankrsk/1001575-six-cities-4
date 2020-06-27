import PropTypes from 'prop-types';

export const OFFER_PROP_TYPES = PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      photo: PropTypes.string.isRequired,
    }
);

