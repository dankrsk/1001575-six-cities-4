import React from 'react';
import Main from '../main/main.js';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentOffersCount} = props;

  return (
    <Main
      rentOffersCount={rentOffersCount}
    />
  );
};

export default App;
