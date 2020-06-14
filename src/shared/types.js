import PropTypes from 'prop-types';

export const OFFER_PROP_TYPES = PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }
);

