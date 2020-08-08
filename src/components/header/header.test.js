import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../header/header.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for Header`, () => {
  it(`Header component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <Header
              authInfo={mock.authInfo}
              isAuth={true}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
