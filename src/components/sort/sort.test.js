import React from 'react';
import renderer from 'react-test-renderer';
import Sort from '../sort/sort.jsx';

describe(`Snapshots for Sort`, () => {
  it(`Sort component`, () => {
    const tree = renderer
      .create(
          <Sort
            isOpen={false}
            handleOpenButtonClick={() => {}}
            sortType={`POPULAR`}
            onSortTypeChange={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
