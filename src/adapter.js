export const getAdaptedOffer = (offer) => {
  return {
    bedrooms: offer.bedrooms,
    city: offer.city.name,
    cityLocation: offer.city.location,
    description: offer.description,
    goods: offer.goods,
    host: {
      avatarUrl: offer.host.avatar_url,
      id: offer.host.id,
      isPro: offer.host.is_pro,
      name: offer.host.name,
    },
    id: offer.id,
    images: offer.images,
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    coordinates: [offer.location.latitude, offer.location.longitude],
    maxAdults: offer.max_adults,
    photo: offer.preview_image,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    type: offer.type,
  };
};
