import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for SignIn`, () => {
  it(`SignIn component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <SignIn
              onLoginFormSubmit={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
