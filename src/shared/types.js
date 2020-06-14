import PropTypes from 'prop-types';

const OFFER_PROP_TYPES = PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }
);

export {OFFER_PROP_TYPES};

