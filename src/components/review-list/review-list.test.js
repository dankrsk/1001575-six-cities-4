import React from 'react';
import renderer from 'react-test-renderer';
import ReviewList from '../review-list/review-list.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for ReviewList`, () => {
  it(`ReviewList component`, () => {
    const tree = renderer
      .create(
          <ReviewList
            comments={mock.comments}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
