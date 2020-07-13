import PropTypes from 'prop-types';

export const OFFER_PROP_TYPES = PropTypes.shape(
    {
      bedrooms: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      cityLocation: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
      description: PropTypes.string.isRequired,
      goods: PropTypes.arrayOf(PropTypes.string).isRequired,
      host: PropTypes.shape({
        avatarUrl: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      isFavorite: PropTypes.bool.isRequired,
      isPremium: PropTypes.bool.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      maxAdults: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }
);

