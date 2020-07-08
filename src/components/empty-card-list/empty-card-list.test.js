import React from 'react';
import renderer from 'react-test-renderer';
import EmptyCardList from '../empty-card-list/empty-card-list.jsx';

describe(`Snapshots for EmptyCardList`, () => {
  it(`EmptyCardList component`, () => {
    const tree = renderer
      .create(<EmptyCardList
        city={`Paris`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
