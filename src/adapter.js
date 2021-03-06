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

export const getAdaptedAuthInfo = (authInfo) => {
  return {
    avatarUrl: authInfo.avatar_url,
    email: authInfo.email,
    id: authInfo.id,
    isPro: authInfo.is_pro,
    name: authInfo.name,
  };
};

export const getAdaptedComment = (comment) => {
  return {
    comment: comment.comment,
    date: comment.date,
    id: comment.id,
    rating: comment.rating,
    user: {
      avatarUrl: comment.user.avatar_url,
      id: comment.user.id,
      isPro: comment.user.is_pro,
      name: comment.user.name,
    }
  };
};
