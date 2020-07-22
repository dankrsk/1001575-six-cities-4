const imgUrl = `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`;

export const mock = {
  offers: [
    {
      bedrooms: 3,
      city: `Amsterdam`,
      cityLocation: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`],
      host: {
        avatarUrl: imgUrl,
        id: 1,
        isPro: true,
        name: `Dan`,
      },
      id: 1,
      images: [imgUrl, imgUrl],
      isFavorite: true,
      isPremium: true,
      coordinates: [52.35514938496378, 4.673877537499948],
      maxAdults: 4,
      photo: imgUrl,
      price: 100,
      rating: 1,
      title: `Beautiful & luxurious apartment at great location`,
      type: `House`,
    },
    {
      bedrooms: 3,
      city: `Cologne`,
      cityLocation: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`],
      host: {
        avatarUrl: imgUrl,
        id: 2,
        isPro: true,
        name: `Dan`,
      },
      id: 2,
      images: [imgUrl, imgUrl],
      isFavorite: true,
      isPremium: true,
      coordinates: [52.35514938496378, 4.673877537499948],
      maxAdults: 4,
      photo: imgUrl,
      price: 100,
      rating: 1,
      title: `Beautiful & luxurious apartment at great location`,
      type: `Apartment`,
    },
    {
      bedrooms: 3,
      city: `Berlin`,
      cityLocation: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`],
      host: {
        avatarUrl: imgUrl,
        id: 3,
        isPro: true,
        name: `Dan`,
      },
      id: 3,
      images: [imgUrl, imgUrl],
      isFavorite: true,
      isPremium: true,
      coordinates: [52.35514938496378, 4.673877537499948],
      maxAdults: 4,
      photo: imgUrl,
      price: 100,
      rating: 1,
      title: `Beautiful & luxurious apartment at great location`,
      type: `Room`,
    },
  ],
  rawOffers: [
    {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
        name: `Amsterdam`,
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`],
      host: {
        // eslint-disable-next-line
        avatar_url: imgUrl,
        id: 1,
        // eslint-disable-next-line
        is_pro: true,
        name: `Dan`,
      },
      id: 1,
      images: [imgUrl, imgUrl],
      // eslint-disable-next-line
      is_favorite: true,
      // eslint-disable-next-line
      is_premium: true,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 10,
      },
      // eslint-disable-next-line
      max_adults: 4,
      // eslint-disable-next-line
      preview_image: imgUrl,
      price: 100,
      rating: 1,
      title: `Beautiful & luxurious apartment at great location`,
      type: `House`,
    },
  ],
  authInfo: {
    avatarUrl: imgUrl,
    email: `foo@bar.com`,
    id: 1,
    isPro: true,
    name: `Adam Smith`,
  },
  rawAuthInfo: {
    // eslint-disable-next-line
    avatar_url: imgUrl,
    email: `foo@bar.com`,
    id: 1,
    // eslint-disable-next-line
    is_pro: true,
    name: `Adam Smith`,
  }
};
