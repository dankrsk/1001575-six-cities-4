import React from 'react';
import Main from '../main/main.js';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentOffersCount, offers} = props;

  return (
    <Main
      rentOffersCount={rentOffersCount}
      offers={offers}
    />
  );
};

export default App;
